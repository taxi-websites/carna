"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ButtonsContainer } from "react-mobile-app-button";
import { AppStoreButton, GooglePlayButton } from "@/components/fixed-mobile-app-button";

import { LANDING, STORE_LABELS, type Language } from "@/lib/constant";
import { ResponsiveStoreButton } from "./responsive-store-button";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}


// ----------------------------------------------
// PARSE RGBA → numeric colors
// ----------------------------------------------
const parseRgbColor = (colorString: string | null) => {
  if (!colorString) return null;
  const match = colorString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
  );
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return null;
};

// ----------------------------------------------
// NEXT.JS VERSION OF YOUR FULL REACT COMPONENT
// ----------------------------------------------
export default function AppDownloadHero({ lang }: { lang: Language }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isMobile = useIsMobile();

  const mousePosRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const animationFrameIdRef = useRef<number | null>(null);

  const resolvedCanvasColorsRef = useRef({
    strokeStyle: { r: 128, g: 128, b: 128 },
  });

  const arrowEnabledRef = useRef(true);

  // ----------------------------------------------------------
  // RESOLVE CANVAS COLOR BASED ON THEME — EXACTLY LIKE REACT
  // ----------------------------------------------------------
  useEffect(() => {
    const temp = document.createElement("div");
    temp.style.display = "none";
    document.body.appendChild(temp);

    const updateColors = () => {
      temp.style.color = "var(--foreground)";
      const computedFg = getComputedStyle(temp).color;
      const parsed = parseRgbColor(computedFg);

      if (parsed) {
        resolvedCanvasColorsRef.current.strokeStyle = parsed;
      } else {
        const isDark = document.documentElement.classList.contains("dark");
        resolvedCanvasColorsRef.current.strokeStyle = isDark
          ? { r: 250, g: 250, b: 250 }
          : { r: 10, g: 10, b: 10 };
      }
    };

    updateColors();

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
      temp.remove();
    };
  }, []);

  // ----------------------------------------------------------
  // DRAW ARROW — IDENTICAL LOGIC
  // ----------------------------------------------------------
  const drawArrow = useCallback(() => {
    const canvas = canvasRef.current;
    const target = targetRef.current;
    const ctx = ctxRef.current;
    const mouse = mousePosRef.current;

    if (!canvas || !target || !ctx) return;

    const x0 = mouse.x;
    const y0 = mouse.y;
    if (x0 === null || y0 === null) return;

    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const angleToTarget = Math.atan2(cy - y0, cx - x0);

    const x1 = cx - Math.cos(angleToTarget) * (rect.width / 2 + 12);
    const y1 = cy - Math.sin(angleToTarget) * (rect.height / 2 + 12);

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;

    const distance = Math.hypot(x1 - x0, y1 - y0);
    const controlOffset = Math.min(200, distance * 0.5);

    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
    const controlX = midX;
    const controlY = midY + controlOffset * t;

    const { r, g, b } = resolvedCanvasColorsRef.current.strokeStyle;

    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
    ctx.lineWidth = 2;

    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(controlX, controlY, x1, y1);
    ctx.stroke();

    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    const headLength = 10;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle - Math.PI / 6),
      y1 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle + Math.PI / 6),
      y1 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  }, []);

  // ----------------------------------------------------------
  // MAIN ANIMATION LOOP
  // ----------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const target = targetRef.current;
    if (!canvas || !target) return;

    ctxRef.current = canvas.getContext("2d");

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      arrowEnabledRef.current = window.scrollY < window.innerHeight * 0.5;
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    updateSize();
    handleScroll();

    const animate = () => {
      const ctx = ctxRef.current;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasElem = canvasRef.current;
        if (canvasElem) {
          canvasElem.style.opacity = arrowEnabledRef.current ? "1" : "0";
        }

        if (arrowEnabledRef.current) {
          drawArrow();
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [drawArrow]);

  const t = LANDING[lang];
  const s = STORE_LABELS[lang];

  return (
    <div ref={targetRef} className="mt-12 z-50 relative">
<ButtonsContainer gap={ isMobile?0:12} direction={isMobile ? "column" : "row"}>
<ResponsiveStoreButton
  type="appstore"
  url={t.downloads.passenger.ios}
  title={s.apple}
  theme="light"
/>

<ResponsiveStoreButton
  type="google"
  url={t.downloads.passenger.android}
  title={s.google}
  theme="light"
/>
</ButtonsContainer>

    </div>
  );
}

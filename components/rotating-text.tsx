"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  type AnimatePresenceProps,
  motion,
  type MotionProps,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

interface GraphemeSegment {
  segment: string;
}

export interface TextRotateProps {
  texts: readonly string[];
  rotationInterval?: number;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

export const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Grapheme splitter (safe for emoji + diacritics)
    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (x: GraphemeSegment) => x.segment);
      }
      return Array.from(text);
    };

    // Detect & handle Arabic
    const elements: WordObject[] = useMemo(() => {
      const currentText = texts[currentTextIndex];
      const isArabic = /[\u0600-\u06FF]/.test(currentText);

      if (isArabic) {
        return [{ characters: [currentText], needsSpace: false }];
      }

      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }

      const parts =
        splitBy === "words"
          ? currentText.split(" ")
          : splitBy === "lines"
          ? currentText.split("\n")
          : currentText.split(splitBy);

      return parts.map((part, i) => ({
        characters: [part],
        needsSpace: i !== parts.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, total: number) => {
        switch (staggerFrom) {
          case "first":
            return index * staggerDuration;
          case "last":
            return (total - 1 - index) * staggerDuration;
          case "center": {
            const c = Math.floor(total / 2);
            return Math.abs(c - index) * staggerDuration;
          }
          case "random": {
            const r = Math.floor(Math.random() * total);
            return Math.abs(r - index) * staggerDuration;
          }
          default:
            return Math.abs(staggerFrom - index) * staggerDuration;
        }
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (i: number) => {
        setCurrentTextIndex(i);
        onNext?.(i);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const last = texts.length - 1;
      const n = currentTextIndex === last ? (loop ? 0 : last) : currentTextIndex + 1;
      if (n !== currentTextIndex) handleIndexChange(n);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const last = texts.length - 1;
      const p = currentTextIndex === 0 ? (loop ? last : 0) : currentTextIndex - 1;
      if (p !== currentTextIndex) handleIndexChange(p);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const valid = Math.max(0, Math.min(index, texts.length - 1));
        if (valid !== currentTextIndex) handleIndexChange(valid);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const interval = setInterval(next, rotationInterval);
      return () => clearInterval(interval);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
        {...props}
        layout
        transition={transition}
      >
        {/* SEO-friendly */}
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentTextIndex}
            className={cn("flex flex-wrap", splitBy === "lines" && "flex-col w-full")}
            layout
            aria-hidden="true"
          >
            {elements.map((word, wi, arr) => {
              const prevCount = arr
                .slice(0, wi)
                .reduce((sum, w) => sum + w.characters.length, 0);

              const total = arr.reduce((s, w) => s + w.characters.length, 0);

              return (
                <span key={wi} className={cn("inline-flex", splitLevelClassName)}>
                  {word.characters.map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(prevCount + ci, total),
                      }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}

                  {word.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

TextRotate.displayName = "TextRotate";

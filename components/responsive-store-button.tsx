"use client";

import { motion } from "motion/react";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/fixed-mobile-app-button";

interface ResponsiveButtonProps {
  type: "appstore" | "google";
  url: string;
  title: string;
  theme?: "light" | "dark";
}

export function ResponsiveStoreButton({
  type,
  url,
  title,
  theme = "light",
}: ResponsiveButtonProps) {
  const ButtonComponent =
    type === "appstore" ? AppStoreButton : GooglePlayButton;

  // 👇 SAME SIZE FOR BOTH STORES
  const baseWidth = 220;
  const baseHeight = 68;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="
        origin-center
        scale-[0.70]     /* mobile */
        sm:scale-[0.80]  /* small screens */
        md:scale-[0.95]  /* tablets */
        lg:scale-[1]     /* desktop */
      "
    >
      <ButtonComponent
        url={url}
        title={title}
        theme={theme}
        width={baseWidth}
        height={baseHeight}
      />
    </motion.div>
  );
}

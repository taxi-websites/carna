"use client";

import { motion } from "motion/react";
import { TextRotate } from "@/components/rotating-text";
import { LANDING, type Language } from "@/lib/constant";
import AppDownloadHero from "./app-download-hero";

export default function HomeHero({ lang }: { lang: Language }) {
  const t = LANDING[lang];
  const rtl = lang === "ar";

  return (
    <section
      dir={rtl ? "rtl" : "ltr"}
      className="w-full flex flex-col h-screen items-center justify-center text-center pt-20 pb-16 px-4"
    >
      {/* MAIN HERO TITLE */}
      <div className="flex items-center flex-col justify-center ">
    <div className="flex items-center flex-col justify-center">
      <motion.div
        layout
        className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap"
      >
        {/* PREFIX WORD */}
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="
            text-3xl sm:text-4xl md:text-7xl capitalize 
            font-medium
          "
        >
          {t.heroPrefix}
        </motion.span>

        {/* ROTATING WORD */}
        <TextRotate
          texts={t.heroRotate}
          mainClassName="
            inline-flex items-center
            capitalize
            px-3 sm:px-4 md:px-5
            py-1 sm:py-1.5 md:py-2
            rounded-lg bg-primary text-white
            text-3xl sm:text-4xl md:text-5xl 
            font-semibold leading-tight
            shadow-sm
          "
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-110%" }}
          staggerDuration={0.02}
          splitLevelClassName="overflow-hidden"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          rotationInterval={2000}
        />
        
      </motion.div>


      {/* SUBTEXT */}
      <p className="text-lg text-muted-foreground max-w-xl text-center mt-3 md:mt-4">
        {t.tagline}
      </p>
      </div>
      <AppDownloadHero lang={lang} />

      </div>


  
    </section>
  );
}


                // className="h-full w-full object-contain rounded-lg p-1"

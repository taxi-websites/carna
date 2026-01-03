import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Language } from "./constant";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function isRTL(lang: "en" | "ar") {
  return lang === "ar";
}



export function getLangFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): Language {
  const raw = params?.lang;

  if (!raw) return "en";

  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "ar" ? "ar" : "en";
}

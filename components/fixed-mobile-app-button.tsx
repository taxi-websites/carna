"use client";

import {
  AppStoreButton as OriginalAppStoreButton,
  GooglePlayButton as OriginalGooglePlayButton,
  AppGalleryButton as OriginalAppGalleryButton,
} from "react-mobile-app-button";

export type BaseStoreButtonProps = Readonly<{
  url: string;
  theme?: "dark" | "light";
  title?: string;
  height?: number;
  width?: number;
  className?: string;
}>;

export function AppStoreButton({
  url,
  theme,
  title,
  height,
  width,
  className,
}: BaseStoreButtonProps) {
  return (
    <OriginalAppStoreButton
      url={url}
      theme={theme}
      title={title}
      height={height}
      width={width}
      className={className}
    />
  );
}

export function GooglePlayButton({
  url,
  theme,
  title,
  height,
  width,
  className,
}: BaseStoreButtonProps) {
  return (
    <OriginalGooglePlayButton
      url={url}
      theme={theme}
      title={title}
      height={height}
      width={width}
      className={className}
    />
  );
}

export function AppGalleryButton({
  url,
  theme,
  title,
  height,
  width,
  className,
}: BaseStoreButtonProps) {
  return (
    <OriginalAppGalleryButton
      url={url}
      theme={theme}
      title={title}
      height={height}
      width={width}
      className={className}
    />
  );
}

"use client";

// Hooks / Packages
import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  ) : null;
}

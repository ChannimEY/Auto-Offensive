"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { useMounted } from "@/hooks/use-mounted"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const mounted = useMounted()

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
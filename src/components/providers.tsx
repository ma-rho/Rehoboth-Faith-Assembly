'use client';

import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("@/components/ui/toaster").then(mod => mod.Toaster), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
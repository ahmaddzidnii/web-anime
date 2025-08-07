"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export const ClerkCustomProvider = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      afterSignOutUrl="/auth/login?redirect_url=/anime"
      appearance={{ baseTheme: theme === "dark" ? dark : null }}
    >
      {children}
    </ClerkProvider>
  );
};

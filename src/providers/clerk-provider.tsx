import { ReactNode } from "react";
import { ClerkProvider as ClerkBaseProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkBaseProvider appearance={{ baseTheme: dark }}>
      {children}
    </ClerkBaseProvider>
  );
}

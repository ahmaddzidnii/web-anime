"use client";

// import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { ProgressProvider } from '@bprogress/next/app';

export const ProgressBarProvider = ({ children }) => {
  return (
      <ProgressProvider
        height="4px"
        color="#0ea5e9"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>

  );
};

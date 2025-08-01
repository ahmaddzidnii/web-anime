"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

export const ProgressBarProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0ea5e9"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

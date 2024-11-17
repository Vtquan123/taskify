"use client"

import React, { useLayoutEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.remove('bg-background')
  }, [])

  return <div className="h-[100vh] w-[100vw] flex">
    <div className="flex-1 bg-primary hidden md:block bg-[url('/images/background.png')] bg-center"/>
    <div className="max-w-[100vw] flex-1 md:max-w-[40%] p-8">
      {children}
    </div>
  </div>
}
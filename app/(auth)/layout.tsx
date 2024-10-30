import React from "react";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <div className="h-[100vh] w-[100vw] flex">
    <div className="flex-1 bg-primary hidden md:block bg-[url('/images/background.png')] bg-center"/>
    <div className="max-w-[100vw] flex-1 md:max-w-[40%] p-8">
      {children}
    </div>
  </div>
}
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {TRPCProvider} from "../trpc/client"

export const metadata: Metadata = {
  title: "taskify",
  description: "Task manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="[&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      [&::-webkit-scrollbar-thumb]:rounded-full
      dark:text-white
      dark:[&::-webkit-scrollbar-track]:bg-background
      dark:[&::-webkit-scrollbar-thumb]:bg-background1
      ">
        <ClerkProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

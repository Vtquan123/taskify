import type { Metadata } from "next";
import "./globals.css";
import {SideNav, HeadNav} from "@component";
import Image from "next/image";

export const metadata: Metadata = {
  title: "taskify",
  description: "Task manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = [
    {
      id: 'nav.header', render: () => <div className="flex justify-center">
      <Image width={160} height={50} src="/images/logo.svg" alt="logo"/>
    </div> },
    { id: 'nav.divider' },
    {
      id: 'nav.content.item-parent',
      label: "Item",
      icon: "ri-home-6-line",
      level: 0,
      child: [
        {
          id: 'item-1',
          label: "Item",
          level: 1,
        }
      ]
    },
  ]

  return (
    <html lang="en">
      <body>
        <SideNav data={navigation} className="hidden md:flex" />
        <HeadNav className="md:hidden" />
        <div className="pt-[60px] md:pt-0 md:pl-[250px]">
          {children}
        </div>
      </body>
    </html>
  );
}

"use client"

import { SideNav, HeadNav, UserNav } from "@components"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const DEFAULT_NAVIGATION = [
    {
      id: 'nav.header', render: () => <Link href="/dashboard" className="flex justify-center" >
      <Image width={160} height={50} src="/images/logo.svg" alt="logo"/>
    </Link> },
    { id: 'nav.divider' },
    {
      id: 'nav.content.dashboard',
      label: "Dashboard",
      icon: "ri-dashboard-line",
      level: 0,
      link: '/dashboard'
    },
    {
      id: 'nav.content.calendar',
      label: "Calendar",
      icon: "ri-calendar-todo-line",
      level: 0,
      link: '/calendar'
    },
    {
      id: 'nav.content.note',
      label: "Notes",
      icon: "ri-booklet-line",
      level: 0,
      link: '/notes'
    },
    {
      id: 'nav.content.teams',
      label: "Teams",
      icon: "ri-group-line",
      level: 0,
      link: '/teams'
    },
  ]

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <>
    <SideNav data={DEFAULT_NAVIGATION} className="hidden md:flex" />
    <HeadNav className="md:hidden" />
    <div className="pt-[60px] md:pt-0 md:pl-[250px] flex flex-col">
      <UserNav/>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  </>
}
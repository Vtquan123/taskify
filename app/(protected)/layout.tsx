"use client"

import { cn } from "@/lib/utils"
import { SideNav, HeadNav, UserNav } from "@components"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const getNavigation = (collapse?: boolean) => [
    {
      id: 'nav.header', render: () => <Link href="/dashboard" className="flex justify-center" >
        {collapse
          ? <Image width={18} height={18} src="/images/lightning.svg" alt="logo" />
          : <Image width={160} height={50} src="/images/logo.svg" alt="logo"/>
        }
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
  const [collapse, setCollapse] = useState(false)
  const handleCollapse = () => setCollapse(prev => !prev)
  return <>
    <SideNav data={getNavigation(collapse)} className="hidden md:flex" collapse={collapse} handleCollapse={handleCollapse} />
    <HeadNav className="md:hidden" />
    <div className={cn(
      "pt-[60px] md:pt-0 md:pl-[250px] flex flex-col transition-padding",
      `${collapse ? 'md:pl-[60px]' : ''}`
    )}>
      <UserNav/>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  </>
}
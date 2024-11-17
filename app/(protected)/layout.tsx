"use client"

import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { SideNav, HeadNav, UserNav } from "@components"
import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

interface UserProps extends Omit<User, 'createdAt' | 'updatedAt'> {
  createdAt: string,
  updatedAt: string
}
interface UserContextProps {
  user: UserProps,
  refetchUser: any
}

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

export const UserContext = React.createContext<UserContextProps>(undefined!)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const { data, refetch } = trpc.user.me.useQuery<any>()
  const user = data as UserProps

  useEffect(() => {
    const theme = user?.setting?.theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.add('bg-background')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.remove('bg-background')
    }
  }, [user])

  return <UserContext.Provider
    value={{
    user,
    refetchUser: refetch
  }}>
    {children}
  </UserContext.Provider>
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [collapse, setCollapse] = useState(false)
  const handleCollapse = () => setCollapse(prev => !prev)
  return <UserProvider>
    <SideNav data={getNavigation(collapse)} className="hidden md:flex" collapse={collapse} handleCollapse={handleCollapse} />
    <HeadNav className="md:hidden" />
    <div className={cn(
      "pt-[60px] md:pt-0 md:pl-[220px] flex flex-col transition-padding h-[100vh] bg-background",
      `${collapse ? 'md:pl-[60px]' : ''}`
    )}>
      <UserNav />
      <div className="flex-1 px-6 pt-15">
        {children}
      </div>
    </div>
  </UserProvider>
}
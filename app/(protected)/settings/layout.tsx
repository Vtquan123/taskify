"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SETTINGS_LINKS = [
  {
    id: 'profile',
    link: '/settings/profile',
    label: 'Profile',
    icon: 'ri-user-line'
  },
  {
    id: 'account',
    link: '/settings/account',
    label: 'Account',
    icon: 'ri-tools-line'
  },
  {
    id: 'appearance',
    link: '/settings/appearance',
    label: 'Appearance',
    icon: 'ri-tv-2-line'
  },
  {
    id: 'notification',
    link: '/settings/notification',
    label: 'Notification',
    icon: 'ri-notification-3-line'
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return <div className="container mx-auto flex md:pt-10 md:pb-10 pt-20 pb-10 h-full">
    <div className="w-full max-w-[200px] border-r-[1px] border-borderGray h-full flex flex-col gap-1">
      {
        SETTINGS_LINKS.map((link) => { 
          return <Link key={link.id} href={link.link} className={cn(
            "p-2 flex items-center gap-2 ",
            path === link.link ? 'bg-background1 border-r-[2px] border-r-primary text-primary rounded-l-[8px]' : ''
          )}>
            <i className={`${link.icon} text-[20px]`}/>
            {link.label}
          </Link>
        })
      }
    </div>
    <div className="h-full flex-1">
      {children}
    </div>
  </div>
}
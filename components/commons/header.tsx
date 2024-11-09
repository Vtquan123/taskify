"use client"

import { cn } from "@/lib/utils"
import { AlignJustify } from "lucide-react"
import React from "react"
import {
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui"
import { usePathname } from "next/navigation"
import startCase from 'lodash/startCase'
import { useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { trpc } from "@/trpc/client"
import {User} from '@prisma/client'
import { getName } from "@/utils/client/common"

type NavItem = {
  id: string
  label?: string,
  icon?: string,
  link?: string,
  child?: NavItem[]
  parent?: string
  render?: () => React.ReactNode
  level?: number,
  isActive?: boolean
}

export interface SideNavProps {
  data: NavItem[],
  className?: string,
  collapse?: boolean,
  handleCollapse: () => void
}

export interface HeadNavProps {
  className?: string
}

const renderNavigation = (data: NavItem[], collapse?: boolean) => {
  const pathName = usePathname()
  return <>
        {
      data.map((navItem: NavItem, index: number) => {
        const isActive = navItem?.link && pathName.includes(navItem.link)
        return navItem?.render
          ? <div key={navItem.id} className={`${navItem.id === 'nav.footer' ? 'mt-auto' : ''}`}>
            {navItem.render()}
          </div>
          : navItem.id === 'nav.divider'
            ? <div key={`${navItem.id}-${index}`} className={cn(
              "h-[1px] w-full bg-borderGray my-4",
              `${collapse ? 'my-3' : ''}`,
            )}></div>
            : <div key={navItem.id} className={`${navItem.id === 'nav.footer' ? 'mt-auto' : ''}`}>
              <Accordion type="multiple">
                <AccordionItem value={navItem.id} className={cn(
                  "border-none",
                  `${collapse ? 'w-[40px] h-[40px]' : ''}`,
                )}>
                  <Link href={navItem?.link || '/'}>
                    <AccordionTrigger
                      key={`${navItem.id}-trigger`}
                      className={cn(
                        "py-0 hover:no-underline p-2 rounded-[8px] w-full border-transparent hover:border-borderGray border hover:bg-white",
                        `${isActive ? 'border-borderGray bg-white' : ''}`,
                        `${collapse ? 'w-[40px] h-[40px] flex justify-center' : ''}`
                      )}
                      isParent={!!navItem?.child?.length}>
                      <div style={{ marginLeft: navItem?.level ? `${navItem.level * 12}px` : '' }} className="flex items-center gap-2">
                        {navItem?.icon && <i className={cn(
                          `${navItem?.icon} ${isActive ? 'text-primary' : ''}`,
                          'text-[20px]'
                        )} />}
                        {!collapse && <span>{navItem?.label || null}</span>}
                      </div>
                    </AccordionTrigger>
                  </Link>
                  {!collapse && !!navItem?.child?.length && <AccordionContent
                    key={`${navItem.id}-content-${index}`}
                    className="p-0 mt-2">
                    {navItem.child.map((item: any) => renderNavigation(navItem.child!))}
                  </AccordionContent>}
                </AccordionItem>
              </Accordion>
            </div>
              
        })}
      </>
}

const SideNav: React.FC<SideNavProps> = ({ data, className, collapse, handleCollapse = () => { } }) => {
  return (
    <nav id="side-nav" className={cn(
      'h-[100vh] w-[250px] bg-background2 border-r-[1px] border-borderGray fixed top-0 flex flex-col p-3 z-50 transition-width',
      `${collapse ? 'w-[60px] p-2' : ''}`,
      className
    )}>
      {renderNavigation(data, collapse)}
      <div className={cn(
        "absolute right-0 top-[62px] translate-x-1/2 transition-all",
        `${collapse ? 'top-[33px]' : ''}`
      )}>
        <Button variant="outline" size="icon" className="rounded-[20px] w-[30px] h-[30px]" onClick={handleCollapse}>
          <i className={cn(
            "ri-arrow-left-s-line text-[20px]",
            `${collapse ? 'ri-arrow-right-s-line' : ''}`
          )} />
        </Button>
      </div>
    </nav>
  )
}

const HeadNav: React.FC<HeadNavProps> = ({ className }) => {
  // const [open, setOpen] = useState(false)
  return <nav id="head-nav" className={cn(
    'w-[100vw] h-[60px] fixed top-0 bg-background2 border-b-[1px] border-borderGray flex py-4 px-6 justify-between items-center z-50',
    className
  )}>
    <div>Logo</div>
    <Button variant="ghost" size="icon">
        <AlignJustify className="!w-[30px] !h-[30px]"/>
    </Button>
  </nav>
}

const UserNav: React.FC<any> = ({ className }) => {
  const pathName = usePathname()
  const title = startCase(pathName.split('/')[1])
  const { signOut } = useClerk()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(getQueryKey(trpc.user.me)) as User

  const {name, shortName} = getName(user?.firstName, user?.lastName)

  const handleLogOut = () => signOut({redirectUrl: '/sign-in'})

  return <div className={cn(
    'flex items-center justify-between py-4 px-6 w-full',
    className
  )}>
    <p className="text-[1.5rem] font-semibold">{title}</p>
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="p-0 hover:bg-transparent">
        <i className="ri-settings-4-line text-[24px]" />
      </Button>
      <div className="w-[1px] bg-borderGray h-[1.5rem]"/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.profileImageUrl || ''} alt="@user" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <i className="ri-user-3-line"/>
            <span>My profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogOut}>
            <i className="ri-logout-box-line"/>
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
}

export {
  SideNav,
  HeadNav,
  UserNav
}
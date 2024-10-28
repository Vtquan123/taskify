// "use client"

import { cn } from "@/lib/utils"
import { AlignJustify } from "lucide-react"
import React, { useState } from "react"
import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui"

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
  className?: string
}

export interface HeadNavProps {
  className?: string
}

const renderNavigation = (data: NavItem[]) => {
  return <>
        {
          data.map((navItem: NavItem, index: number) => navItem?.render
            ? <div key={navItem.id} className={`${navItem.id === 'nav.footer' ? 'mt-auto' : ''}`}>
              {navItem.render()}
            </div>
            : navItem.id === 'nav.divider'
              ? <div key={`${navItem.id}-${index}`} className="h-[1px] w-full bg-borderGray my-4"></div>
              : <div key={navItem.id} className={`${navItem.id === 'nav.footer' ? 'mt-auto' : ''}`}>
                <Accordion type="multiple">
                  <AccordionItem value={navItem.id} className="border-none">
                    <AccordionTrigger
                      className={cn(
                        "py-0 hover:no-underline p-3 rounded-[8px] w-full border-transparent hover:border-borderGray border hover:bg-white",
                        `${navItem?.isActive ? 'border-borderGray bg-white' : ''}`
                      )}
                      isParent={!!navItem?.child?.length}>
                      <div style={{ marginLeft: navItem?.level ? `${navItem.level * 12}px` : '' }} className="flex items-center gap-2">
                        {navItem?.icon && <i className={cn(
                          `${navItem?.icon} ${navItem?.isActive ? 'text-primary': ''}`,
                          'text-[20px]'
                        )}/>}
                        <span>{navItem?.label || null}</span>
                      </div>
                    </AccordionTrigger>
                    {!!navItem?.child?.length && <AccordionContent className="p-0 first:mt-2" key={navItem.id}>
                      {navItem.child.map((item: any) => renderNavigation(navItem.child!))}
                    </AccordionContent>}
                  </AccordionItem>
                </Accordion>
              </div>
              
          )
        }
      </>
}

const SideNav: React.FC<SideNavProps> = ({data, className}) => {
  return (
    <nav id="side-nav" className={cn(
      'h-[100vh] w-[250px] bg-background2 border-r-[1px] border-borderGray fixed top-0 flex flex-col p-4 z-50',
      className
    )}>
      {renderNavigation(data)}
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

export {
  SideNav,
  HeadNav
}
'use client'
import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { adminAppSidebarMenu } from '@/lib/adminSidebarMenu'
import Logo from '@/public/next.svg'
import { Collapsible } from '@/components/ui/collapsible'
import { LucideChevronRight, X } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'


const AppSidebar = () => {
    return (
        <div>
            <Sidebar>
                <SidebarHeader className="border-b h-14 p-0">
                    <div className='flex justify-between'>
                        {/* <Image src={Logo} alt='logo' height={Logo.height} width={Logo.width} className='dark:hidden' /> */}
                        <Image src={Logo} alt='logo' height={50} width={Logo.width} className='dark:block' />
                        <Button type="button" size={'icon'} className={'md:hidden'}>
                            {/* <LucideChevronRight /> */}
                            <X />
                        </Button>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {
                            adminAppSidebarMenu.map((menu, index) => (
                                <Collapsible key={index} className='group/collapsible'>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger >
                                            <SidebarMenuButton asChild>
                                                <Link href={menu.url}>
                                                    <menu.icon />
                                                    {menu.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))
                        }
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}

export default AppSidebar
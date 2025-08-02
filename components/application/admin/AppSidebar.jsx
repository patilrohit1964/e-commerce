'use client'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from "@/components/ui/sidebar"
import { adminAppSidebarMenu } from '@/lib/adminSidebarMenu'
import Logo from '@/public/next.svg'
import { LucideChevronRight, X } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'


const AppSidebar = () => {
    const { toggleSidebar } = useSidebar()
    return (
        <div>
            <Sidebar className={'z-50'}>
                <SidebarHeader className="border-b h-14 p-0">
                    <div className='flex justify-between'>
                        {/* <Image src={Logo} alt='logo' height={Logo.height} width={Logo.width} className='dark:hidden' /> */}
                        <Image src={Logo} alt='logo' height={50} width={Logo.width} className='dark:block' />
                        <Button type="button" size={'icon'} className={'md:hidden'} variant={'secondary'} onClick={toggleSidebar}>
                            {/* <LucideChevronRight /> */}
                            <X />
                        </Button>
                    </div>
                </SidebarHeader>
                <SidebarContent className={'p-3'}>
                    <SidebarMenu>
                        {
                            adminAppSidebarMenu.map((menu, index) => (
                                <Collapsible key={index} className='group/collapsible'>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild className={'font-semibold px-2 py-5'}>
                                                <Link href={menu.url}>
                                                    <menu.icon />
                                                    {menu.title}
                                                    {menu.subMenu && menu.subMenu.length > 0 && (
                                                        <LucideChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' /> //here this classname helps when this parent collapsibel open then rotate this comp in 90 deg
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {
                                            menu.subMenu && menu.subMenu.length > 0 &&
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {menu.subMenu.map((subMenu, idx) => (
                                                        <SidebarMenuSubItem key={idx}>
                                                            <SidebarMenuSubButton asChild className={'px-2 py-5'}>
                                                                <Link href={subMenu.url}>{subMenu.title}</Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        }
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
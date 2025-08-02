import AppSidebar from '@/components/application/admin/AppSidebar'
import Topbar from '@/components/application/admin/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='md:w-[calc(100vw-16rem)]'>
                <div className='pt-[70px] px-8 min-h-[calc(100vh-40px)] pb-10'>
                    <Topbar />
                    {children}
                </div>
                {children}
                <div className='border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
                    &copy; 2025 Developer Patil. All Rights Reserved
                </div>
            </main>
        </SidebarProvider>
    )
}

export default layout
import AppSidebar from '@/components/application/admin/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
        </SidebarProvider>
    )
}

export default layout
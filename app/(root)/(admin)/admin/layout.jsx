import AppSidebar from '../../../../components/application/admin/AppSidebar'
import ThemeProvider from '../../../../components/application/admin/ThemeProvider'
import Topbar from '../../../../components/application/admin/Topbar'
import { SidebarProvider } from '../../../../components/ui/sidebar'

const layout = ({ children }) => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar />
                <main className='md:w-[calc(100vw-16rem)] w-full'>
                    <div className='pt-[70px] px-3 md:px-8 min-h-[calc(100vh-40px)] pb-10'>
                        <Topbar />
                        {children}
                    </div>
                    <div className='border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
                        &copy; 2025 Developer Patil. All Rights Reserved
                    </div>
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default layout
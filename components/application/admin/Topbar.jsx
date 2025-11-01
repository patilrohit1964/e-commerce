'use client'
import { Menu } from 'lucide-react'
import { Button } from '../../ui/button'
import { useSidebar } from '../../ui/sidebar'
import ThemeSwitch from './ThemeSwitch'
import UserDropDown from './UserDropDown'
import AdminSearch from './AdminSearch'

const Topbar = () => {
    const { toggleSidebar } = useSidebar()
    return (
        <div className='fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card'>
            <div>
                <AdminSearch />
            </div>
            <div className='flex items-center gap-2'>
                <ThemeSwitch />
                <UserDropDown />
                <Button onClick={toggleSidebar} type="button" variant={'secondary'} size={'icon'} className={'ms-2 md:hidden'}>
                    <Menu />
                </Button>
            </div>
        </div>
    )
}

export default Topbar
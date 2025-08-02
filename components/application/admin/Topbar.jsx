import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'
import UserDropDown from './UserDropDown'

const Topbar = () => {
    return (
        <div className='fixed border h-14 w-full left-0 top-0 z-30 md:ps-72 md:pe-8 flex justify-between items-center bg-white dark:bg-card'>
            <div>
                search component
            </div>
            <div className='flex items-center gap-2'>
                <ThemeSwitch />
                <UserDropDown />
                <Button type="button" size={'icon'} className={'ms-2 md'}>
                    <Menu />
                </Button>
            </div>
        </div>
    )
}

export default Topbar
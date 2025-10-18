'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const ThemeSwitch = () => {
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button type="button" variant={'ghost'} className={'cursor-pointer'}>
                    <Sun className='dark:hidden h-4 w-4' />
                    <Moon className='hidden dark:block h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Themes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Light", "Dark", "System"].map((el, idx) => (
                    <DropdownMenuItem key={idx} onClick={() => setTheme(el.toLowerCase())}>{el}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeSwitch
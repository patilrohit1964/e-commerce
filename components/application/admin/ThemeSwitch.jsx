'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button type="button" variant={'ghost'} className={'cursor-pointer'}>
                    <Sun className='dark:hidden' />
                    <Moon className='hidden dark:block' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Themes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Light", "Dark", "System"].map((el, idx) => (
                    <DropdownMenuItem onClick={() => setTheme(el.toLowerCase())}>{el}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeSwitch
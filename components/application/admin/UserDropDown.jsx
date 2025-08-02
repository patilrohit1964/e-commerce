'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Logo from '@/public/next.svg'
import { logout } from '@/store/reducers/authReducer'
import { ClipboardList, LogOut, Shirt } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
const userMenu = [
  {
    title: 'Product',
    icon: <Shirt />,
    url: ''
  },
  {
    title: 'Orders',
    icon: <ClipboardList />,
    url: ''
  },
  {
    title: 'Logout',
    icon: <LogOut color='red'/>,
    url: ''
  },
]
const UserDropDown = () => {
  const dispatch = useDispatch()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant={'secondary'} className={'cursor-pointer'}>
          <Avatar>
            <AvatarImage src={Logo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'me-5 w-44'}>
        <DropdownMenuLabel>Developer Rohit</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenu.map((el, idx) => (
          <Link href={el.url}>
            <DropdownMenuItem key={idx} className={`${el.title == 'Logout' && 'text-red-500'}`} onClick={() => el.title == 'Logout' && logout()}>
              {el.icon}
              {el.title}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDown
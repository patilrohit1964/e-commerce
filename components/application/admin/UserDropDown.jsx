'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { showToast } from '@/lib/toast'
import Logo from '@/public/next.svg'
import { WEBSITE_LOGIN } from '@/routes/websiteRoute'
import { logout } from '@/store/reducers/authReducer'
import axios from 'axios'
import { ClipboardList, LogOut, Shirt } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    icon: <LogOut color='red' />,
    url: ''
  },
]
const UserDropDown = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const logoutHandler = async () => {
    try {
      const { data: logoutResponce } = await axios.post('/api/auth/logout')
      if (!data.success) {
        throw new Error(data?.message)
      }
      dispatch(logout())
      showToast('success', logoutResponce?.message)
      router.push(WEBSITE_LOGIN)
    }
    catch (error) {
      console.log(error)
      showToast('error', error.message)
    }
  }
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
            <DropdownMenuItem key={idx} className={`${el.title == 'Logout' && 'text-red-500'}`} onClick={logoutHandler}>
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
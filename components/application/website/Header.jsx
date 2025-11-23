'use client'
import { Menu, Search, UserCircle, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from '../../../routes/websiteRoute'
import Cart from './Cart'
import ShopSearch from './ShopSearch'
const Header = () => {
    const { auth } = useSelector((state) => state.authStore)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    return (
        <div className='bg-white border-b lg:px-32 px-4'>
            <div className='flex justify-between items-center lg:py-5 py-3'>
                <Link href={WEBSITE_HOME}>
                    logo
                    {/* <Image src={Logo} alt='logo' width={383} height={146} className='lg:w-32 w-24' /> */}
                </Link>
                <div className='flex justify-between gap-20'>
                    {/* all nav links ui */}
                    <nav className={`lg:relative lg:w-auto lg:left-0 lg:h-auto lg:top-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-screen ${isMobile ? 'left-0' : '-left-full'} transition-all duration-300`}>

                        <div className='lg:hidden flex items-center justify-between bg-gray-50 py-3 border-b px-3'>
                            {/* image  */}
                            logo
                            <button type='button' onClick={() => setIsMobile(false)}>
                                <X />
                            </button>

                        </div>

                        <ul className='lg:flex items-center justify-between px-3 gap-10'>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Home</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>About</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Contact</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_SHOP} className='block py-2'>Shop</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>T-shirt</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Hoodies</Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Oversized</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* search, cart, auth ui */}
                    <div className='flex items-center justify-between gap-8'>
                        <button type='button' onClick={() => setShowSearch(!showSearch)}>
                            <Search className='text-gray-500 hover:text-primary cursor-pointer' />
                        </button>
                        <Cart />
                        {
                            auth ? (
                                <Link href={USER_DASHBOARD}>
                                    <Avatar className={'border border-gray-400'}>
                                        <AvatarImage src={auth?.avatar?.url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxqETGq7dg-ejdhZLas43Ad8zNvgsUGiQwQ&s'} />
                                        <AvatarFallback>Image</AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) :
                                (
                                    <Link href={WEBSITE_LOGIN}>
                                        <UserCircle className='text-gray-500 hover:text-primary cursor-pointer' />
                                    </Link>
                                )
                        }
                        {/* menubar */}
                        <button type='button' className='lg:hidden block' onClick={() => setIsMobile(true)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>
            {/* search dialog open */}
            <ShopSearch isShow={showSearch} />
        </div>
    )
}

export default Header
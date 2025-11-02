'use client'
import { Search, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN } from '../../../routes/websiteRoute'
import Cart from './Cart'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'

const Header = () => {
    const { auth } = useSelector((state) => state.authStore)
    console.log('auth', auth);
    return (
        <div className='bg-white border-b lg:px-32 px-4'>
            <div className='flex justify-between items-center lg:py-5 py-3'>
                <Link href={WEBSITE_HOME}>
                    logo
                    {/* <Image src={Logo} alt='logo' width={383} height={146} className='lg:w-32 w-24' /> */}
                </Link>
                <div className='flex justify-between items-center gap-20'>
                    <nav>
                        <ul className='flex items-center justify-between px-3 gap-10'>
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
                                <Link href={WEBSITE_HOME} className='block py-2'>Shop</Link>
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
                    <div className='flex items-center justify-between gap-8'>
                        <button type='button'>
                            <Search className='text-gray-500 hover:text-primary cursor-pointer' />
                        </button>
                        <Cart />
                        {
                            auth ? (
                                <Link href={USER_DASHBOARD}>
                                    <Avatar className={'border border-gray-600'}>
                                        <AvatarImage src={auth?.avatar?.url || 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} />
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
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
import { Facebook, Instagram, LocationCity, Twitter, WhatsApp, YouTube, YoutubeSearchedFor } from '@mui/icons-material'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t'>
      <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4'>
        <div className='lg:col-span-1 md:col-span-2 col-span-1'>
          logo
          <p className='text-gray-500 text-sm'></p>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className='text-xl font-bold uppercase mb-5'>Categories</h3>
          <ul>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={''}>T-shirt</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={''}>Hoodies</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={''}>Oversized</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={''}>Full Sleeves</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={''}>Polo</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className='text-xl font-bold uppercase mb-5'>USEFUL LINKS</h3>
          <ul>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/'}>Home</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/shop'}>Shop</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/about-us'}>About</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/auth/register'}>Register</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/auth/login'}>Login</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className='text-xl font-bold uppercase mb-5'>HELP CENTER</h3>
          <ul>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/auth/register'}>Register</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/auth/login'}>Login</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/profile'}>My Account</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/privacy-policy'}>Privacy Policy</Link></li>
            <li className='mb-2 text-gray-500 hover:text-primary transition duration-300'><Link href={'/terms-and-conditions'}>Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className='text-xl font-bold uppercase mb-5'>CONTACT</h3>
          <ul>
            <li className='mb-2 text-gray-500 flex gap-3 hover:text-primary transition duration-300'>
              <LocationCity size={20} />
              <Link href={''}>
                E-store market mumbai <br /> inida 425408
              </Link>
            </li>
            <li className='mb-2 text-gray-500 flex gap-3 hover:text-primary transition duration-300'>
              <Phone size={20} />
              <Link href={''}>+91-7038394748</Link>
            </li>
            <li className='mb-2 text-gray-500 flex gap-3 hover:text-primary transition duration-300'>
              <Mail size={20} />
              <Link href={''}>support@gmail.com</Link>
            </li>
            <li className='mb-2 text-gray-500 flex gap-5'>
              <Link href={''} className='hover:text-primary transition duration-300'><YouTube /></Link>
              <Link href={''} className='hover:text-primary transition duration-300'><Instagram /></Link>
              <Link href={''} className='hover:text-primary transition duration-300'><Facebook /></Link>
              <Link href={''} className='hover:text-primary transition duration-300'><Twitter /></Link>
              <Link href={''} className='hover:text-primary transition duration-300'><WhatsApp /></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='py-5 bg-gray-100'>
        <p className='text-center'>&copy; Estore. All Right Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
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
          <h3 className=''>Categories</h3>
          <ul>
            <li><Link href={''}>T-shirt</Link></li>
            <li><Link href={''}>Hoodies</Link></li>
            <li><Link href={''}>Oversized</Link></li>
            <li><Link href={''}>Full Sleeves</Link></li>
            <li><Link href={''}>Polo</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className=''>USEFUL LINKS</h3>
          <ul>
            <li><Link href={''}>Home</Link></li>
            <li><Link href={''}>Shop</Link></li>
            <li><Link href={''}>About</Link></li>
            <li><Link href={''}>Register</Link></li>
            <li><Link href={''}>Login</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className=''>HELP CENTER</h3>
          <ul>
            <li><Link href={''}>Register</Link></li>
            <li><Link href={''}>Login</Link></li>
            <li><Link href={''}>My Account</Link></li>
            <li><Link href={''}>Privacy Policy</Link></li>
            <li><Link href={''}>Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-between'>
          <h3 className=''>CONTACT</h3>
          <ul>
            <li><Link href={''}>E-store market mumbai <br /> inida 425408</Link></li>
            <li><Link href={''}>+91-7038394748</Link></li>
            <li><Link href={''}>support@gmail.com</Link></li>
            <li><Link href={''}>links</Link></li>
          </ul>
        </div>
      </div>

    </footer>
  )
}

export default Footer
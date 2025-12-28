'use client'
import { Button } from '../../ui/button'
import { USER_DASHBOARD, USER_ORDERS, USER_PROFILE, WEBSITE_LOGIN } from '../../../routes/websiteRoute'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/reducers/authReducer'
import { showToast } from '../../../lib/toast'
import axios from 'axios'

const UserPanelNavigation = () => {
    const pathName = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()
    const logoutHandler = async () => {
        try {
            const { data: logoutResponce } = await axios.post('/api/auth/logout')
            if (!logoutResponce.success) {
                throw new Error(logoutResponce?.message)
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
        <div className='border shadow-sm p-4 rounded'>
            <ul>
                <li className='mb-2'>
                    <Link href={USER_DASHBOARD} className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathName.startsWith(USER_DASHBOARD) ? 'bg-primary text-white' : ''}`}>Dashboard</Link>
                </li>
                <li className='mb-2'>
                    <Link href={USER_PROFILE} className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathName.startsWith(USER_PROFILE) ? 'bg-primary text-white' : ''}`}>Profile</Link>
                </li>
                <li className='mb-2'>
                    <Link href={USER_ORDERS} className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathName.startsWith(USER_ORDERS) ? 'bg-primary text-white' : ''}`}>Orders</Link>
                </li>
                <li className='mb-2'>
                    <Button onClick={logoutHandler} className={`block p-3 text-sm rounded hover:bg-primary hover:text-white ${pathName.startsWith(USER_ORDERS) ? 'bg-primary text-white' : ''}`}>Logout</Button>
                </li>
            </ul>
        </div>
    )
}

export default UserPanelNavigation
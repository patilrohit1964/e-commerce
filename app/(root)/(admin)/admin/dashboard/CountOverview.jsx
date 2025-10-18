'use client'
import { Category } from '@mui/icons-material'
import {
    ShoppingCart,
    Users,
} from "lucide-react"
import Link from 'next/link'
import Loading from '../../../../../components/application/Loading'
import { useFetch } from '../../../../../hooks/useFetch'
import { ADMIN_CATEGORY_SHOW, ADMIN_PRODUCT_SHOW, CUSTOMER_SHOW } from '../../../../../routes/adminPaneRoute'

const CountOverview = () => {
    const { data: countData, loading } = useFetch('/api/dashboard/admin/count');
    if (loading) {
        return <Loading />
    }
    return (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5'>
            <Link href={ADMIN_CATEGORY_SHOW}>
                <div className='flex items-center justify-between p-3 rounded-lg border border-l-4 shadow border-l-green-400 bg-white dark:bg-card dark:border-gray-800 dark:border-l-green-400'>
                    <div>
                        <h4 className='font-medium'>Total Categories</h4>
                        <span className='text-xl font-bold'>{countData?.data?.category}</span>
                    </div>
                    <div>
                        <span className='w-12 h-12 border flex justify-center items-center rounded-full bg-green-500 text-white'>
                            <Category />
                        </span>
                    </div>
                </div>
            </Link>
            <Link href={ADMIN_PRODUCT_SHOW}>
                <div className='flex items-center justify-between p-3 rounded-lg border border-l-4 shadow border-l-blue-400 bg-white dark:bg-card dark:border-gray-800 dark:border-l-blue-400'>
                    <div>
                        <h4 className='font-medium'>Total Product</h4>
                        <span className='text-xl font-bold'>{countData?.data?.product}</span>
                    </div>
                    <div>
                        <span className='w-12 h-12 border flex justify-center items-center rounded-full bg-blue-500 text-white'>
                            <ShoppingCart />
                        </span>
                    </div>
                </div>
            </Link>
            <Link href={CUSTOMER_SHOW}>
                <div className='flex items-center justify-between p-3 rounded-lg border border-l-4 shadow border-l-yellow-400 bg-white dark:bg-card dark:border-gray-800 dark:border-l-yellow-400'>
                    <div>
                        <h4 className='font-medium'>Total Customers</h4>
                        <span className='text-xl font-bold'>{countData?.data?.customer}</span>
                    </div>
                    <div>
                        <span className='w-12 h-12 border flex justify-center items-center rounded-full bg-yellow-500 text-white'>
                            <Users />
                        </span>
                    </div>
                </div>
            </Link>
            <Link href={''}>
                <div className='flex items-center justify-between p-3 rounded-lg border border-l-4 shadow border-l-cyan-400 bg-white dark:bg-card dark:border-gray-800 dark:border-l-cyan-400'>
                    <div>
                        <h4 className='font-medium'>Total Orders</h4>
                        <span className='text-xl font-bold'>10</span>
                    </div>
                    <div>
                        <span className='w-12 h-12 border flex justify-center items-center rounded-full bg-cyan-500 text-white'>
                            <Category />
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CountOverview
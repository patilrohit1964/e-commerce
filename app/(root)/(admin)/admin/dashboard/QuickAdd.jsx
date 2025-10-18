import { Category } from '@mui/icons-material'
import {
    ShoppingCart,
    Users,
} from "lucide-react"
import Link from 'next/link'
import { ADMIN_CATEGORY_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD } from '../../../../../routes/adminPaneRoute'
const QuickAdd = () => {
    return (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5 mt-10'>
            <Link href={ADMIN_CATEGORY_ADD}>
                <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-green-400 via-green-500 to-green-400'>
                    <h4 className='font-medium text-white dark:text-black'>Add Category</h4>
                    <span className='w-12 h-12 border dark:border-green-800 flex justify-center items-center rounded-full text-white'>
                        <Category />
                    </span>
                </div>
            </Link>
            <Link href={ADMIN_PRODUCT_ADD}>
                <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-400'>
                    <h4 className='font-medium text-white dark:text-black'>Add Product</h4>
                    <span className='w-12 h-12 border dark:border-blue-800 flex justify-center items-center rounded-full text-white'>
                        <ShoppingCart />
                    </span>
                </div>
            </Link>
            <Link href={ADMIN_COUPON_ADD}>
                <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-yellow-400 via-yellow-500 to-yellow-400'>
                    <h4 className='font-medium text-white dark:text-black'>Add Coupon</h4>
                    <span className='w-12 h-12 border dark:border-yellow-800 flex justify-center items-center rounded-full text-white'>
                        <Users />
                    </span>
                </div>
            </Link>
            <Link href={ADMIN_MEDIA_SHOW}>
                <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-cyan-400 via-cyan-500 to-cyan-400'>
                    <h4 className='font-medium text-white dark:text-black'>Upload Media</h4>
                    <span className='w-12 h-12 border dark:border-cyan-800 flex justify-center items-center rounded-full text-white'>
                        <Category />
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default QuickAdd
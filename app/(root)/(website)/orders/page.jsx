'use client'
import { useFetch } from '../../../../hooks/useFetch'
import UserPanelLayout from '../../../../components/application/website/UserPanelLayout'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import React from 'react'
import Link from 'next/link'
import { WEBSITE_ORDER_DETAILS } from '../../../../routes/websiteRoute'
const breadCrumbData = {
    title: 'Orders',
    links: [{ label: 'Orders' }]
}
const UserOrders = () => {
    const { data: userOrdersData, loading } = useFetch('/api/user-orders')
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumbData} />
            <UserPanelLayout>
                <div className='shadow rounded'>
                    <div className='p-5 text-xl form-semibold border-b'>
                        Orders
                    </div>
                    <div className='p-5'>
                        {loading ?
                            <div className='text-center py-5'>Loading...</div>
                            :
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='p-2 text-sm border-b text-nowrap text-gray-500'>Sr.No</th>
                                        <th className='p-2 text-sm border-b text-nowrap text-gray-500'>Order id</th>
                                        <th className='p-2 text-sm border-b text-nowrap text-gray-500'>Total Item</th>
                                        <th className='p-2 text-sm border-b text-nowrap text-gray-500'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userOrdersData && userOrdersData?.data?.length > 0 ?
                                        userOrdersData?.data?.map((order, idx) => (
                                            <tr key={order?._id}>
                                                <td className='text-center text-sm text-gray-500 p-2 font-bold'>{idx + 1}</td>
                                                <td className='text-center text-sm text-gray-500 p-2 font-bold'>
                                                    <Link href={WEBSITE_ORDER_DETAILS(order?.order_id)} className='hover:underline hover:text-blue-400'>{order?.order_id}</Link>
                                                </td>

                                                <td className='text-center text-sm text-gray-500 p-2 font-bold'>
                                                    {order?.products?.length}
                                                </td>
                                                <td className='text-center text-sm text-gray-500 p-2 font-bold'>
                                                    {order?.totalAmount}
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={4} className="text-center text-gray-500 py-4">
                                                You haven't placed any orders yet. Start shopping and your orders will show up here!
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </UserPanelLayout>
        </div>
    )
}

export default UserOrders

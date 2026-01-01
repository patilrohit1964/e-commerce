'use client'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import UserPanelLayout from '../../../../components/application/website/UserPanelLayout'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import React from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { WEBSITE_ORDER_DETAILS } from '../../../../routes/websiteRoute'
const breadCrumbData = {
  title: 'Dashboard',
  links: [{ label: 'Dashboard' }]
}
const MyAccount = () => {
  const { data: dashboardInfo } = useFetch('/api/dashboard/user')
  const { cartItems } = useSelector(state => state?.cartStore)
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className='shadow rounded'>
          <div className='p-5 text-xl form-semibold border'>
            Dashboard
          </div>
          <div className='p-5'>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
              <div className='flex items-center justify-between gap-5 border rounded p-3'>
                <div>
                  <h4 className='font-semibold text-lg mb-1'>Total Orders</h4>
                  <span className='font-semibold text-gray-500'>{dashboardInfo?.data?.totalOrder || 0}</span>
                </div>
                <div className='w-16 h-16 bg-primary rounded-full flex justify-center items-center'>
                  <ShoppingBag color='white' />
                </div>
              </div>
              <div className='flex items-center justify-between gap-5 border rounded p-3'>
                <div>
                  <h4 className='font-semibold text-lg mb-1'>Items In Cart</h4>
                  <span className='font-semibold text-gray-500'>{cartItems?.length || 0}</span>
                </div>
                <div className='w-16 h-16 bg-primary rounded-full flex justify-center items-center'>
                  <ShoppingCart color='white' />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4 className='text-lg font-semibold mb-3'>Recent Orders</h4>
              <div className="overflow-auto">
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
                    {dashboardInfo && dashboardInfo?.data?.recentOrders?.length > 0 ?
                      dashboardInfo?.data?.recentOrders?.map((order, idx) => (
                        <tr key={order?._id}>
                          <td className='text-center text-sm text-gray-500 p-2 font-bold'>{idx + 1}</td>
                          <td className='text-center text-sm text-gray-500 p-2 font-bold'>
                            <Link href={WEBSITE_ORDER_DETAILS(order?.order_id)} className='hover:underline hover:text-blue-400'>{order?.order_id}</Link>
                          </td>
                          <td className='text-center text-sm text-gray-500 p-2 font-bold'>
                            {order?.products.length}
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
              </div>
            </div>
          </div>
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default MyAccount
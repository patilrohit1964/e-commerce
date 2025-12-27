import { WEBSITE_PRODUCT_DETAILS } from '../../../../../routes/websiteRoute'
import WebsiteBreadCrumb from '../../../../../components/application/website/WebsiteBreadCrumb'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const breadCrumb = {
    title: 'Order Details',
    links: [
        {
            label: 'Order Details'
        }
    ]
}
const OrderDetails = async ({ params }) => {
    const { orderId } = await params
    const { data: orderDetailsData } = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderId}`)
    console.log('orderDetailsData', orderDetailsData);
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumb} />
            <div className='lg:px-32 px-5 my-20'>
                {orderDetailsData && !orderDetailsData?.success
                    ?
                    <div className='flex justify-center items-center py-32'>
                        <h4 className='text-red-500 text-xl font-semibold'>Order Not found</h4>
                    </div>
                    :
                    <div>
                        <div className='mb-5'>
                            <p><b>Order Id:</b></p>
                            <p><b>Transaction Id:</b></p>
                            <p className='capitalize'><b>Status</b>{orderDetailsData?.status}</p>
                        </div>
                        <table className='w-full border'>
                            <thead className='border-b bg-gray-50 md:table-header-group hidden'>
                                <tr>
                                    <th className='text-start p-3'>Product</th>
                                    <th className='text-start p-3'>Price</th>
                                    <th className='text-start p-3'>Quantity</th>
                                    <th className='text-start p-3'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetailsData && orderDetailsData?.products?.map((product) => (
                                    <tr key={product?.variantId?._id}>
                                        <td className='p-3'>
                                            <div className='flex items-center gap-5'>
                                                <Image src={product?.variantId?.medias[0]?.secure_url} width={60} height={60} className='rounded' alt='order img' />
                                            </div>
                                            <div>
                                                <h4 className='text-lg line-clamp-1'>
                                                    <Link href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}></Link>
                                                </h4>
                                                <p>{product?.variantId?.color}</p>
                                                <p>{product?.variantId?.size}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div >
    )
}

export default OrderDetails
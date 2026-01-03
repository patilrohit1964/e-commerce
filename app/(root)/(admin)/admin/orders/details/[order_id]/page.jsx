'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../../components/application/admin/BreadCrumb'
import ButtonLoading from '../../../../../../../components/application/ButtonLoading'
import Select from '../../../../../../../components/application/Select'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../../lib/toast'
import { ADMIN_DASHBOARD, ADMIN_ORDERS_SHOW } from '../../../../../../../routes/adminPaneRoute'
import { WEBSITE_PRODUCT_DETAILS } from '../../../../../../../routes/websiteRoute'
const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Orders",
        href: ADMIN_ORDERS_SHOW,
    },
    {
        label: "Orders Details",
        href: '',
    }
]
const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Unverified', value: 'unverified' },
]
const OrderDetails = ({ params }) => {
    const { order_id } = use(params)
    const [orderDetailsData, setOrderDetailsData] = useState({})
    const [orderStatus, setOrderStatus] = useState()
    const [statusLoading, setStatusLoading] = useState(false)
    const { data, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${order_id}`)
    useEffect(() => {
        if (data && data?.success) {
            setOrderDetailsData(data?.data)
            setOrderStatus(data?.data?.status)
        }
    }, [data])
    const handleOrderStatus = async () => {
        setStatusLoading(true)
        try {
            const { data: statusResponce } = await axios.put(`/api/orders/update-status`, {
                _id: orderDetailsData?._id,
                status: orderStatus
            })
            if (!statusResponce?.success) {
                throw new Error(statusResponce?.message)
            }
            showToast('success', statusResponce?.message)
        }
        catch (error) {
            console.log(error)
        } finally {
            setStatusLoading(false)
        }

    };
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <div className='px-5 border'>
                {!orderDetailsData
                    ?
                    <div className='flex justify-center items-center py-32'>
                        <h4 className='text-red-500 text-xl font-semibold'>Order Not found</h4>
                    </div>
                    :
                    <div className='px-5'>
                        <div className='py-2 border-b mb-3'>
                            <h4 className='text-lg font-bold text-primary'>Order Details</h4>
                        </div>
                        <div className='mb-5'>
                            <p><b>Order Id:</b> {orderDetailsData?.order_id}</p>
                            <p><b>Transaction Id:</b> {orderDetailsData?.payment_id}</p>
                            <p className='capitalize'><b>Status: </b>{orderDetailsData?.status}</p>
                        </div>
                        <table className='w-full border'>
                            <thead className='border-b md:table-header-group hidden dark:bg-card'>
                                <tr>
                                    <th className='text-start p-3'>Product</th>
                                    <th className='text-center p-3'>Price</th>
                                    <th className='text-center p-3'>Quantity</th>
                                    <th className='text-center p-3'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetailsData && orderDetailsData?.products?.map((product) => (
                                    <tr key={product?.variantId?._id} className='md:table-row block border-b'>
                                        <td className='p-3 md:table-cell'>
                                            <div className='flex items-center gap-5'>
                                                <Image src={product?.variantId?.medias[0]?.secure_url} width={60} height={60} className='rounded' alt='order img' />
                                                <div>
                                                    <h4 className='text-lg'>
                                                        <Link href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}>{product?.productId?.name}</Link>
                                                    </h4>
                                                    <p>Color: {product?.variantId?.color}</p>
                                                    <p className='uppercase'>Size: {product?.variantId?.size}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Price</span>
                                            <span>{product?.sellingPrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Quantity</span>
                                            <span>{product?.quantity}</span>
                                        </td>
                                        <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                            <span className='md:hidden font-medium'>Total</span>
                                            <span>{(product?.quantity * product?.sellingPrice)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border my-10">
                            <div className='p-5'>
                                <h4 className='text-lg font-semibold mb-5'>Shipping Address</h4>
                                <div>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td className='font-medium py-2'>Name:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Email:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.email}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Phone:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Country:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.country}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>City:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.city}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Pin Code</td>
                                                <td className='text-end py-2'>{orderDetailsData?.pincode}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Land Mark:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.landmark}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Order Note:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.ordernote || '---'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='p-5'>
                                <h4 className='text-lg font-semibold mb-5'>Order Summary:</h4>
                                <div>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td className='font-medium py-2'>Subtotal:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.subTotal?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Discount:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.discount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Coupon Discount:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.couponDiscountAmount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Total:</td>
                                                <td className='text-end py-2'>{orderDetailsData?.totalAmount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div className='pt-3'>
                                    <h4 className='text-lg font-semibold mb-2'>Order Status</h4>
                                    <Select options={statusOptions} selected={orderStatus} setSelected={(value) => setOrderStatus(value)} placeholder='select' isMulti={false} />
                                    <ButtonLoading loading={statusLoading} type={'button'} onClick={handleOrderStatus} text={"Save Status"} className={'mt-5 cursor-pointer'} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default OrderDetails
'use client'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import { Button } from '../../../../components/ui/button'
import { WEBSITE_CHECKOUT, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '../../../../routes/websiteRoute'
import { increaseQuantity, decreaseQuantity, removeToCart } from '../../../../store/reducers/cartReducer'

const breadCrumb = {
    title: 'Cart',
    links: [
        {
            label: 'Cart'
        }
    ]
}
const CartPage = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(store => store?.cartStore)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const totalAmount = cartItems.reduce((sum, product) => sum + (product?.sellingPrice * product?.quantity), 0)
        const discount = cartItems.reduce((sum, product) => sum + ((product?.mrp - product?.sellingPrice) * product?.quantity), 0)
        setTotal(totalAmount)
        setDiscount(discount)
    }, [cartItems]);
    return (
        <div>
            <WebsiteBreadCrumb props={breadCrumb} />
            {
                cartItems?.length > 0 ?
                    <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
                        <div className='lg:w-[70%] w-full'>
                            <table className='w-full border'>
                                <thead className='border-b bg-gray-50 md:table-header-group hidden'>
                                    <tr>
                                        <th className='text-start p-3'>Product</th>
                                        <th className='text-start p-3'>Price</th>
                                        <th className='text-start p-3'>Quantity</th>
                                        <th className='text-start p-3'>Total</th>
                                        <th className='text-start p-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((cartProduct) => (
                                        <tr key={cartProduct?.variantId} className='md:table-row block border-b'>
                                            <td className='p-3'>
                                                <div className='flex items-center gap-5'>
                                                    <Image src={cartProduct?.media} height={60} width={60} alt={cartProduct?.name} />
                                                    <div>
                                                        <h4 className='text-lg font-medium line-clamp-1'><Link href={WEBSITE_PRODUCT_DETAILS(cartProduct?.url)}>{cartProduct?.name}</Link></h4>
                                                        <p className='text-sm'>Color: {cartProduct?.color}</p>
                                                        <p className='text-sm'>Size: {cartProduct?.size.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                <span className='md:hidden font-medium'>Price</span>
                                                <span>
                                                    {cartProduct?.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                                </span>
                                            </td>
                                            <td className='md:table-cell flex justify-between items-center md:p-3 px-3 pb-2'>
                                                <span className='md:hidden font-medium'>Quantity</span>
                                                <div
                                                    className="flex items-center bg-background text-foreground rounded-lg border border-gray-200">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-muted cursor-pointer"
                                                        onClick={() => dispatch(decreaseQuantity({ productId: cartProduct?.productId, variantId: cartProduct?.variantId }))}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {cartProduct?.quantity}
                                                    </span>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-muted cursor-pointer"
                                                        onClick={() => dispatch(increaseQuantity({ productId: cartProduct?.productId, variantId: cartProduct?.variantId }))}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>

                                                </div>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                <span className='md:hidden font-medium'>Total</span>
                                                <span>{(cartProduct?.sellingPrice * cartProduct?.quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                <span className='md:hidden font-medium'>Remove</span>
                                                <button type='buttton' className='text-red-500 cursor-pointer hover:bg-gray-200 hover:text-red-600 p-1' onClick={() => dispatch(removeToCart({ productId: cartProduct?.productId, variantId: cartProduct?.variantId }))}><X /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='lg:w-[30%] w-full'>
                            <div className='rounded bg-gray-50 p-5 sticky top-5'>
                                <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
                                <div>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td className='font-medium py-2'>SubTotal:</td>
                                                <td className='text-end py-2'>{total.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Discount:</td>
                                                <td className='text-end py-2'>-{discount.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                                            </tr>
                                            <tr>
                                                <td className='font-medium py-2'>Total:</td>
                                                <td className='text-end py-2'>{total.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button type='button' asChild className={'w-full bg-black rounded-full mt-5 mb-3'}>
                                        <Link href={WEBSITE_CHECKOUT}>Process To Checkout</Link>
                                    </Button>
                                    <p className='text-center'>
                                        <Link href={WEBSITE_SHOP} className='hover:underline transition-all'>Continue Shopping</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className='py-32 h-[400px] flex justify-center items-center'>
                        <div className='text-center'>
                            <h4 className='text-4xl font-semibold mb-5'>Your cart is empty
                            </h4>
                            <Button type='button' asChild>
                                <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
                            </Button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CartPage
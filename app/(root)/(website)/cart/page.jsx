'use client'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import { Button } from '../../../../components/ui/button'
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '../../../../routes/websiteRoute'

const breadCrumb = {
    title: 'Cart',
    links: [
        {
            label: 'Cart'
        }
    ]
}
const CartPage = () => {
    const { cartItems } = useSelector(store => store?.cartStore)
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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
                                        <th className='text-start p-3'></th>
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
                                                        <p className='text-sm'>Color:{cartProduct?.color}</p>
                                                        <p className='text-sm'>Size:{cartProduct?.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                                                {cartProduct?.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                            <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2'>
                                                <div
                                                    className="flex items-center bg-background text-foreground rounded-lg border border-gray-200">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-muted"
                                                        onClick={decrementQuantity}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {quantity}
                                                    </span>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-muted"
                                                        onClick={incrementQuantity}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='lg:w-[30%] w-full'></div>
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
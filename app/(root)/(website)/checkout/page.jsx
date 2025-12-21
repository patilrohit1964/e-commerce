'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocalShipping } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoading from '../../../../components/application/ButtonLoading'
import WebsiteBreadCrumb from '../../../../components/application/website/WebsiteBreadCrumb'
import { Button } from '../../../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import { useFetch } from '../../../../hooks/useFetch'
import { zSchmea } from '../../../../lib/zodSchema'
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '../../../../routes/websiteRoute'
import { addToCart, clearCart } from '../../../../store/reducers/cartReducer'
import { showToast } from '../../../../lib/toast'
import axios from 'axios'
const breadCrumb = {
  title: 'Checkout',
  links: [
    {
      label: 'Cart'
    }
  ]
}
const Checkout = () => {
  const { cartItems } = useSelector(store => store?.cartStore)
  const dispatch = useDispatch()
  const [verifiedCartData, setVerifiedCartData] = useState([]);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0)
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)

  const { data: getverifiedCartData } = useFetch(`/api/cart-verification`, 'POST', { data: cartItems })
  // get cart verification data logic
  useEffect(() => {
    if (getverifiedCartData && getverifiedCartData?.success) {
      const cartData = getverifiedCartData?.data
      setVerifiedCartData(cartData)
      // clear all cart when fetch the cart data
      dispatch(clearCart())
      // add previous cart data after clearing cart data
      cartData.forEach(cartItem => {
        dispatch(addToCart(cartItem))
      })
    }
  }, [getverifiedCartData]);

  //subtotal or total calculation 
  useEffect(() => {
    const subTotalAmount = cartItems.reduce((sum, product) => sum + (product?.sellingPrice * product?.quantity), 0)
    const discount = cartItems.reduce((sum, product) => sum + ((product?.mrp - product?.sellingPrice) * product?.quantity), 0)
    setTotal(subTotalAmount)
    setDiscount(discount)
    setTotalAmount(subTotalAmount)
  }, [cartItems]);

  const couponFormSchema = zSchmea.pick({
    code: true,
    minShoppingAmount: true
  })
  const couponForm = useForm({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: '',
      minShoppingAmount: total
    }
  })
  const appliedCoupon = async (values) => {
    setIsCouponLoading(true)
    try {
      const { data: couponAppliedData } = await axios.post('/api/coupon/apply', values)
      if (!couponAppliedData?.success) {
        throw new Error(couponAppliedData?.message)
      }
      const discountPercentage = couponAppliedData?.data?.discountPercentage
      // get coupon amount
      setCouponDiscountAmount((total * discountPercentage) / 100)
      setTotalAmount(total - ((total * discountPercentage) / 100))
      showToast('success', couponAppliedData?.message)
    }
    catch (error) {
      showToast('error', error?.message)
      console.log(error)
    }
    finally {
      setIsCouponLoading(false)
    }
  }
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumb} />
      {
        cartItems?.length > 0 ?
          <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
            <div className='lg:w-[70%] w-full'>
              <div className='mb-3 flex items-center space-x-2 font-semibold'>
                <LocalShipping />
                <p>Shipping Address</p>
              </div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-5'>
                <div>
                  <Label htmlFor="first-name" className={'mb-1'}>First Name</Label>
                  <Input type={'text'} placeholder="First name*" id='first-name' />
                </div>
                <div>
                  <Label htmlFor="email-address" className={'mb-1'}>Email Address</Label>
                  <Input type={'email'} placeholder='Email Address' id='email-address' />
                </div>
                <div>
                  <Label htmlFor="phone-number" className={'mb-1'}>Phone Number</Label>
                  <Input type={'tel'} placeholder='Phone Number*' id='phone-number' />
                </div>
                <div>
                  <Label htmlFor="country" className={'mb-1'}>Country</Label>
                  <Input type={'text'} placeholder='Country' id='country' />
                </div>
                <div>
                  <Label htmlFor="state" className={'mb-1'}>State</Label>
                  <Input type={'text'} placeholder='State*' id='state' />
                </div>
                <div>
                  <Label htmlFor="city" className={'mb-1'}>City</Label>
                  <Input type={'text'} placeholder='City*' id='city' />
                </div>
                <div>
                  <Label htmlFor="pin-code" className={'mb-1'}>Pin Code</Label>
                  <Input type={'text'} placeholder='Pin Code*' id='pin-code' />
                </div>
                <div>
                  <Label htmlFor="landmark" className={'mb-1'}>Landmark</Label>
                  <Input type={'text'} placeholder='Landmark*' id='landmark' />
                </div>
                <div className='col-span'>
                  <Label htmlFor="order-note" className={'mb-1'}>Order Note</Label>
                  <Textarea id='order-note' placeholder='Order Note' />
                </div>
              </div>
              <Button className={'w-full bg-black hover:bg-gray-800 text-white cursor-pointer rounded-full'}>Place Order</Button>
            </div>
            <div className='lg:w-[40%] w-full'>
              <div className='rounded bg-gray-50 p-5 sticky top-5'>
                <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
                <div>
                  <table className='w-full border'>
                    <tbody>
                      {(verifiedCartData && verifiedCartData?.length > 0) ? verifiedCartData?.map(product => (
                        <tr key={product?.variantId}>
                          <td className='p-3'>
                            <div className='flex items-center gap-5'>
                              <Image src={product?.media} width={60} height={60} alt={product?.name} className='rounded' />
                              <div>
                                <h4 className='font-medium line-clamp-1'>
                                  <Link href={WEBSITE_PRODUCT_DETAILS(product?.url)}>{product?.name}</Link>
                                </h4>
                                <p>Color: {product?.color}</p>
                                <p>Size: {product?.size}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <p className='text-nowrap text-sm'>
                              {product?.quantity} x {product?.sellingPrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </p>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td className="p-3 text-center text-gray-400" colSpan={2}>No items in cart</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td className='font-medium py-2'>SubTotal:</td>
                        <td className='text-end py-2'>{total.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                      </tr>
                      <tr>
                        <td className='font-medium py-2'>Discount:</td>
                        <td className='text-end py-2'>- {discount.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                      </tr>
                      <tr>
                        <td className='font-medium py-2'>Coupon Discount:</td>
                        <td className='text-end py-2'>- {couponDiscountAmount.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                      </tr>
                      <tr>
                        <td className='font-medium py-2 text-xl'>Total:</td>
                        <td className='text-end py-2'>{totalAmount.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='mt-2 mb-5'>
                    {!isCouponApplied ?
                      <Form {...couponForm}>
                        <form className='flex items-center justify-between gap-5' onSubmit={couponForm.handleSubmit(appliedCoupon)}>
                          <div className='w-[calc(100%-100px)]'>
                            <FormField control={couponForm?.control} name={'code'} render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder='enter coupon code' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}>

                            </FormField>
                          </div>
                          <div className='w-[100px]'>
                            <ButtonLoading type='button' text={'Apply'} className={'w-full cursor-pointer'} loading={isCouponLoading} />
                          </div>
                        </form>

                      </Form>
                      :
                      ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
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

export default Checkout
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import { useFetch } from '../../../../hooks/useFetch'
import { zSchmea } from '../../../../lib/zodSchema'
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '../../../../routes/websiteRoute'
import { addToCart, clearCart } from '../../../../store/reducers/cartReducer'
import { showToast } from '../../../../lib/toast'
import axios from 'axios'
import { X } from 'lucide-react'
import z from 'zod'
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
  const { auth } = useSelector(store => store?.authStore)
  const dispatch = useDispatch()
  const [verifiedCartData, setVerifiedCartData] = useState([]);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0)
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false);

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
    couponForm?.setValue('minShoppingAmount', subTotalAmount)
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
        showToast('error', couponAppliedData?.message)
        throw new Error(couponAppliedData?.message)
      }
      const discountPercentage = couponAppliedData?.data?.discountPercentage
      // get coupon amount
      setCouponDiscountAmount((total * discountPercentage) / 100)
      setTotalAmount(total - ((total * discountPercentage) / 100))
      showToast('success', couponAppliedData?.message)
      setCouponCode(couponForm?.getValues('code'));
      setIsCouponApplied(true)
      couponForm?.resetField('code')
    }
    catch (error) {
      showToast('error', error?.response?.data?.message);
      console.log('error', error);
    }
    finally {
      setIsCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode('')
    setCouponDiscountAmount(0)
    setTotalAmount(total)
  }

  // order place
  const orderFormSchema = zSchmea?.pick({
    name: true,
    email: true,
    phone: true,
    country: true,
    state: true,
    city: true,
    pincode: true,
    landmark: true,
    ordernote: true,
  }).extend({
    userId: z.string().optional()
  })
  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      landmark: '',
      ordernote: '',
      userId: auth?._id
    }
  })
  const placeOrder = async (values) => {
    console.log('values',values);
    setOrderPlaced(true)
    try {

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setOrderPlaced(false)
    }
  }
  return (
    <div>
      <WebsiteBreadCrumb props={breadCrumb} />
      {
        cartItems?.length > 0 ?
          <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
            {/* user place order form ui */}
            <div className='lg:w-[60%] w-full'>
              <div className='mb-3 flex items-center space-x-2 font-semibold'>
                <LocalShipping />
                <p>Shipping Address</p>
              </div>
              <Form {...orderForm}>
                <form onSubmit={orderForm.handleSubmit(placeOrder)}>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mb-5'>
                    <div>
                      <FormField name='name' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='name'>Name</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='name' {...field} placeholder='Enter your name' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='email' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='email'>Email</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='email' {...field} placeholder='Enter your Email' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='phone' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='phonenumber'>Phone Number</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='phonenumber' {...field} placeholder='Enter your Phone Number' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='country' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='country'>Country</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='country' {...field} placeholder='Enter your Country' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div>
                      <FormField name='state' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='state'>State</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='state' {...field} placeholder='Enter your State' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='city' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='city'>City</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='city' {...field} placeholder='Enter your City' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='pincode' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='pincode'>Pin Code</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='pincode' {...field} placeholder='Enter your Pin Code' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <FormField name='landmark' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='landmark'>Landmark</FormLabel>
                          <FormControl>
                            <Input type={'text'} id='landmark' {...field} placeholder='Enter your landmark' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className='col-span-2'>
                      <FormField name='ordernote' control={orderForm?.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='ordernote'>Order Note</FormLabel>
                          <FormControl>
                            <Textarea type={'text'} id='ordernote' {...field} placeholder='Enter Order Note' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                  <ButtonLoading type='submit' text={'Place Order'} loading={orderPlaced} className={'w-full bg-black hover:bg-gray-800 text-white cursor-pointer rounded-full'} />
                </form>
              </Form>
            </div>

            {/* checkout and cart ui */}
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
                              <Image src={product?.media} width={60} height={60} alt={product?.name || 'cart image'} className='rounded' />
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
                                  <Input type={'text'} placeholder='enter coupon code' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}>
                            </FormField>
                          </div>
                          <div className='w-[100px]'>
                            <ButtonLoading type='submit' text={'Apply'} className={'w-full cursor-pointer'} loading={isCouponLoading} />
                          </div>
                        </form>

                      </Form>
                      :
                      <div className='flex justify-between py-1 px-5 rounded-lg bg-gray-200'>
                        <div className='space-x-1'>
                          <span className='text-xs'>Coupon:</span>
                          <span className='text-xs font-semibold'>{couponCode}</span>
                        </div>
                        <button type='button' className='text-red-500 cursor-pointer' onClick={removeCoupon}><X size={20} /></button>
                      </div>
                    }
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
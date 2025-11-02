'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BreadCrumb from '../../../../../../../components/application/admin/BreadCrumb'
import ButtonLoading from '../../../../../../../components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '../../../../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../../components/ui/form'
import { Input } from '../../../../../../../components/ui/input'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../../lib/toast'
import { zSchmea } from '../../../../../../../lib/zodSchema'
import { ADMIN_COUPON__SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '../../../../../../../routes/adminPaneRoute'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
const breadCrumbData = [
  {
    label: "Home",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Coupon",
    href: ADMIN_COUPON__SHOW,
  },
  {
    label: "Edit Coupon",
    href: "",
  },
]
const EditCoupon = ({ params }) => {
  const { id } = use(params)
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { data: getCouponData } = useFetch(`/api/coupon/get/${id}`)
  const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
    _id: true,
    code: true,
    validity: true,
    minShoppingAmount: true,
    discountPercentage: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      validity: '',
      minShoppingAmount: 0,
      discountPercentage: 0,
      _id: id
    }
  })

  useEffect(() => {
    if (getCouponData && getCouponData?.success) {
      form.reset({
        code: getCouponData?.data?.code,
        minShoppingAmount: getCouponData?.data?.minShoppingAmount,
        discountPercentage: getCouponData?.data?.discountPercentage,
        validity: dayjs(getCouponData?.data?.validity).format("YYYY-MM-DD"),
        _id: id
      })
    }
  }, [getCouponData])

  const handleCouponEdit = async (values) => {
    setLoading(true)
    try {
      const { data: couponRes } = await axios.put('/api/coupon/update', values);
      if (!couponRes.success) {
        throw new Error(couponRes.message)
      }
      setLoading(false)
      form.reset()
      router.push(ADMIN_COUPON__SHOW)
      showToast("success", couponRes.message || "coupon Successfull updated");
    }
    catch (error) {
      showToast('error', error?.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className={'py-0 rounded shadow-sm'}>
        <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
          <h4 className='text-2xl font-semibold'>Edit Coupon</h4>
        </CardHeader>
        <CardContent className={'pb-5 sm:px-6 px-2'}>
          <div>
            {/* in react */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCouponEdit)}>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                  <div>
                    <FormField control={form.control} name='code' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'code-1'}>Code <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'code-1'} placeholder="enter your code" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div>
                    <FormField control={form.control} name='discountPercentage' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'discount-1'}>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'number'} id={'discount-1'} placeholder="discount percentage" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div >
                    <FormField control={form.control} name='minShoppingAmount' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'minShoppingAmount-1'}>minShoppingAmount <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'minShoppingAmount-1'} placeholder="enter your minShoppingAmount" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div>
                    <FormField control={form.control} name='validity' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'validity-1'}>Validity <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input min={1} type={'date'} id={'validity-1'} placeholder="enter your validity" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>

                </div>
                <div className='mt-3'>
                  <ButtonLoading type={'submit'} text={'Save Changes'} loading={loading} className={'cursor-pointer w-full'} />
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCoupon
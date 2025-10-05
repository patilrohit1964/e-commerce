'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BreadCrumb from '../../../../../../../components/application/admin/BreadCrumb'
import MediaModal from '../../../../../../../components/application/admin/MediaModal'
import ButtonLoading from '../../../../../../../components/application/ButtonLoading'
import Select from '../../../../../../../components/application/Select'
import { Card, CardContent, CardHeader } from '../../../../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../../components/ui/form'
import { Input } from '../../../../../../../components/ui/input'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../../lib/toast'
import { sizes } from '../../../../../../../lib/utils'
import { zSchmea } from '../../../../../../../lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIANT__EDIT, ADMIN_PRODUCT_VARIANT__SHOW } from '../../../../../../../routes/adminPaneRoute'
const breadCrumbData = [
  {
    label: "Home",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Products",
    href: ADMIN_PRODUCT_VARIANT__SHOW,
  },
  {
    label: "Edit Product Variant",
    href: ADMIN_PRODUCT_VARIANT__EDIT,
  },
]
const EditProductVariant = ({ params }) => {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [productOption, setProductOptions] = useState([])
  const { data: getProductVariant } = useFetch(`/api/product-variant/get/${id}`)
  const { data: getProduct } = useFetch('/api/product?deleteType=SD&&size=10000')
  // media modal states
  const [open, setOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState([])
  useEffect(() => {
    if (getProduct && getProduct?.success) {
      const data = getProduct?.data
      const options = data?.map(prod => ({ label: prod?.name, value: prod?._id }))
      setProductOptions(options)
    }
  }, [getProduct]);

  useEffect(() => {
    if (getProductVariant && getProductVariant?.success) {
      const data = getProductVariant?.data
      form.reset({
        name: data?.productId,
        color: data?.color,
        size: data?.size,
        sku: data?.sku,
        discountPercentage: data?.discountPercentage,
        sellingPrice: data?.sellingPrice,
        mrp: data?.mrp,
        _id: id
      })
      if (data?.medias) {
        const media = data?.medias?.map(md => ({ _id: md?._id, url: md?.secure_url }))
        setSelectedMedia(media)
      }
    }
  }, [getProductVariant]);

  const formSchema = zSchmea.pick({ //we can get that method from zodSchema and use here as schema
    productId: true,
    sku: true,
    size: true,
    color: true,
    discountPercentage: true,
    sellingPrice: true,
    mrp: true,
    _id: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      sku: '',
      size: '',
      color: '',
      discountPercentage: 0,
      sellingPrice: 0,
      mrp: 0,
      _id: id
    }
  })



  const handleProductVariantEdit = async (values) => {
    setLoading(true)
    try {
      if (selectedMedia?.length <= 0) {
        return showToast("error", 'please select media')
      }
      const mediasIds = selectedMedia?.map(media => media?._id);
      values.medias = mediasIds
      const { data: productVarinatRes } = await axios.put('/api/product-variant/update', values);
      if (!productVarinatRes.success) {
        throw new Error(productVarinatRes.message)
      }
      setLoading(false)
      form.reset()
      setSelectedMedia([])
      router.push(ADMIN_PRODUCT_SHOW)
      showToast("success", productVarinatRes.message || "product added Successfull")
    }
    catch (error) {
      console.log(error)
      showToast('error', error?.message)
    } finally {
      setLoading(false)
    }
  }

  // calculate discount percentage
  useEffect(() => {
    const mrp = form.getValues('mrp') || 0
    const sellingPrice = form.getValues('sellingPrice') || 0
    if (mrp > 0 && sellingPrice > 0) {
      const discountPrice = ((mrp - sellingPrice) / mrp) * 100
      form.setValue('discountPercentage', Math.round(discountPrice))
    }
  }, [form.watch('mrp'), form.watch('sellingPrice')]);
  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className={'py-0 rounded shadow-sm'}>
        <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
          <h4 className='text-2xl font-semibold'>Edit Product</h4>
        </CardHeader>
        <CardContent className={'pb-5'}>
          <div>
            {/* in react */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleProductVariantEdit)}>
                <div className='grid md:grid-cols-2 gap-5'>
                  <div>
                    <FormField control={form.control} name='productId' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='productId'>Product Name <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Select
                            options={productOption}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMulti={false}
                            id='productId'
                            placeholder='Select product'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div >
                    <FormField control={form.control} name='sku' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'sku-1'}>Product Sku <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'sku-1'} placeholder="enter your category sku" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div >
                    <FormField control={form.control} name='color' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'color-1'}>Proudct Color <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'color-1'} placeholder="enter your category color" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div >
                    <FormField control={form.control} name='size' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'size-1'}>Proudct Size <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Select
                            options={sizes}
                            selected={field?.value}
                            setSelected={field?.onChange}
                            isMulti={false} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div>
                    <FormField control={form.control} name='mrp' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'mrp-1'}>Product Mrp <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input min={1} type={'number'} id={'mrp-1'} placeholder="enter your category mrp" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div>
                    <FormField control={form.control} name='sellingPrice' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'selling-1'}>Product Selling Price <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'number'} min={1} id={'selling-1'} placeholder="enter your selling price" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div>
                    <FormField control={form.control} name='discountPercentage' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'discount-1'}>Product Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'number'} readOnly id={'discount-1'} placeholder="discount percentage" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                </div>
                <div className='md:col-span-2 border border-dashed rounded p-5 text-center mt-3'>
                  <MediaModal open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMulitple={true} />
                  {selectedMedia?.length > 0 &&
                    <div className='grid lg:grid-cols-10 grid-cols-4 gap-3 mb-3'>
                      {selectedMedia?.map(m => (
                        <div key={m?._id} className='h-24 w-24 border'>
                          <Image src={m?.url} height={100} width={100} alt='' className='size-full object-cover' />
                        </div>
                      ))}
                    </div>
                  }
                  <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                    <span className='font-semibold'>Select Proudct Media</span>
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

export default EditProductVariant
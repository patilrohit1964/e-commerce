'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import BreadCrumb from '../../../../../../../components/application/admin/BreadCrumb'
import Editor from '../../../../../../../components/application/admin/Editor'
import MediaModal from '../../../../../../../components/application/admin/MediaModal'
import ButtonLoading from '../../../../../../../components/application/ButtonLoading'
import Select from '../../../../../../../components/application/Select'
import { Card, CardContent, CardHeader } from '../../../../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../../components/ui/form'
import { Input } from '../../../../../../../components/ui/input'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../../lib/toast'
import { zSchmea } from '../../../../../../../lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '../../../../../../../routes/adminPaneRoute'

const breadCrumbData = [
  {
    label: "Home",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Products",
    href: ADMIN_PRODUCT_SHOW,
  },
  {
    label: "Edit Product",
    href: "",
  },
]
const EditProduct = ({ params }) => {
  const { id } = use(params)
  const [loading, setLoading] = useState(false)
  const [categoryOption, setCategoryOption] = useState([])
  const { data: getProduct, loading: getProductLoading } = useFetch(`/api/product/get/${id}`)
  const { data: getCategory } = useFetch(`/api/category?deleteType=SD`)
  // media modal states
  const [open, setOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState([])
  useEffect(() => {
    if (getCategory && getCategory?.success) {
      const data = getCategory?.data
      const options = data?.map(cat => ({ label: cat?.name, value: cat?._id }))
      setCategoryOption(options)
    }
  }, [getCategory]);
  useEffect(() => {
    if (getProduct && getProduct?.success) {
      const data = getProduct?.data
      form.reset({
        name: data?.name,
        slug: data?.slug,
        discountPercentage: data?.discountPercentage,
        sellingPrice: data?.sellingPrice,
        mrp: data?.mrp,
        discription: data?.discription,
        category: data?.category,
      })
      if (data?.medias) {
        const media = data?.medias?.map(md => ({ _id: md?._id, url: md?.secure_url }))
        setSelectedMedia(media)
      }
    }
  }, [getProduct]);

  const formSchema = zSchmea.pick({ //we can get that method from zodSchema and use here as schema
    name: true,
    slug: true,
    mrp: true,
    category: true,
    sellingPrice: true,
    discription: true,
    discountPercentage: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      mrp: 0,
      category: '',
      sellingPrice: 0,
      discription: '',
      discountPercentage: 0
    }
  })

  const editor = (e, editor) => {
    const data = editor?.getData()
    form.setValue('discription', data)
  };

  const handleProductEdit = async (values) => {
    setLoading(true)

    try {
      if (selectedMedia?.length <= 0) {
        return showToast("error", 'please select media')
      }
      const mediasIds = selectedMedia?.map(media => media?._id);
      values.medias = mediasIds
      const { data: productRes } = await axios.post('/api/product/update', values);
      if (!productRes.success) {
        throw new Error(productRes.message)
      }
      setLoading(false)
      form.reset()
      selectedMedia([])
      showToast("success", productRes.message || "category added Successfull")
    }
    catch (error) {
      console.log(error)
      showToast('error', error?.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const name = form.getValues('name')
    if (name) {
      form.setValue('slug', slugify(name).toLowerCase())
    }
  }, [form.watch('name')]); //using this watch method we can do anything when input change,slug is very imp when we develop e-comm or other big project

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
              <form onSubmit={form.handleSubmit(handleProductEdit)}>
                <div className='grid md:grid-cols-2 gap-5'>
                  <div>
                    <FormField control={form.control} name='name' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'name-1'}>Name <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'name-1'} placeholder="enter your category name" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div >
                    <FormField control={form.control} name='slug' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'slug-1'}>Slug <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'text'} id={'slug-1'} placeholder="enter your category slug" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div >
                    <FormField control={form.control} name='category' render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={'category-1'}>Category <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Select
                            options={categoryOption}
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
                        <FormLabel htmlFor={'mrp-1'}>Mrp <span className='text-red-500'>*</span></FormLabel>
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
                        <FormLabel htmlFor={'selling-1'}>Selling Price <span className='text-red-500'>*</span></FormLabel>
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
                        <FormLabel htmlFor={'discount-1'}>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Input type={'number'} readOnly id={'discount-1'} placeholder="discount percentage" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                  <div className='md:col-span-2'>
                    <FormLabel className={'mb-2'}>Description</FormLabel>
                    {!getProductLoading ?
                      <Editor onChange={editor} initialData={form.getValues('discription')} /> :
                      <h1>Editor Data Loading...</h1>
                    }
                    <FormMessage />
                  </div>
                </div>
                <div className='md:col-span-2 border border-dashed rounded p-5 text-center'>
                  <MediaModal open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMulitple={true} />
                  {selectedMedia?.length > 0 &&
                    <div className='grid lg:grid-cols-10 grid-cols-4 gap-3 mb-3 flex-wrap'>
                      {selectedMedia?.map(m => (
                        <div key={m?._id} className='h-24 w-24 border'>
                          <Image src={m?.url} height={100} width={100} alt='' className='size-full object-cover' />
                        </div>
                      ))}
                    </div>
                  }
                  <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                    <span className='font-semibold'>Select Media</span>
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

export default EditProduct
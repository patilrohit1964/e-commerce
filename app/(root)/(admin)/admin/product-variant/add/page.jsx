'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BreadCrumb from '../../../../../../components/application/admin/BreadCrumb'
import MediaModal from '../../../../../../components/application/admin/MediaModal'
import ButtonLoading from '../../../../../../components/application/ButtonLoading'
import Select from '../../../../../../components/application/Select'
import { Card, CardContent, CardHeader } from '../../../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { useFetch } from '../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../lib/toast'
import { sizes } from '../../../../../../lib/utils'
import { zSchmea } from '../../../../../../lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT__SHOW } from '../../../../../../routes/adminPaneRoute'

const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Product Variant",
        href: ADMIN_PRODUCT_VARIANT__SHOW,
    },
    {
        label: "Add Product Variant",
        href: "",
    },
]
const AddProductVariant = () => {
    const [loading, setLoading] = useState(false)
    const [productOption, setProductOption] = useState([])
    const { data: getProduct } = useFetch('/api/product?deleteType=SD&&size=10000')
    // media modal states
    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])
    useEffect(() => {
        if (getProduct && getProduct?.success) {
            const data = getProduct?.data
            const options = data?.map(prod => ({ label: prod?.name, value: prod?._id }))
            setProductOption(options);
        }
    }, [getProduct]);

    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        product: true,
        sku: true,
        size: true,
        color: true,
        mrp: true,
        sellingPrice: true,
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


    const handleProductAdd = async (values) => {
        setLoading(true)

        try {
            if (selectedMedia?.length <= 0) {
                return showToast("error", 'please select media')
            }
            const mediasIds = selectedMedia?.map(media => media?._id);
            values.medias = mediasIds
            const { data: productRes } = await axios.post('/api/product-variant/create', values);
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
                    <h4 className='text-2xl font-semibold'>Add Product Variant</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        {/* in react */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleProductAdd)}>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    <div>
                                        <FormField control={form.control} name='product' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'product-1'}>Product <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select
                                                        options={productOption}
                                                        selected={field?.value}
                                                        setSelected={field?.onChange}
                                                        isMulti={false} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div >
                                        <FormField control={form.control} name='sku' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'sku-1'}>SKU (stock keeping unit) <span className='text-red-500'>*</span></FormLabel>
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
                                                <FormLabel htmlFor={'color-1'}>Color <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input min={1} type={'text'} id={'color-1'} placeholder="enter your category color" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField control={form.control} name='size' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'size-1'}>Size <span className='text-red-500'>*</span></FormLabel>
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
                                        <FormField control={form.control} name='stock' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'stock-1'}>Stock <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type={'number'} min={1} id={'stock-1'} placeholder="enter your stock" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField control={form.control} name='originalPrice' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'originalPrice-1'}>Original Price <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type={'number'} readOnly id={'originalPrice-1'} placeholder="originalPrice" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField control={form.control} name='discountPrice' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'discountPrice-1'}>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type={'number'} readOnly id={'discountPrice-1'} placeholder="discountPrice" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    {/* <div className='md:col-span-2'>
                                        <Editor onChange={editor} />
                                        <FormMessage />
                                    </div> */}
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
                                    <ButtonLoading type={'submit'} text={'Add Product'} loading={loading} className={'cursor-pointer w-full'} />
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddProductVariant
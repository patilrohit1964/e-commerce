'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import BreadCrumb from '../../../../../../components/application/admin/BreadCrumb'
import ButtonLoading from '../../../../../../components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '../../../../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { showToast } from '../../../../../../lib/toast'
import { zSchmea } from '../../../../../../lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '../../../../../../routes/adminPaneRoute'
import { useFetch } from '../../../../../../hooks/useFetch'
import Select from '../../../../../../components/application/Select'
import Editor from '../../../../../../components/application/admin/Editor'
import MediaModal from '../../../../../../components/application/admin/MediaModal'

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
        label: "Add Product",
        href: "",
    },
]
const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const [categoryOption, setCategoryOption] = useState([])
    const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=10000')
    // media modal states
    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([false])
    useEffect(() => {
        if (getCategory && getCategory?.success) {
            const data = getCategory?.data
            const options = data?.map(cat => ({ label: cat?.name, value: cat?._id }))
            setCategoryOption(options);
        }
    }, [getCategory]);

    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
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
            mrp: '',
            category: '',
            sellingPrice: '',
            discription: '',
            discountPercentage: ''
        }
    })

    const editor = (e, editor) => {
        const data = editor?.getData()
        form.setValue('discription', data)
    };

    const handleProductAdd = async (values) => {
        alert('j')
        console.log('values', values);
        // try {
        //     setLoading(true)
        //     const { data: productRes } = await axios.post('/api/product/create', values);
        //     if (!productRes.success) {
        //         throw new Error(productRes.message)
        //     }
        //     setLoading(false)
        //     form.reset()
        //     showToast("success", productRes.message || "category added Successfull")
        // }
        // catch (error) {
        //     console.log(error)
        //     showToast('error', error?.message)
        // } finally {
        //     setLoading(false)
        // }
    }
    useEffect(() => {
        const name = form.getValues('name')
        if (name) {
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')]); //using this watch method we can do anything when input change,slug is very imp when we develop e-comm or other big project
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <h4 className='text-2xl font-semibold'>Add Product</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleProductAdd)}>
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
                                                    <Input type={'text'} id={'mrp-1'} placeholder="enter your category mrp" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField control={form.control} name='selling-price' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'selling-price-1'}>Selling Price <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type={'text'} id={'selling-price-1'} placeholder="enter your selling price" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField control={form.control} name='discount' render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'discount-1'}>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type={'text'} id={'discount-1'} placeholder="enter your discount percentage" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                        </FormField>
                                    </div>
                                    <div className='md:col-span-2'>
                                        <Editor onChange={editor} />
                                        <FormMessage />
                                    </div>
                                </div>
                                <div className='md:col-span-2 border border-dashed rounded p-5 text-center'>
                                    <MediaModal open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMulitple={true} />
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

export default AddProduct
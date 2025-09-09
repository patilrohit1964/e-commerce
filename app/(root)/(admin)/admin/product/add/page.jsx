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
    const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=10000')
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
                            <form onSubmit={form.handleSubmit(handleProductAdd)} className='grid md:grid-cols-2 gap-5'>
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
                                <div>
                                    <ButtonLoading type={'submit'} text={'Add Product'} loading={loading} className={'cursor-pointer'} />
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
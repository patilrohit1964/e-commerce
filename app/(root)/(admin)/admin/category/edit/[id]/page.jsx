'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetch } from '@/hooks/useFetch'
import { showToast } from '@/lib/toast'
import { zSchmea } from '@/lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/adminPaneRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Category",
        href: ADMIN_CATEGORY_SHOW,
    },
    {
        label: "Edit Category",
        href: "",
    },
]
const EditCategory = ({ params }) => {
    const { id } = use(params)
    const { data: categoryData } = useFetch(`/api/category/get/${id}`)
    const [loading, setLoading] = useState(false)

    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        _id: true,
        name: true,
        slug: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            name: '',
            slug: '',
        }
    })

    useEffect(() => {
        if (categoryData && categoryData?.success) {
            form.reset({
                name: categoryData?.data?.name,
                slug: categoryData?.data?.slug,
            })
        }
    }, [categoryData])
    const handleCategoryUpdate = async (values) => {
        try {
            setLoading(true)
            const { data: categoryUpdateRes } = await axios.put('/api/category/update', values);
            if (!categoryUpdateRes.success) {
                throw new Error(categoryUpdateRes.message)
            }
            setLoading(false)
            form.reset()
            showToast("success", categoryUpdateRes.message || "category added Successfull")
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
    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <h4 className='text-2xl font-semibold'>Edit Category</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleCategoryUpdate)}>
                                <div>
                                    <FormField control={form.control} name='name' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'name-1'}>Name</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'name-1'} placeholder="enter your category name" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className='my-5'>
                                    <FormField control={form.control} name='slug' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'slug-1'}>Slug</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'slug-1'} placeholder="enter your category slug" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div>
                                    <ButtonLoading type={'submit'} text={'Update Category'} loading={loading} className={'cursor-pointer'} />
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCategory
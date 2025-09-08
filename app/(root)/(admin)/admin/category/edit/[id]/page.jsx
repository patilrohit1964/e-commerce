'use client'

import BreadCrumb from '../../../../../../../components/application/admin/BreadCrumb'
import ButtonLoading from '../../../../../../../components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '../../../../../../../components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../../../../components/ui/form'
import { Input } from '../../../../../../../components/ui/input'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { showToast } from '../../../../../../../lib/toast'
import { zSchmea } from '../../../../../../../lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '../../../../../../../routes/adminPaneRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

const breadCrumbData = [
    { label: 'Home', href: ADMIN_DASHBOARD },
    { label: 'Category', href: ADMIN_CATEGORY_SHOW },
    { label: 'Edit Category', href: '' },
]

const EditCategory = ({ params }) => {
    const { id } = params
    const { data: categoryData } = useFetch(`/api/category/get/${id}`)
    const [loading, setLoading] = useState(false)

    const formSchema = zSchmea.pick({
        _id: true,
        name: true,
        slug: true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: id,
            name: '',
            slug: '',
        },
    })

    // ✅ Load category data into form
    useEffect(() => {
        if (categoryData?.success) {
            form.reset({
                _id: id,
                name: categoryData.data?.name || '',
                slug: categoryData.data?.slug || '',
            })
        }
    }, [categoryData, form, id])

    // ✅ Update category
    const handleCategoryUpdate = async (values) => {
        try {
            setLoading(true)
            const { data: res } = await axios.put('/api/category/update', values)
            if (!res.success) throw new Error(res.message)

            showToast('success', res.message || 'Category updated successfully')
            form.reset(values) // keep updated values in form
        } catch (error) {
            console.error(error)
            showToast('error', error?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    // ✅ Auto-generate slug from name
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'name' && value.name) {
                form.setValue('slug', slugify(value.name, { lower: true }))
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                    <h4 className="text-2xl font-semibold">Edit Category</h4>
                </CardHeader>
                <CardContent className="pb-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCategoryUpdate)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name-1">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name-1"
                                                type="text"
                                                placeholder="Enter category name"
                                                {...field}
                                                className="border border-gray-700 focus:border-none transition-all delay-150"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="my-5">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="slug-1">Slug</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="slug-1"
                                                    type="text"
                                                    placeholder="Enter category slug"
                                                    {...field}
                                                    className="border border-gray-700 focus:border-none transition-all delay-150"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <ButtonLoading
                                type="submit"
                                text="Update Category"
                                loading={loading}
                                className="cursor-pointer"
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCategory

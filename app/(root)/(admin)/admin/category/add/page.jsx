'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchmea } from '@/lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/adminPaneRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
const AddCategory = () => {
    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        name: true,
        slug: true
    })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        }
    })


    const handleCategoryAdd = async (values) => {
        console.log('values',values);
        // try {
        //     setLoading(true)
        //     const { data: editMediaResponce } = await axios.put('/api/media/update', values);
        //     if (!editMediaResponce.success) {
        //         throw new Error(editMediaResponce.message)
        //     }
        //     setLoading(false)
        //     showToast("success", editMediaResponce.message || "logged in Successfull")
        // }
        // catch (error) {
        //     console.log(error)
        //     showToast('error', error?.message)
        // } finally {
        //     setLoading(false)
        // }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadCrumbData} />
            <Card className={'py-0 rounded shadow-sm'}>
                <CardHeader className={'pt-3 px-3 border-b [.border-b]:pb-2'}>
                    <h4 className='text-2xl font-semibold'>Add Category</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleCategoryAdd)}>
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
                                    <ButtonLoading type={'submit'} text={'Add Category'} className={'cursor-pointer'} />
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCategory
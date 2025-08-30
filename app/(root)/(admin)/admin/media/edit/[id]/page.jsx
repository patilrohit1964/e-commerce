'use client'
import BreadCrumb from '@/components/application/admin/BreadCrumb'
import ButtonLoading from '@/components/application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetch } from '@/hooks/useFetch'
import { showToast } from '@/lib/toast'
import { zSchmea } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import imgPlaceholder from '../../../../../../../public/download.png'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/adminPaneRoute'
const breadCrumbData = [
    {
        label: "Home",
        href: ADMIN_DASHBOARD,
    },
    {
        label: "Media",
        href: ADMIN_MEDIA_SHOW,
    },
    {
        label: "Edit Media",
        href: "",
    },
]
const EditMedia = ({ params }) => {
    const { id } = use(params)
    const { data: mediaData } = useFetch(`/api/media/get/${id}`)
    const [loading, setLoading] = useState()
    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        _id: true,
        title: true,
        alt: true,
    })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            alt: "",
            title: ""
        }
    })

    useEffect(() => {
        if (mediaData && mediaData?.success) {
            const data = mediaData?.data
            form.reset({
                _id: data?._id,
                alt: data?.alt,
                title: data?.title
            })
        }
    }, mediaData)
    const handleMediaEdit = async (values) => {
        try {
            setLoading(true)
            const { data: editMediaResponce } = await axios.put('/api/media/update', values);
            if (!editMediaResponce.success) {
                throw new Error(editMediaResponce.message)
            }
            setLoading(false)
            showToast("success", editMediaResponce.message || "logged in Successfull")
        }
        catch (error) {
            console.log(error)
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
                    <h4 className='text-2xl font-semibold'>Edit Media</h4>
                </CardHeader>
                <CardContent className={'pb-5'}>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleMediaEdit)}>
                                <div className='mb-5'>
                                    <Image src={mediaData?.data?.secure_url || imgPlaceholder} width={150} height={150} alt={mediaData?.alt || 'image'} />
                                </div>
                                <div>
                                    <FormField control={form.control} name='alt' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'alt-1'}>Alt</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'alt-1'} placeholder="enter your alt" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className='my-5'>
                                    <FormField control={form.control} name='title' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'title-1'}>Title</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id={'title-1'} placeholder="enter your Title" {...field} className={'border border-gray-700 focus:border-none transition-all delay-150'} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div>
                                    <ButtonLoading type={'submit'} text={'Update Media'} loading={loading} className={'cursor-pointer'} />
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditMedia
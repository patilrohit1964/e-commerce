'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Rating } from '@mui/material'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ButtonLoading from '../../../components/application/ButtonLoading'
import { Button } from '../../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Progress } from '../../../components/ui/progress'
import { Textarea } from '../../../components/ui/textarea'
import { zSchmea } from '../../../lib/zodSchema'
import Link from 'next/link'
import { WEBSITE_LOGIN } from '../../../routes/websiteRoute'

const ProductReview = ({ productId }) => {
    const [loading, setLoading] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const { auth } = useSelector(state => state?.authStore)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }
    }, []);
    const formSchema = zSchmea.pick({ //we can get that method from zoSchema and use here as schema
        productId: true,
        userId: true,
        rating: true,
        title: true,
        review: true,
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: productId,
            userId: auth?._id,
            rating: 0,
            title: '',
            review: '',
        }
    })
    const handleAddReview = (values) => {
        console.log('values', values);
    }
    return (
        <div className="shadow rounded border">
            <div className="p-3 bg-gray-50">
                <h2 className="font-semibold text-2xl">Review & Ratings</h2>
            </div>
            <div className="p-5">
                <div className='flex justify-between flex-wrap items-center'>
                    <div className='md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5'>
                        <div className='md:w-[200px] w-full md:mb-0 mb-5'>
                            <h4 className='text-center text-8xl font-semibold'>0.0</h4>
                            <div className='flex justify-center gap-2'>
                                <Star size={20} />
                                <Star size={20} />
                                <Star size={20} />
                                <Star size={20} />
                                <Star size={20} />
                            </div>
                            <p className='text-center mt-3'>{0} Rating & Reviews</p>
                        </div>
                        <div className='md:w-[calc(100%-200px)] flex items-center'>
                            <div className='w-full'>
                                {
                                    [5, 4, 3, 2, 1].map((reviewNum) => (
                                        <div className="flex items-center gap-2 mb-2" key={reviewNum}>
                                            <div className='flex items-center gap-1'>
                                                <p className='w-3'>{reviewNum}</p>
                                                <Star size={15} />
                                            </div>
                                            <Progress value={80} />
                                            <span className='text-sm'>20</span>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <div className="md:w-1/2 w-full md:text-end text-center">
                        <Button type='button' variant={'outline'} className={'md:w-fit w-full py-6 px-10'}>Write Review</Button>
                    </div>
                </div>
                <div className='my-5'>
                    <h4 className='text-xl font-semibold mb-3'>Write A Review</h4>
                    {/* show if user not login then they can't review */}
                    {!auth ?
                        <>
                            <p className='mb-2'>Login to submit review</p>
                            <Button type='button' asChild>
                                <Link href={`${WEBSITE_LOGIN}?callback=${currentUrl}`}>Login</Link>
                            </Button>
                        </>
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddReview)}>
                                <div>
                                    <FormField control={form.control} name='rating' render={({ field }) => (
                                        <FormItem>
                                            {/* <FormLabel htmlFor={'rating-1'}>Rating</FormLabel> */}
                                            <FormControl>
                                                <Rating
                                                    size='large'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className='my-5'>
                                    <FormField control={form.control} name='title' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'title1'}>Title</FormLabel>
                                            <FormControl>
                                                <Input type={'text'} id='title1' placeholder='Review title' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className='my-5'>
                                    <FormField control={form.control} name='review' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={'review1'}>Review</FormLabel>
                                            <FormControl>
                                                <Textarea id='review1' placeholder="Write your comment here..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div>
                                    <ButtonLoading type={'submit'} text={'Add Review'} loading={loading} disabled={loading} className={'cursor-pointer'} />
                                </div>
                            </form>
                        </Form>
                    }
                </div>

            </div>
        </div >
    )
}

export default ProductReview
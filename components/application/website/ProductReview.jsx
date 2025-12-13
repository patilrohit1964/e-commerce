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
import { showToast } from '../../../lib/toast'
import axios from 'axios'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import ReviewList from './ReviewList'
import { useFetch } from '../../../hooks/useFetch'

const ProductReview = ({ productId }) => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [writeReview, setWriteReview] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('')
    const { auth } = useSelector(state => state?.authStore)
    const { data: reviewDetails } = useFetch(`/api/review/details?productId=${productId}`)
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
    const handleAddReview = async (values) => {
        try {
            setLoading(true)
            const { data: reviewAddRes } = await axios.post('/api/review/create', values);
            if (!reviewAddRes.success) {
                throw new Error(reviewAddRes.message)
            }
            setLoading(false)
            form.reset()
            showToast("success", reviewAddRes.message || "review added Successfull")
            queryClient.invalidateQueries(['product-review'])
        }
        catch (error) {
            console.log(error)
            showToast('error', error?.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchReview = async (pageParam) => {
        const { data: getReviewsData } = await axios.get(`/api/review/get?productId=${productId}&page=${pageParam}`)
        if (!getReviewsData?.success) {
            return;
        }
        return getReviewsData?.data
    }

    const { error, data, isFetching, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['product-review'], //query key should be unique always in our whole app
        queryFn: async ({ pageParam }) => await fetchReview(pageParam), //this function call our api and give page if exists more data
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage
        }
    })
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
                            <p className='text-center mt-3'>{data?.length} Rating & Reviews</p>
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
                        <Button onClick={() => setWriteReview(!writeReview)} type='button' variant={'outline'} className={'md:w-fit cursor-pointer w-full py-6 px-10'}>Write Review</Button>
                    </div>
                </div>
                {writeReview &&
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
                }
                <div className='mt-10 border-t pt-5'>
                    <h5 className='text-xl font-semibold'>{data?.pages[0]?.totalReview || 0} Reviews</h5>
                    <div className='mt-10'>
                        {data && data?.pages?.map((page) => (
                            page?.reviews?.map(review => (
                                <div className='mb-5' key={review?._id}><ReviewList review={review} /></div>
                            ))
                        ))}
                    </div>


                </div>
            </div>
        </div >
    )
}

export default ProductReview
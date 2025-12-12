import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)
const ReviewList = ({ review }) => {
    console.log('review',review);
    return (
        <div className='flex gap-5'>
            <div className='w-[60px]'>
                <Image src={review?.avatar?.url} width={55} height={55} alt='review image' className='rounded-lg' />
            </div>
            <div className='w-[calc(100%-60px)]'>
                <div>
                    <h4 className='text-xl font-semibold'>{review?.title}</h4>
                    <p className='space-x-2 my-3'>
                        <span className='font-semibold'>{review?.reviewdBy}</span>
                        <span className='text-gray-500'>{dayjs(review?.createdAt).fromNow()}</span>
                    </p>
                    <p className=' text-gray-600'>{review?.review}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewList
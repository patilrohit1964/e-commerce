import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'

const ReviewList = ({ review }) => {
    return (
        <div className='flex gap-5'>
            <div className='w-[60px]'>
                <Image src={review?.avatar?.secure_url} width={55} height={55} alt='review image' className='rounded-lg' />
            </div>
            <div className='w-[calc(100%-60px)]'>
                <div>
                    <h4 className='text-xl font-semibold'>{review?.title}</h4>
                    <p>
                        <span className='font-semibold'>{review?.reviewdBy}</span>
                        <span className='text-gray-500'>{dayjs(review?.createdAt).fromNow()}</span>
                    </p>
                    <p className='mt-3 text-gray-600'>{review?.review}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewList
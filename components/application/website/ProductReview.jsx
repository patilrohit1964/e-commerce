import { Star } from 'lucide-react'
import { Card, CardHeader } from '../../../components/ui/card'
import React from 'react'

const ProductReview = ({ product }) => {
    return (
        <div className="shadow rounded border">
            <div className="p-3 bg-gray-50">
                <h2 className="font-semibold text-2xl">Review & Ratings</h2>
            </div>
            <div className="p-3">
                <div className='flex justify-between flex-wrap items-center'>
                    <div className='md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5'>
                        <div className='md:w-[200px] w-full md:mb-0 mb-5'>
                            <h4 className='text-center text-8xl font-semibold'>0.0</h4>
                            <div className='flex justify-center gap-2'>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <p className='text-center mt-3'>{0} Rating & Reviews</p>
                        </div>
                        <div className='md:-w[calc(100%-200px)] flex items-center'>
                            <div>
                                <
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReview
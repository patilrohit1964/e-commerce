'use client'
import { Star } from 'lucide-react'
import React from 'react'

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            },
        ]
    }
    return (
        <Slider {...settings}>
            {
                // generate random 10 testimonial data 
                [].map((item, index) => (
                    <div key={index}>
                        <p>{item?.review}</p>
                        <p>{item?.name}</p>
                        <div className='flex'>
                            {Array.from({ length: item?.rating }).map((star, idx) => (
                                <Star key={`star${idx}`} className='text-yellow-400' size={20} />
                            ))}
                        </div>
                    </div>
                ))
            }
        </Slider>
    )
}

export default Testimonial
'use client'
import { TextShimmer } from '../../../components/ui/text-shimmer'
import { MessageSquareText, Star } from 'lucide-react'
import Slider from 'react-slick'
const testimonial = [
    {
        "name": "Aarav Mehta",
        "rating": 5,
        "review": "The service was excellent from start to finish. The staff was polite, well-trained, and very punctual. I’ll definitely recommend them to my friends and family!"
    },
    {
        "name": "Priya Sharma",
        "rating": 4,
        "review": "I was impressed by how quickly they responded to my request. The cleaning team did a wonderful job and paid attention to every corner. Just a little improvement in timing would make it perfect!"
    },
    {
        "name": "Rohit Deshmukh",
        "rating": 5,
        "review": "Absolutely loved the experience! The app is smooth, the UI is simple, and the results were better than I expected. Keep up the great work!"
    },
    {
        "name": "Sneha Kapoor",
        "rating": 4,
        "review": "I booked my first appointment online and everything went perfectly. The team was friendly, quick, and professional. Only wish they offered a few more payment options."
    },
    {
        "name": "Vivek Patil",
        "rating": 5,
        "review": "This is the best service I’ve used in months. The staff was courteous and ensured everything was spotless. I’ll be booking again next week for sure!"
    },
    {
        "name": "Anjali Nair",
        "rating": 5,
        "review": "Excellent quality and attention to detail. The booking process was easy and transparent. I’m extremely satisfied with the results and will continue using this service."
    },
    {
        "name": "Harshit Verma",
        "rating": 3,
        "review": "The service was decent overall but there’s room for improvement. The cleaning was good, though not as deep as I had expected. Still, they were professional and polite."
    },
    {
        "name": "Megha Joshi",
        "rating": 5,
        "review": "Everything from booking to completion was seamless. The crew was experienced, quick, and very friendly. My home feels fresh and perfectly clean now!"
    },
    {
        "name": "Karan Sethi",
        "rating": 4,
        "review": "A smooth, efficient, and user-friendly experience. The quality of the work was really good and the staff was cooperative. Highly recommend giving them a try!"
    },
    {
        "name": "Neha Reddy",
        "rating": 5,
        "review": "Incredible experience overall. The team arrived right on time and worked with great care. I loved how professional they were and how easy it was to book online!"
    }
]

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
        <div className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
            <TextShimmer as='h2' duration={2} className='text-center sm:text-4xl text-2xl mb-5 font-semibold'>
                Customer Reviews
            </TextShimmer>
            <Slider {...settings}>
                {
                    // generate random 10 testimonial data 
                    testimonial.map((item, index) => (
                        <div key={index} className='p-5'>
                            <div className='border rounded-lg p-5'>
                                <MessageSquareText className='mb-2' />
                                <p className='mb-5'>{item?.review}</p>
                                <p className='font-semibold'>{item?.name}</p>
                                <div className='flex mt-5'>
                                    {Array.from({ length: item?.rating }).map((star, idx) => (
                                        <Star key={`star${idx}`} className='text-yellow-400 fill-yellow-400' size={20} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Testimonial
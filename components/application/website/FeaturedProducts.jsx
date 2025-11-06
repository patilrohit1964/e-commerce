import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FeaturedProducts = async () => {
    // const { data: productData } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get-featured-product`)
    // console.log('productData', productData);
// check url
    return (
        <section className='lg:px-32 px-4 sm:py-10'>
            <div className='flex justify-between items-center'>
                <h2 className='sm:text-4xl text-2xl'>Featured Products</h2>
                <Link href={''} className='flex items-center gap-2 underline underline-offset-4 hover:text-primary transition-all duration-200'>
                    View all <ArrowRight />
                </Link>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2'>

            </div>
        </section>
    )
}

export default FeaturedProducts
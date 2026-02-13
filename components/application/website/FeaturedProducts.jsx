'use client';

import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductBox from './ProductBox';
import { useEffect, useState } from 'react';

const FeaturedProducts = () => {
    const [productData, setProductData] = useState([]);
    // let productData = null
    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`);
                setProductData(data?.data);
                // console.log('data', data);
            } catch (error) {
                console.error('Featured product error:', error);
            }
        }
        fetchProduct()
    }, [])
    if (!productData) return null
    return (
        <section className='lg:px-32 px-4 sm:py-10'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='sm:text-4xl text-2xl font-semibold'>Featured Products</h2>
                <Link
                    href=''
                    className='flex items-center gap-2 underline underline-offset-4 hover:text-primary transition-all duration-200'
                >
                    View all <ArrowRight />
                </Link>
            </div>

            <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2'>
                {/* {!productData?.success && (
                    <div className='text-center py-5'>Products Data not found</div>
                )} */}

                {productData?.map(product => (
                    <ProductBox key={product?._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;

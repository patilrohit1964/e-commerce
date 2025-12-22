'use client';

import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductBox from './ProductBox';
import { useEffect, useState } from 'react';

const FeaturedProducts = () => {
    const [productData, setProductData] = useState({
        success: false,
        data: [],
        loading: true,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `/api/get-featured-product`
                );

                setProductData({
                    success: true,
                    data: res.data?.data || [],
                    loading: false,
                });
            } catch (error) {
                console.error('Featured product error:', error.message);
                setProductData({
                    success: false,
                    data: [],
                    loading: false,
                });
            }
        };

        fetchProduct();
    }, []);

    return (
        <section className='lg:px-32 px-4 sm:py-10'>
            <div className='flex justify-between items-center'>
                <h2 className='sm:text-4xl text-2xl'>Featured Products</h2>
                <Link
                    href=''
                    className='flex items-center gap-2 underline underline-offset-4 hover:text-primary transition-all duration-200'
                >
                    View all <ArrowRight />
                </Link>
            </div>

            <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2 my-5'>
                {productData.loading && <div>Loading products...</div>}

                {!productData.loading && !productData.success && (
                    <div>Products not found</div>
                )}

                {productData.success &&
                    productData.data.map(product => (
                        <ProductBox key={product._id} product={product} />
                    ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;

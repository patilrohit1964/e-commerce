import ProductDetail from './ProductDetail'
import axios from 'axios'
import React from 'react'

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params
    const { color, size } = await searchParams
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is missing");
    }
    let url = `${baseUrl}/product/details/${slug}`;
    const paramsa = new URLSearchParams();
    
    if (color) paramsa.append("color", color);
    if (size) paramsa.append("size", size);
    
    if (paramsa.toString()) {
        url += `?${paramsa.toString()}`;
    }
    const { data: getProduct } = await axios.get(url)
    if (!getProduct) {
        return (
            <div>
                <h1 className='text-4xl font-semibold py-10 h-[300px]'>Data Not found</h1>
            </div>
        )
    } else {
        return (
            <ProductDetail product={getProduct?.data?.productData} productColors={getProduct?.data?.productColors} productVariants={getProduct?.data?.productVariants} productSizes={getProduct?.data?.productSizes} productReview={getProduct?.data?.productReviews} />
        )
    };
}

export default ProductPage
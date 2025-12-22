import ProductDetail from './ProductDetail'
import axios from 'axios'
import React from 'react'

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params
    const { color, size } = await searchParams
    let url = `/api/product/details/${slug}`
    if (color && size) {
        url += `?color=${color}&size=${size}`
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
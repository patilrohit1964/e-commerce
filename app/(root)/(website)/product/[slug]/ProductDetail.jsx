'use client'
import { ProductDetailOne } from '../../../../../components/ui/product-detail-01'
import React from 'react'

const productDetail = ({ product, productColors, productSizes, productReview, productVariants }) => {
  return (
    <div>
      <ProductDetailOne productData={product} productSizes={productSizes} />
    </div>
  )
}

export default productDetail
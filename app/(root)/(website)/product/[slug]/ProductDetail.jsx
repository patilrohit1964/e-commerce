'use client'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../../../../../components/ui/breadcrumb'
import { ProductDetailOne } from '../../../../../components/ui/product-detail-01'
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '../../../../../routes/websiteRoute'

const productDetail = ({ product, productColors, productSizes, productReview, productVariants }) => {
  return (
    <div className='lg:px-32 px-4'>
      <div className='my-10'>
        <Breadcrumb className='mb-5'>
          <BreadcrumbList>
            <div className='flex items-center'>
              <BreadcrumbItem >
                <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem >
                <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
                    {product?.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='md:flex justify-between items-start lg:gap-10 gap-5 mb-20'>
        <ProductDetailOne productData={product} productSizes={productSizes} productColors={productColors} productVariants={productVariants} productReview={productReview} />
      </div>
    </div>
  )
}

export default productDetail
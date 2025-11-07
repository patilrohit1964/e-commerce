import Image from 'next/image'
import React from 'react'
import imagePlaceholder from '../../../public/img-placeholder.webp';

const ProductBox = ({ product }) => {
    return (
        <div>
            <Image src={product?.medias?.secure_url || imagePlaceholder} width={400} height={400} alt={product?.medias?.alt || product?.name} title={product?.medias?.title || product?.name} />
            <div className='p-3'>
                <h4>{product?.name}</h4>
                <p></p>
            </div>
        </div>
    )
}

export default ProductBox
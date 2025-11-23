import Image from 'next/image';
import Link from 'next/link';
import { Lens } from '../../../components/ui/lens';
import imagePlaceholder from '../../../public/img-placeholder.webp';
import { PRODUCT_DETAILS } from '../../../routes/websiteRoute';
const ProductBox = ({ product }) => {
    return (
        <div className='rounded-lg hover:shadow-lg border overflow-hidden border-gray-600'>
            <Link href={PRODUCT_DETAILS(product?._id)}>
                <Lens lensSize={150}>
                    <Image src={product?.medias[0]?.secure_url || imagePlaceholder} width={400} height={400} alt={product?.medias[0]?.alt || product?.name} title={product?.medias[0]?.title || product?.name} className='lg:h-[300px] md:h-[200px] h-[150px] w-full object-cover object-top' />
                </Lens>
                <div className='p-3 border-t border-t-gray-600'>
                    <h4>{product?.name}</h4>
                    <p className='flex items-center gap-2 text-sm mt-2'>
                        <span className='line-through text-gray-400'>{product?.mrp.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                        <span className='font-semibold'>{product?.sellingPrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default ProductBox
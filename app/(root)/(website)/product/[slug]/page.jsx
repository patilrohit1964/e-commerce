import axios from 'axios'
import ProductDetail from './ProductDetail'

const ProductPage = async ({ params, searchParams }) => {
    try {
        const { slug } = await params
        const { color, size } = await searchParams
        const baseUrl =
            process.env.VERCEL_URL
                ? process.env.VERCEL_URL
                : "http://localhost:3000";

        let url = `${baseUrl}/api/product/details/${slug}`;
        const paramsa = new URLSearchParams();

        if (color) paramsa.append("color", color);
        if (size) paramsa.append("size", size);

        if (paramsa.toString()) {
            url += `?${paramsa.toString()}`;
        }
        console.log(url, 'url of axios')

        const { data: getProduct } = await axios.get(url)
        if (!getProduct) {
            return (
                <div>
                    <h1 className="text-4xl font-semibold py-10 h-[300px]">
                        Data Not found
                    </h1>
                </div>
            );
        }
        console.log(getProduct?.data?.productVariants,'variants array')
        return (
            <ProductDetail product={getProduct?.data?.productData} productColors={getProduct?.data?.productColors} productVariants={getProduct?.data?.productVariants} productSizes={getProduct?.data?.productSizes} productReview={getProduct?.data?.productReviews} />
        )

    } catch (error) {
        console.error("ProductPage SSR Error:", error);
        return (
            <div>
                <h1 className="text-4xl text-center font-semibold py-10 h-[300px] text-red-500">
                    Something went wrong
                </h1>
            </div>
        );

    }
}

export default ProductPage
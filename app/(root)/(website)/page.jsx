export const dynamic = "force-dynamic";
import { Discount, KeyboardReturn, LocalShipping, SupportAgent } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '../../../components/application/website/FeaturedProducts';
import MainSlider from '../../../components/application/website/MainSlider';
import Testimonial from '../../../components/application/website/Testimonial';
import advertisingBanner from '../../../public/advertising-banner.png';
import banner1 from '../../../public/banner1.png';
import banner2 from '../../../public/banner2.png';

const Home = () => {
  return (
    <>
      {/* Section 1 — Hero Slider */}
      <section>
        <MainSlider />
      </section>

      {/* Section 2 — Promotional Banners */}
      <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
        <div className='grid grid-cols-2 sm:gap-10 gap-2'>
          <div className='border rounded-lg overflow-hidden'>
            <Link href={''}>
              <Image
                src={banner1}
                width={banner1.width}
                height={banner1.height}
                className='transition-all duration-300 hover:scale-105'
                alt='Promotional Banner 1'
              />
            </Link>
          </div>
          <div className='border rounded-lg overflow-hidden'>
            <Link href={''}>
              <Image
                src={banner2}
                width={banner2.width}
                height={banner2.height}
                className='transition-all duration-300 hover:scale-105'
                alt='Promotional Banner 2'
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Section 3 — Advertising Banner */}
      <section className='sm:pt-20 pt-5 pb-10'>
        <Image
          src={advertisingBanner.src}
          height={advertisingBanner.height}
          width={advertisingBanner.width}
          alt='Advertising Banner'
          className='w-full rounded-md shadow-md'
        />
      </section>

      {/* Testimonials Section */}
      <Testimonial />

      {/* Section 4 — Service Highlights */}
      <section className='lg:px-32 px-4 py-16 border-t bg-gray-50'>
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
          {/* Return Policy */}
          <div className='text-center p-4 hover:shadow-md rounded-lg transition-all duration-300 bg-white'>
            <p className='flex justify-center items-center mb-3 text-4xl'>
              <KeyboardReturn fontSize='inherit' />
            </p>
            <h3 className='text-xl font-semibold mb-2'>7-Day Easy Returns</h3>
            <p className='text-gray-600 text-sm'>
              Changed your mind? No problem! Return your item within 7 days for a quick replacement or full refund, no questions asked.
            </p>
          </div>

          {/* Free Shipping */}
          <div className='text-center p-4 hover:shadow-md rounded-lg transition-all duration-300 bg-white'>
            <p className='flex justify-center items-center mb-3 text-4xl'>
              <LocalShipping fontSize='inherit' />
            </p>
            <h3 className='text-xl font-semibold mb-2'>Free Shipping</h3>
            <p className='text-gray-600 text-sm'>
              Enjoy free nationwide delivery on all orders over ₹999. Fast, safe, and on-time delivery right to your doorstep.
            </p>
          </div>

          {/* Support */}
          <div className='text-center p-4 hover:shadow-md rounded-lg transition-all duration-300 bg-white'>
            <p className='flex justify-center items-center mb-3 text-4xl'>
              <SupportAgent fontSize='inherit' />
            </p>
            <h3 className='text-xl font-semibold mb-2'>24/7 Customer Support</h3>
            <p className='text-gray-600 text-sm'>
              Our friendly support team is always ready to assist you with orders, returns, or product guidance—anytime, anywhere.
            </p>
          </div>

          {/* Discounts */}
          <div className='text-center p-4 hover:shadow-md rounded-lg transition-all duration-300 bg-white'>
            <p className='flex justify-center items-center mb-3 text-4xl'>
              <Discount fontSize='inherit' />
            </p>
            <h3 className='text-xl font-semibold mb-2'>Exclusive Member Discounts</h3>
            <p className='text-gray-600 text-sm'>
              Sign up as a member and unlock special discounts, early access to sales, and exclusive promotional offers every month.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

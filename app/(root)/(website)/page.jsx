import Image from 'next/image';
import Link from 'next/link';
import MainSlider from '../../../components/application/website/MainSlider';
import banner1 from '../../../public/banner1.png';
import banner2 from '../../../public/banner2.png';
import FeaturedProducts from '../../../components/application/website/FeaturedProducts';

const Home = () => {
  return (
    <>
      {/* section 1 */}
      <section className='overflow- relative'>
        <MainSlider />
      </section>

      {/* section 2 */}
      <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
        <div className='grid grid-cols-2 sm:gap-10 gap-2'>
          <div className='border rounded-lg overflow-hidden'>
            <Link href={''}>
              <Image src={banner1} width={banner1.width} height={banner1.height} className='transition-all duration-200 hover:scale-110' alt='banner 1' />
            </Link>
          </div>
          <div className='border rounded-lg overflow-hidden'>
            <Link href={''}>
              <Image src={banner2} width={banner2.width} height={banner2.height} className='transition-all duration-200 hover:scale-110' alt='banner 2' />
            </Link>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section>
        <FeaturedProducts />
      </section>
    </>
  )
}
export default Home

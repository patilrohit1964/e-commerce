'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import slider2 from '../../../public/slider-2.png';
import slider3 from '../../../public/slider-3.png';
import slider4 from '../../../public/slider-4.png';
function SampleNextArrow(props) {
    const { onClick, className } = props;
    return (
        <button
            type='button'
            className={'lg:absolute top-57 right-5 z-50 rounded-full bg-white'}
            onClick={onClick}
        >
            <ChevronRight size={50} color='black' />
        </button >
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            type='button'
            className={'lg:absolute top-57 left-5 z-50 rounded-full bg-white'}
            onClick={onClick}
        >
            <ChevronLeft size={50} color='black' />
        </button >
    );
}
const MainSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    return (
        <Slider {...settings}>
            {/* <div>
                <Image
                    src={slider1}
                    layout="responsive"
                    width={slider1.width}
                    height={slider1.height}
                    alt="slider image 1"
                />
            </div> */}
            <div>
                <Image
                    src={slider2}
                    layout="responsive"
                    width={slider2.width}
                    height={slider2.height}
                    alt="slider image 2"
                />
            </div>
            <div>
                <Image
                    src={slider3}
                    layout="responsive"
                    width={slider3.width}
                    height={slider3.height}
                    alt="slider image 3"
                />
            </div>
            <div>
                <Image
                    src={slider4}
                    layout="responsive"
                    width={slider4.width}
                    height={slider4.height}
                    alt="slider image 4"
                />
            </div>
        </Slider>
    )
}

export default MainSlider
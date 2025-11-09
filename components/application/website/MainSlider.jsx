'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import slider2 from '../../../public/slider-2.png';
import slider3 from '../../../public/slider-3.png';
import slider4 from '../../../public/slider-4.png';
function NextArrow(props) {
    const { onClick } = props;
    return (
        <button
            type='button'
            className={'flex items-center absolute top-1/2 -translate-y-1/2 right-5 z-50 rounded-full bg-white'}
            onClick={onClick}
        >
            <ChevronRight size={25} color='black' />
        </button >
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            type='button'
            className={'flex items-center absolute top-1/2 -translate-y-1/2 left-5 z-50 rounded-full bg-white'}
            onClick={onClick}
        >
            <ChevronLeft size={25} color='black' />
        </button >
    );
}
const MainSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrow: false,
                    prevArrow: '',
                    nextArrow: ''
                }
            }
        ]
    }
    return (
        <Slider {...settings}>
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
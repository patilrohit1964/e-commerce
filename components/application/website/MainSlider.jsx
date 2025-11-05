'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from 'next/image';
const MainSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true
    }
    return (
        <Slider {...settings}>
            <div>
                <Image/>
            </div>
            <div>
                {/* add image  */}
                <Image/>
            </div>
            <div>
                <Image/>
            </div>
            <div>
                <Image/>
            </div>
            <div>
                <Image/>
            </div>
        </Slider>
    )
}

export default MainSlider
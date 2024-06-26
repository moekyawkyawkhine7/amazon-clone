import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
    return (
        <div className="relative">
            <div className="h-32 w-full bg-gradient-to-t from-gray-500 to-transparent absolute bottom-0 z-20 mx-auto" />
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <img loading='lazy' src='https://links.papareact.com/gi1' alt='' />
                </div>
                <div>
                    <img loading='lazy' src='https://links.papareact.com/6ff' alt='' />
                </div>
                <div>
                    <img loading='lazy' src='https://links.papareact.com/7ma' alt='' />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
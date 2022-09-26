import React, { useContext, useState } from 'react'
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { BasketContext } from '../store/context/BasketProvider';
import { ADD_TO_BASKET } from '../store/actionTypes';
import PrimeStatus from './PrimeStatus';

const RateStarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 w-5 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    )
}

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ title, price, description, image, category }) => {

    const [_, dispatch] = useContext(BasketContext);

    const [rate] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random() < 0.5);

    const addToBasket = () => {
        let product = {
            title,
            price,
            description,
            image,
            category,
            rate,
            hasPrime,
            id: new Date().getTime()
        }
        dispatch({ type: ADD_TO_BASKET, payload: product });
    }

    return (
        <div className="bg-white hover:shadow-xl hover:scale-105 transform transition duration-300 ease-out flex flex-col relative p-10 m-5 rounded-md shadow-md z-30">
            <p className="absolute top-2 right-2 text-xs italic text-gray-500">{category}</p>
            <div className="relative h-40">
                <Image layout='fill' src={image} objectFit="contain" />
            </div>
            <p className="text-sm font-bold my-3">{title}</p>
            {/* Rate Icon */}
            <div className="flex space-x-1">
                {Array(rate).fill().map((_, i) => <RateStarIcon key={i} />)}
            </div>
            <p className="text-xs font-semibold md:font-normal md:text-sm my-2 line-clamp-2">{description}</p>
            <div className="text-base font-semibold">
                <Currency quantity={price} />
            </div>
            <PrimeStatus hasPrime={hasPrime} />
            <button onClick={addToBasket} className="button">Add to Basket</button>
        </div>
    )
}

export default Product
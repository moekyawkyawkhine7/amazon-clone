import React, { useContext } from 'react'
import Currency from 'react-currency-formatter';
import PrimeStatus from './PrimeStatus';
import Image from 'next/image';
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../store/actionTypes';
import { BasketContext } from '../store/context/BasketProvider';

const RateStarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 w-5 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    )
}

const CheckOutProduct = ({
    id,
    title,
    price,
    description,
    image,
    category,
    rate,
    hasPrime
}) => {
    const [_, dispatch] = useContext(BasketContext);
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

    const removeFromBasket = () => {
        dispatch({ type: REMOVE_FROM_BASKET, payload: { id } })
    }

    return (
        <div className="grid grid-cols-5 py-5 hover:scale-95 transform transition duration-300 ease-out">
            {/* First */}
            <Image src={image} width={200} height={200} objectFit="contain" />
            {/* Middle */}
            <div className="relative col-span-3 px-5">
                <p className="absolute top-2 right-2 text-xs italic text-gray-500">{category}</p>
                <p className="text-sm font-bold my-3">{title}</p>
                <div className="flex">
                    {Array(rate).fill().map((_, i) => <RateStarIcon key={i} />)}
                </div>
                <p className="text-xs font-semibold md:font-normal md:text-sm my-2 line-clamp-3">{description}</p>
                <div className="text-base font-semibold">
                    <Currency quantity={price} />
                </div>
                <PrimeStatus hasPrime={hasPrime} />
            </div>
            {/* Third */}
            <div className="flex flex-col justify-center">
                <button onClick={addToBasket} className="button text-xs md:text-sm mt-0">Add to Basket</button>
                <button onClick={removeFromBasket} className="button text-xs md:text-sm mt-2">Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckOutProduct
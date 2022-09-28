import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { BasketContext } from '../store/context/BasketProvider';
import { ADD_TO_BASKET } from '../store/actionTypes';
import PrimeStatus from './PrimeStatus';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineStar } from 'react-icons/ai';

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, image, category }) => {
    const [qty, setQty] = useState(1);
    const [_, dispatch] = useContext(BasketContext);

    const [rate, setRate] = useState(0);

    const [hasPrime, setHasPrime] = useState(false);

    useEffect(() => { // to solve hydration error
        setHasPrime(Math.random() < 0.5);
        setRate(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    }, [])

    const addToBasket = () => {
        let product = {
            title,
            price,
            description,
            image,
            category,
            rate,
            hasPrime,
            id,
            qty
        }
        dispatch({ type: ADD_TO_BASKET, payload: product });
    }

    return (
        <div className="bg-white hover:shadow-xl hover:scale-105 transform transition duration-300 ease-out flex flex-col relative p-10 m-5 rounded-md shadow-md z-30">
            <p className="absolute top-2 right-2 text-xs italic text-gray-500">{category} {id}</p>
            <div className="relative h-40">
                <Image layout='fill' src={image} objectFit="contain" />
            </div>
            <p className="text-sm font-bold my-3">{title}</p>
            {/* Rate Icon */}
            <div className="flex space-x-1">
                {Array(rate).fill().map((_, i) => <AiOutlineStar className="text-yellow-500" key={i} />)}
            </div>
            <p className="text-xs font-semibold md:font-normal md:text-sm my-2 line-clamp-2">{description}</p>
            <div className="text-base font-semibold">
                <Currency quantity={price} />
            </div>
            <PrimeStatus hasPrime={hasPrime} />
            <div className="mt-auto pt-2 flex flex-col space-y-2">
                <div className="flex justify-between">
                    {/* Minus Svg */}
                    <AiOutlineMinus
                        onClick={() => {
                            if (qty > 1) {
                                setQty(prev => prev - 1)
                            }
                        }}
                        className="w-8 h-8 cursor-pointer bg-yellow-400 rounded-sm text-white"
                    />
                    <p className="font-bold text-base">{qty}</p>
                    {/* Plus Svg */}
                    <AiOutlinePlus
                        onClick={() => setQty(prev => prev + 1)}
                        className="w-8 h-8 cursor-pointer bg-yellow-400 rounded-sm text-white"
                    />
                </div>
                <button onClick={addToBasket} className="button">Add to Basket</button>
            </div>
        </div>
    )
}

export default Product
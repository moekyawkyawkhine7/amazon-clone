import React, { useContext } from 'react'
import Currency from 'react-currency-formatter';
import PrimeStatus from './PrimeStatus';
import Image from 'next/image';
import { DESCREASE_ITEM_FROM_BASKET, INCREASE_ITEM_TO_BASKET, REMOVE_FROM_BASKET } from '../store/actionTypes';
import { BasketContext } from '../store/context/BasketProvider';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineStar } from 'react-icons/ai';

const CheckOutProduct = ({
    id,
    title,
    price,
    description,
    image,
    category,
    rate,
    hasPrime,
    qty
}) => {
    const [_, dispatch] = useContext(BasketContext);

    const increaseQtyToItem = () => {
        dispatch({
            type: INCREASE_ITEM_TO_BASKET, payload: {
                id
            }
        });
    }

    const decreaseQtyFromItem = () => {
        dispatch({
            type: DESCREASE_ITEM_FROM_BASKET, payload: {
                id
            }
        });
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
                    {Array(rate).fill().map((_, i) => <AiOutlineStar className="text-yellow-500" key={i} />)}
                </div>
                <p className="text-xs font-semibold md:font-normal md:text-sm mt-2 line-clamp-3">{description}</p>
                <PrimeStatus hasPrime={hasPrime} />
                <div className="font-bold text-lg">
                    <Currency quantity={price} /> <span className='text-sm'>x {qty} =</span> <Currency quantity={qty * price} />
                </div>
            </div>
            {/* Third */}
            <div className="flex flex-col justify-center">
                <div className="flex justify-between">
                    {/* Minus Svg */}
                    <AiOutlineMinus
                        onClick={() => {
                            if (qty > 1) decreaseQtyFromItem();
                        }}
                        className="w-8 h-8 cursor-pointer bg-yellow-400 rounded-sm text-white"
                    />
                    <p className="font-bold text-base">{qty}</p>
                    {/* Plus Svg */}
                    <AiOutlinePlus
                        onClick={increaseQtyToItem}
                        className="w-8 h-8 cursor-pointer bg-yellow-400 rounded-sm text-white"
                    />
                </div>
                <button onClick={removeFromBasket} className="button text-xs md:text-sm mt-2">Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckOutProduct
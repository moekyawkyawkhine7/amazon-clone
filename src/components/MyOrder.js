import moment from 'moment'
import React from 'react'
import Currency from 'react-currency-formatter';
import Image from 'next/image';

const MyOrder = ({
    id,
    amount,
    amountShipping,
    images,
    items,
    timestamp
}) => {
    return (
        <div className="flex-grow relative border bg-gray-100 rounded-md my-3 mx-1">
            <div className="flex space-x-10 p-5 items-center">
                <div>
                    <p className="font-bold uppercase text-gray-600 text-base">Order Placed</p>
                    <p className="whitespace-nowrap font-semibold text-gray-500 text-sm">
                        {moment(timestamp).format('DD MMM YYYY')}
                    </p>
                </div>
                <div>
                    <p className="font-bold uppercase text-gray-600 text-base">Total</p>
                    <p className="whitespace-nowrap font-semibold text-gray-500 text-sm">
                        <Currency quantity={amount} /> - Next Day Delivery <Currency quantity={amountShipping} />
                    </p>
                </div>
                <div className="flex-grow text-right font-bold text-lg text-blue-500">
                    {items.length} items
                </div>
                <p className="whitespace-nowrap w-40 md:w-60 truncate absolute top-1 right-4 uppercase font-semibold text-gray-500 text-sm">
                    Order # {id}
                </p>
            </div>
            <div className="flex overflow-y-auto space-x-3 px-3 bg-white py-3">
                {images.map((_img, i) => (
                    <div className="relative h-32 w-32 flex-shrink-0" key={i}>
                        <Image src={_img} layout='fill' objectFit="contain" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrder
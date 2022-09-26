import React from 'react'

const PrimeStatus = ({
    hasPrime
}) => {
    if (hasPrime)
        return (
            <div className="flex items-center space-x-2">
                <img src="https://links.papareact.com/fdw" className="w-12 h-12" alt="prime icon" />
                <p className='text-xs text-gray-500 mb-0.5'>FREE Next-day Delivery</p>
            </div>
        )
    else return null;
}

export default PrimeStatus
import React from 'react'
import Image from "next/image";

const Header = () => {
    return (
        <header>
            {/* Top Nav */}
            <div className="flex items-center bg-amazon_blue p-1">
                {/* App Icon  */}
                <div className="pt-2 mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>
                {/* Search Box  */}
                <div className="bg-yellow-400 hover:bg-yellow-500 focus:ring-1 hidden sm:flex items-center flex-grow rounded-md h-10">
                    <input type="text" name="" id="" className="flex-grow flex-shrink rounded-l-md px-2 focus:outline-none h-full" />
                    {/* Search Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mx-2 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                {/* Right Section */}
                <div className="text-white space-x-3 flex mx-4 text-xs">
                    <div className='link'>
                        <p className='whitespace-nowrap'>Hello, Moe Kyaw Kyaw!</p>
                        <p className="font-extrabold md:text-sm whitespace-nowrap">Account & Lists</p>
                    </div>
                    <div className='link'>
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm whitespace-nowrap">& Orders</p>
                    </div>
                    <div className='link relative flex items-center space-x-1'>
                        <p className='h-4 w-4 absolute top-0 -right-1.5 sm:right-9 text-center font-bold rounded-full text-black bg-yellow-500'>0</p>
                        {/* Basket Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <p className="font-extrabold md:text-sm mt-2 hidden sm:inline">Basket</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
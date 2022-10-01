import React from 'react'
import Header from "../components/Header";
import { AiOutlineCheckCircle } from "react-icons/ai";

const success = () => {
  return (
    <div className="h-screen bg-gray-100">
      <Header />
      <main className="breakout-point py-2">
        <div className="w-full text-sm space-y-5 hover:shadow-lg py-5 px-5 md:w-6/12 mx-auto bg-white shadow-md rounded-md">
          <div className="flex items-center space-x-2">
            <AiOutlineCheckCircle
              className="w-8 h-8 text-green-500"
            />
            <p className="text-lg font-semibold">Thank You, your order has been confirmed!</p>
        </div>
        <p>
          Thank you for shopping with us. We'll send a confirmation once your item has been shipped. If you would like to check the status of your order, please press the link below.
        </p>
        <button className="button w-full">Go to my orders</button>
    </div>
      </main >
    </div >
  )
}

export default success
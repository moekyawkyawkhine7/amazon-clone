import React, { useContext, useEffect } from 'react'
import Header from "../components/Header";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from 'next/router';
import { BasketContext } from '../store/context/BasketProvider';
import { CLEAR_ALL_ITEMS } from '../store/actionTypes';
import Footer from '../components/Footer';

const success = () => {
  let router = useRouter();
  let [_, dispatch] = useContext(BasketContext);

  useEffect(() => {
    localStorage.removeItem("items");
    dispatch({
      type: CLEAR_ALL_ITEMS,
      payload: null
    })
  }, [])

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <Header />
        <main className="breakout-point h-full p-1 md:py-2">
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
            <button onClick={() => router.push("/orders")} className="button w-full">Go to my orders</button>
          </div>
        </main >
      </div>
      <Footer />
    </div >
  )
}

export default success
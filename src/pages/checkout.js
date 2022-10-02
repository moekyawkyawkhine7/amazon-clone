import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { BasketContext } from '../store/context/BasketProvider';
import CheckOutProduct from '../components/CheckOutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// Stripe 
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

const CheckOut = () => {
    const {
        data
    } = useSession();

    const [state] = useContext(BasketContext);
    let { items } = state;
    const totalPrice = items.reduce((total, data) => total + (data.price * data.qty), 0);

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        let {
            user: {
                email
            }
        } = data;
        // Call the backend to create a checkout session...
        let createSession = await axios.post("api/create-checkout-session", {
            email,
            items
        });

        // Redirect user to Stripe Checkout
        await stripe.redirectToCheckout({
            sessionId: createSession.data.id
        })
    }

    return (
        <div>
            <Header />
            <main className="breakout-point flex flex-col md:flex-row">
                {/* Right Section */}
                <div className="flex-grow mx-1 md:mx-0">
                    <Image
                        src='https://links.papareact.com/ikj'
                        objectFit='contain'
                        width={1020}
                        height={250}
                    />
                    <div className="py-2 px-3 rounded-md shadow-md bg-white">
                        <h1 className={`font-semibold text-lg ${items.length > 0 ? 'border-b-2 pb-2' : 'py-1'}`}>
                            {items.length > 0 ? 'Shopping Basket!' : 'Shopping Basket is Empty!'}
                        </h1>
                        {/* Middle Section */}
                        {
                            items.length > 0 && (
                                items.map(({
                                    id,
                                    title,
                                    price,
                                    description,
                                    image,
                                    category,
                                    rate,
                                    hasPrime,
                                    qty
                                }, i) => (
                                    <CheckOutProduct
                                        key={i}
                                        id={id}
                                        title={title}
                                        price={price}
                                        description={description}
                                        image={image}
                                        category={category}
                                        rate={rate}
                                        hasPrime={hasPrime}
                                        qty={qty}
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
                {/* Left Section */}
                <div className="bg-white rounded-md shadow-md py-10 pl-3 md:p-10 mt-1 mx-1 md:mt-0 md:ml-1 md:mr-0">
                    <p className="whitespace-nowrap text-sm font-medium">Subtotal ( {items.length} items ):
                        <span className="font-bold pl-1 text-sm">
                            <Currency quantity={totalPrice} />
                        </span>
                    </p>
                    {data ? <button onClick={createCheckOutSession} disabled={items.length === 0} className={`button px-3 mt-1 ${items.length === 0 && 'cursor-not-allowed opacity-50'}`}>Proceed to checkout</button> : (
                        <button className="button mt-1 px-3 from-gray-100 focus:ring-gray-100 to-gray-400 active:from-gray-400 active:ring-gray-400">Sign in to checkout </button>
                    )}
                </div>
            </main>
        </div>
    )
}

export default CheckOut
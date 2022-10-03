import moment from 'moment/moment';
import { getSession, signIn } from 'next-auth/react';
import React from 'react'
import Footer from '../components/Footer';
import Header from "../components/Header";
import MyOrder from '../components/MyOrder';
import db from '../firebase';

const orders = ({
    orders = []
}) => {

    return (
        <div className="h-screen">
            <Header />
            <main className="breakout-point bg-white">
                <div className="w-full md:w-6/12 py-2 mx-auto">
                    <p className="text-2xl font-semibold m-1 md:m-0 pb-1 border-b-2 border-yellow-500">Your Orders</p>
                    <p className="text-sm m-1 md:m-0 font-semibold">{orders.length} orders</p>
                    <div >
                        {orders.length > 0 ? (
                            orders.map(({ id, amount, amountShipping, timestamp, images, items }) => (
                                <MyOrder
                                    key={id}
                                    id={id}
                                    amount={amount}
                                    amountShipping={amountShipping}
                                    images={images}
                                    items={items}
                                    timestamp={timestamp}
                                />
                            ))
                        ) : (
                            <button onClick={signIn} className="button m-1 md:mt-1 md:mx-0 md:mb-0 px-3 from-gray-100 focus:ring-gray-100 to-gray-400 active:from-gray-400 active:ring-gray-400">Sign in to see orders</button>
                        )}
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    )
}

export default orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await getSession(context); // for server
    if (!session) {
        return {
            props: {}
        }
    }
    let { user: { email } } = session;

    // From Firebase
    const ordersFromDB = await db
        .collection("users")
        .doc(email)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .get();

    // From Stripe
    const orders = await Promise.all(ordersFromDB.docs.map(async _order => ({ // multiple promises to one promise, process by process
        id: _order.id,
        amount: _order.data().amount,
        amountShipping: _order.data().amount_shipping,
        images: _order.data().images,
        timestamp: moment(_order.data().timestamp.toDate()).unix(), // unix(): to get the number of second
        items: (await stripe.checkout.sessions.listLineItems(_order.id, {
            limit: 100
        })).data
    })))

    return {
        props: {
            orders
        }, // will be passed to the page component as props
    }
}
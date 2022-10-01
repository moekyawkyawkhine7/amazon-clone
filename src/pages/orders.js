import moment from 'moment/moment';
import { getSession } from 'next-auth/react';
import React from 'react'
import Header from "../components/Header";
import db from '../firebase';

const orders = ({
    orders
}) => {

    console.log("orders:", orders)

    return (
        <div className="h-screen bg-gray-100">
            <Header />
            <main className="breakout-point">
                <div className="w-full md:w-6/12 py-2 mx-auto">
                    <p className="text-2xl font-semibold pb-1 border-b-2 border-yellow-500">Your Orders</p>
                    <div className="flex">
                        Item
                    </div>
                </div>
            </main >
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
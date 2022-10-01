import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to Firebase from the backend
var serviceAccount = require("../../firebase-admin.json");
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Establish a connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullFillOrder = async (session) => {
    try {
        await app.firestore()
            .collection("users")
            .doc(session.metadata.email)
            .collection("orders")
            .doc(session.id).set({
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            })
    } catch (err) {
        console.log("DB storing error!", err)
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        let event;
        // Verify that the event came from stripe
        try {
            const requestBuffer = await buffer(req);
            const payload = requestBuffer.toString();
            const sign = req.headers["stripe-signature"];
            event = stripe.webhooks.constructEvent(payload, sign, endpointSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            // store into Firebase's FireStore
            return fullFillOrder(session)
                .then(res => res.status(200))
                .catch(err => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({
            method: "Method Not Allowed!"
        });
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
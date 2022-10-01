const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { items, email } = req.body;
            const transformItems = items.map(_data => ({
                quantity: _data.qty,
                price_data: {
                    currency: "usd",
                    unit_amount: _data.price * 100,
                    product_data: {
                        name: _data.title,
                        images: [_data.image],
                        description: _data.description
                    }
                }
            }));
            const params = {
                payment_method_types: ['card'],
                shipping_options: [{
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 10 * 100, // 100 cent
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        }
                    }
                },],
                shipping_address_collection: {
                    allowed_countries: ["US"]
                },
                line_items: transformItems,
                mode: 'payment',
                success_url: `${process.env.HOST}/success`,
                cancel_url: `${process.env.HOST}/checkout`,
                metadata: {
                    email,
                    images: JSON.stringify(items.map(_data => _data.image))
                }
            };
            // Create Checkout Sessions 
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json({
                id: session.id
            })
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({
            method: "Method Not Allowed!"
        });
    }
}
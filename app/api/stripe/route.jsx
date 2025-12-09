import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
    console.log("HIT SUCCESSy yay")
    try {
        // you can implement some basic check here like, is user valid or not

        const data = await request.json();
        console.log("data boss req obj has come to the backend", data)

        const priceId = data.priceId;
        const credits = data.credits
        const checkoutSession =
            await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: credits
                    }
                ],
                mode: 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`,
                metadata: {
                    userId: data.id,
                    priceId
                }
            });
        console.log("just before response")
        return NextResponse.json({ result: { url: checkoutSession.url }, ok: true });

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Server', { status: 500 });
    }
}
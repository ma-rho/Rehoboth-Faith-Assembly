import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  });
  try {
    const { amount } = await req.json();

    if (amount < 1) {
        return NextResponse.json({ error: 'Amount must be at least $1.00' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
              description: 'Thank you for your generous contribution to Rehoboth Faith Assembly.',
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/giving?success=true`,
      cancel_url: `${req.headers.get('origin')}/giving?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

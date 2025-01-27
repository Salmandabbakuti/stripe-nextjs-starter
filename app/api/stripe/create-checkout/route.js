import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("creating order", data);
    const { amount, currency } = data;
    if (!amount || !currency)
      return NextResponse.json(
        {
          message:
            "amount and currency are required to create checkout session!"
        },
        { status: 400 }
      );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Technow Pro Subscription",
              description: "Monthly subscription to Technow Pro",
              images: ["https://picsum.photos/200/300"]
            },
            unit_amount: amount * 100 // accepts amount in cents
          },
          quantity: 1
        }
      ],
      payment_intent_data: {
        // metadata to store custom data and map in webhook
        // can only store string values, so stringify if needed
        metadata: {
          order_id: "12345",
          user_id: "67890"
        }
      },
      mode: "payment",
      success_url: `${APP_URL}/payment-success`,
      cancel_url: `${APP_URL}/payment-cancel`
    });
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order!" },
      { status: 500 }
    );
  }
}

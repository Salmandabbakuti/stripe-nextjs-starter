import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const data = await req.text();
    console.log("Received webhook payload:", data);
    const sig = req.headers.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        data, // raw request body
        sig,
        process.env.STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      console.log("Webhook Error: ", err.message);
      return NextResponse.json(
        { message: "Webhook Error", error: err.message },
        { status: 400 }
      );
    }
    // Process the webhook payload
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Received payment_intent.succeeded event");
        const paymentIntent = event.data.object;
        console.log("Payment success intent:", paymentIntent);
        // verify payment and update order status in database
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // send 200 res to acknowledge receipt of event and avoid retries
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Failed to process webhook", error: error.message },
      { status: 500 }
    );
  }
}

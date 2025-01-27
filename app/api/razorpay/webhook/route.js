import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received webhook payload:", data);
    const signature = req.headers.get("x-razorpay-signature");
    console.log("Received webhook signature:", signature);
    const isValid = validateWebhookSignature(
      JSON.stringify(data),
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 400 }
      );
    }
    // Process the webhook payload
    const { event, payload } = data;
    switch (event) {
      case "payment.captured":
        console.log("Captured payment entity:", payload.payment.entity);
        break;
      default:
        console.log("Unhandled webhook event:", event);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Failed to process webhook", error: error.message },
      { status: 500 }
    );
  }
}

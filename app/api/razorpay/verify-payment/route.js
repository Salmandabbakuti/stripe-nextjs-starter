import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("verifying payment in callback route", data);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const isValid = validateWebhookSignature(
      body,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );
    if (!isValid) {
      console.log("Payment verification failed. Invalid signature");
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }
    // process the payment with order_id and payment_id
    // e.g. save the payment details in your database
    console.log("Payment verified successfully");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "Failed to verify payment" },
      { status: 500 }
    );
  }
}

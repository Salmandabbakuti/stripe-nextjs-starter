import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("creating order", data);
    const { amount, currency } = data;
    if (!amount || !currency)
      return NextResponse.json(
        { message: "amount and currency are required to create order!" },
        { status: 400 }
      );
    const options = {
      amount: amount * 100,
      currency,
      receipt: "order_rcptid_11",
      notes: {
        userId: "123",
        plan: "basic",
        email: "johndoe@gmail.com"
      }
    };
    const response = await razorpay.orders.create(options);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order!" },
      { status: 500 }
    );
  }
}

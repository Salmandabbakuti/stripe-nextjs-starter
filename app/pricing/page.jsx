"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder, verifyPayment } from "@/app/actions";

export default function Pricing() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async () => {
    try {
      // const response = await fetch("/api/razorpay/create-order", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     amount: 5999,
      //     currency: "INR"
      //   })
      // });
      // // check if response is ok
      // const order = await response.json();
      // if (!response.ok) {
      //   console.error("Failed to create order:", response);
      //   alert(`Failed to create order: ${order?.message}`);
      //   return;
      // }
      const order = await createOrder({ amount: 5999, currency: "INR" }); // create order using action
      console.log("order created:", order);
      const options = {
        key: "rzp_test_qQtJjEmANYGZzQ", // Replace with your Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: "Acme Corp",
        description: "Pro Plan Subscription",
        image: "https://picsum.photos/200",
        order_id: order.id, // This is the order_id created in the backend
        // callback_url: "http://localhost:3000/api/razorpay/verify-payment", // Your success URL, razorpay sends post request with (orderid, paymentid, signature) can be used to verify payment aswell
        redirect: false, // This is important to prevent redirection to the success URL on failure
        prefill: {
          name: "John Doe",
          email: "johndoe@acme.com",
          contact: "9999999999"
        },
        theme: {
          color: "#007bff"
        },
        handler: async function (response) {
          // const verifyResponse = await fetch("/api/razorpay/verify-payment", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify({
          //     razorpay_order_id: response.razorpay_order_id,
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_signature: response.razorpay_signature
          //   })
          // });
          // const data = await verifyResponse.json();
          // if (!verifyResponse.ok) {
          //   console.error("Payment verification failed:", data);
          //   router.push("/payment-cancel");
          // } else {
          //   console.log("Payment verified:", data);
          //   router.push("/payment-success");
          // }
          // or verify payment using action
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
            .then((data) => {
              console.log("Payment verified:", data);
              router.push("/payment-success");
            })
            .catch((error) => {
              console.error("Payment verification failed:", error);
              router.push("/payment-cancel");
            });
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Choose Your Plan</h1>
        <p style={styles.message}>
          Select the best plan that suits your needs and get started today!
        </p>
        <div style={styles.plan}>
          <h2 style={styles.planTitle}>Pro Plan</h2>
          <p style={styles.planDetails}>
            - Unlimited website scans
            <br />
            - Advanced analytics
            <br />
            - Priority support
            <br />- 1 Year License
          </p>
          <p style={styles.planPrice}>₹5999 INR</p>
          <button style={styles.button} onClick={handlePurchase}>
            Purchase
          </button>
          <br />
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    // backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  card: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%"
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333"
  },
  message: {
    fontSize: "16px",
    margin: "10px 0",
    color: "#6c757d"
  },
  plan: {
    border: "1px solid #007bff",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    textAlign: "left"
  },
  planTitle: {
    fontSize: "20px",
    color: "#007bff",
    marginBottom: "10px"
  },
  planDetails: {
    fontSize: "14px",
    color: "#6c757d",
    lineHeight: "1.5"
  },
  planPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    margin: "10px 0"
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

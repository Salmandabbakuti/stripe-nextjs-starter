"use client";
import Link from "next/link";
import { createCheckout } from "@/app/actions";

export default function Pricing() {
  const handlePurchase = async () => {
    try {
      const orderData = {
        amount: 199,
        currency: "usd"
      };
      // const response = await fetch("/api/stripe/create-checkout", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(orderData)
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to create payment session!");
      // }
      // const { id, url } = await response.json();
      // or use action to create checkout session
      const { id, url } = await createCheckout(orderData);
      console.log("checkout session created", id, url);
      alert("Redirecting to the payment page");
      // open checkout page in new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session!");
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
          <p style={styles.planPrice}>$199 USD</p>
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

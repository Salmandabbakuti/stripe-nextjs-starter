import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment Successful</h1>
        <p style={styles.message}>
          Thank you for your purchase! Your subscription is now active.
        </p>
        <Link href="/" style={styles.button}>
          Go to Home
        </Link>
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
    color: "#28a745"
  },
  message: {
    fontSize: "16px",
    margin: "10px 0",
    color: "#6c757d"
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "16px",
    cursor: "pointer"
  }
};

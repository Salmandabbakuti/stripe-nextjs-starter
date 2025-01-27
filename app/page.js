import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Acme Corp.</h1>
        <a href="/pricing" className={styles.card}>
          <h2>Pricing &rarr;</h2>
          <p>Check the pricing of the plans we offer.</p>
        </a>
      </main>
      <footer className={styles.footer}>
        <a href="" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by <strong>Salman</strong>
        </a>
      </footer>
    </div>
  );
}

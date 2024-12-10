import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <head>
        <title>Gobyerno Ng Pilipinas Tangina</title>
      </head>
      
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <Image
            src="/Seal_of_the_Philippines.svg.png"
            alt="Seal of the Philippines"
            width={80} 
            height={80} 
            priority 
          />
        </div>
        <div className={styles.brand} style={{ textAlign: "left" }}>
          Republic of The Philippines
        </div>
        <div className={styles.brand}>Official Feedback System</div>
        <ul className={styles.navList}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      
      <main className={styles.main}>
        <h1>Welcome to the Republic of The Philippines</h1>
      </main>
      
      <footer className={styles.footer}>
        <p>© 2024 Gobyerno ng Pilipinas. All rights reserved.</p>
      </footer>
    </>
  );
}

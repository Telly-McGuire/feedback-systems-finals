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
        <section id="home" className={styles.welcomeSection}>
          <h1 style={{ textAlign: "center" }}>Welcome to the Republic of The Philippines</h1>
          <p style={{ textAlign: "center" }}>
            This is the official feedback system where your voice matters. Feel free to navigate through the
            system to share your thoughts, report concerns, and access services.
          </p>
          <div className={styles.ctaButtons} style={{ textAlign: "center", marginTop: "20px" }}>
            <a href="#services" className={styles.ctaButton}>View Services</a>
            <a href="#contact" className={styles.ctaButton}>Contact Us</a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2024 Gobyerno ng Pilipinas. All rights reserved.</p>
          <ul className={styles.footerLinks}>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Use</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p>Designed by the National IT Department</p>
        </div>
      </footer>
    </>
  );
}

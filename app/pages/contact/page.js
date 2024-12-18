"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

const ContactPage = () => {
  return (
    <>
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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/pages/feedbackpage">Feedback Form</Link></li>
          <li><Link href="/pages/history">History</Link></li>
          <li><Link href="/pages/polls">Polls</Link></li>
          <li><Link href="/pages/survey">Survey</Link></li>
          <li><Link href="/pages/sentiment">Sentiment</Link></li>
          <li><Link href="/pages/services">Services</Link></li>
          <li><Link href="/pages/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or need assistance? We&apos;re here to help. Reach out to us through any of the following channels:
        </p>

        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <ul>
            <li>
              <strong>Phone:</strong> +63 912 345 6789
            </li>
            <li>
              <strong>Email:</strong> contact@publicvoice.gov.ph
            </li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <h2>Follow Us on Social Media</h2>
          <ul className={styles.socialLinks}>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.brand} style={{ textAlign: "left" }}>
          Project by:
        </div>
        <ul className={styles.navList}>
          <li>Ryan Dioven Aguilar</li>
          <li>Jules Corvee Gico</li>
          <li>John Karl Soloma</li>
        </ul>
      </footer>
    </>
  );
};

export default ContactPage;

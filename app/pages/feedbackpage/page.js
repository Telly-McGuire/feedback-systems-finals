import Image from "next/image";
import styles from "../../page.module.css";
import Head from "next/head";
import Link from 'next/link';

export default function Feedback() {
  return (
    <>
      <Head>
        <title>Feedback Form</title>
      </Head>
      
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
          <li><Link href='/'>Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <h1>Feedback Form</h1>
      </main>

      <footer className={styles.footer}>
        <div className={styles.brand} style={{ textAlign: "left" }}>
          Project by :
        </div>
        <ul className={styles.navList}>
          <li>Ryan Dioven Aguilar</li>
          <li>Jules Corvee Gico</li>
          <li>John Karl Soloma</li>
        </ul>
      </footer>
    </>
  );
}
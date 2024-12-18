import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <head>
        <title>Gobyerno Ng Pilipinas</title>
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
          <li><a href="/">Home</a></li>
          <li><Link href='/pages/feedbackpage'>Feedback Form</Link></li>
          <li><Link href='/pages/history'>History</Link></li>
          <li><Link href='/pages/polls'>Polls</Link></li>
          <li><Link href='/pages/survey'>Survey</Link></li> 
          <li><Link href='/pages/sentiment'>Sentiment</Link></li> 
          <li><Link href='/pages/services'></Link>Services</li>
          <li><Link href='/pages/contact'></Link>Contact</li>
          <li><Link href='/pages/addpoll'></Link>ADD POLLS</li>
          
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.scrollable}>
          <h1>Welcome to Republic Of the Philippines</h1>
          <h2>Public Feedback Gathering System</h2>

          <h2>ARTICLE III</h2>
          <h3>BILL OF RIGHTS</h3>
          <p>
            There are several important laws and provisions within the 
            Constitution that are critical to maintaining order, 
            protecting rights, and ensuring that the government operates in a fair and just manner. 
            These laws serve as the foundation for governance and provide safeguards for the well-being and rights of citizens.
          </p>

          <ul>
            <li>Section 4
              <p>
                No law shall be passed abridging the freedom of speech, of expression, 
                or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances.
              </p>
            </li>

            <li>Section 7
              <p>
                The right of the people to information on matters of public concern shall be recognized.
                Access to official records, and to documents and papers pertaining to official acts, transactions, or decisions, 
                as well as to government research data used as basis for policy development, shall be afforded the citizen, 
                subject to such limitations as may be provided by law.
              </p>
            </li>

            <li>Section 11.
              <p>
                Free access to the courts and quasi-judicial bodies
                and adequate legal assistance shall not be denied to any person by reason of poverty.
              </p>
            </li>

            <li>Section 15.
              <p>
                The privilege of the writ of habeas corpus shall not 
                be suspended except in cases of invasion or rebellion, when the public safety requires it.
              </p>
            </li>
          </ul>

          <button className={styles.button}>
            <Link href='/pages/feedbackpage'><span>Submit Feedback Here</span></Link>
          </button>

        </div>
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

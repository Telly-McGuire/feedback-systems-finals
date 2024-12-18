"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

const ServicesPage = () => {
  return (
    <>
      {/* Navigation Bar */}
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
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        <h1>Our Services</h1>
        <p>
          PublicVoice is your platform for engaging with the government and ensuring your voice is heard. 
          We provide the following services to foster transparency, accountability, and citizen empowerment:
        </p>

        <ul className={styles.serviceList}>
          <li>
            <h2>Feedback and Complaints System</h2>
            <p>
              Share your experiences and concerns about government services. Attach supporting documents to ensure your complaints are addressed effectively.
            </p>
          </li>
          <li>
            <h2>Community Polls and Voting</h2>
            <p>
              Participate in decision-making processes through polls and voting. Have a say on local initiatives such as infrastructure projects and public programs.
            </p>
          </li>
          <li>
            <h2>Service Satisfaction Surveys</h2>
            <p>
              Contribute to improving government services by providing your feedback through targeted surveys. Your input drives change.
            </p>
          </li>
          <li>
            <h2>Analytics and Reporting</h2>
            <p>
              See the bigger picture with comprehensive analysis of feedback and survey data. PublicVoice identifies trends to guide service enhancements.
            </p>
          </li>
        </ul>
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

export default ServicesPage;

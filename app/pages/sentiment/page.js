"use client";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../page.module.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [sentiment, setSentiment] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze', {
        feedback,
      });
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setSentiment('Error');
    }
  };

  return (
    <div>
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
          <li><Link href='/pages/services'>Services</Link></li>
          <li><Link href='/pages/contact'>Contact</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <h1>Feedback Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback"
          rows="5"
          cols="40"
        ></textarea>
        <br />
        <button type="submit">Analyze Sentiment</button>
      </form>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
};

export default Feedback;

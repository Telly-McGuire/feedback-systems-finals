"use client"
import Image from "next/image";
import styles from "../../page.module.css";
import Link from 'next/link';
import { useState } from 'react';


export default function Feedback() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    stars: "",
    comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending the form data to the backend
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFormData({ name: "", stars: "", comments: "" }); // Reset form data
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <head>
        <title>Feedback Form</title>
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
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/pages/feedbackform'>Feedback Form</Link></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <h1>Survey Form</h1>
        <form className={styles.surveyForm} onSubmit={handleSubmit}>

          <label htmlFor="name">Name (optional):</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="stars">How many stars (1–5):</label>
          <select
            id="stars"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            required
          >
            <option value="">Select stars</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            rows="4"
            placeholder="Leave your comments here"
            value={formData.comments}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
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

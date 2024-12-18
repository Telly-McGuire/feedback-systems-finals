"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import Link from "next/link";
import { useState } from "react";
import { db } from "../../firebase";  // Import the Firestore instance from firebase.js
import { collection, addDoc } from "firebase/firestore"; // Import necessary Firestore functions

const metadata = {
  title: "Feedback Form - Gobyerno Ng Pilipinas", 
};

export default function Feedback() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    stars: 0,
    comments: "",
  });

  // State to track selected stars
  const [hoverStars, setHoverStars] = useState(0);

  // State to track loading state for form submission
  const [loading, setLoading] = useState(false);

  // State to track modal visibility and message
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      stars: rating,
    });
  };

  const handleStarHover = (rating) => {
    setHoverStars(rating);
  };

  const handleStarLeave = () => {
    setHoverStars(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    try {
      // Make sure the collection function receives the correct Firestore instance (`db`)
      const feedbackCollection = collection(db, "feedback"); // Pass `db` as the first argument
      const docRef = await addDoc(feedbackCollection, {
        name: formData.name,
        stars: formData.stars,
        comments: formData.comments,
      });

      if (docRef.id) {
        setModalMessage("Feedback submitted successfully!");
        setFormData({ name: "", stars: 0, comments: "" }); // Reset form data
        setShowModal(true); // Show the modal with success message
      }
    } catch (error) {
      setModalMessage("Error: " + error.message); // Set error message
      setShowModal(true); // Show the modal with error message
    } finally {
      setLoading(false);  // Set loading to false when submission finishes
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when user clicks close button
  };

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

          <label>How many stars (1–5):</label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${
                  (hoverStars || formData.stars) >= star ? styles.active : ""
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              >
                ★
              </span>
            ))}
          </div>

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

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>

      {/* Modal Popup */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>{modalMessage}</p>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

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
}

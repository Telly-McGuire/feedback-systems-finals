"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Import the Firestore instance
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import Firestore functions
import styles from "../../page.module.css"; // Import the styles
import Image from "next/image";
import Link from "next/link";

const HistoryPages = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({}); // Track selected feedbacks using an object

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Fetch all feedback documents from Firestore
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbackData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackData); // Store feedback data in state
      } catch (error) {
        setError("Failed to fetch feedbacks. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFeedbacks();
  }, []); // Fetch data on component mount

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "feedback", id)); // Delete the feedback from Firestore
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id)); // Remove feedback from state
      const updatedSelectedFeedbacks = { ...selectedFeedbacks };
      delete updatedSelectedFeedbacks[id]; // Remove deleted feedback ID from selected state
      setSelectedFeedbacks(updatedSelectedFeedbacks); // Update the selected feedbacks state
    } catch (error) {
      alert("Error deleting feedback: " + error.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // Get the IDs of selected feedbacks
      const feedbackIdsToDelete = Object.keys(selectedFeedbacks).filter(
        (id) => selectedFeedbacks[id] === true
      );

      if (feedbackIdsToDelete.length === 0) {
        alert("No feedback selected for deletion.");
        return;
      }

      // Delete selected feedbacks in batch
      for (const id of feedbackIdsToDelete) {
        await deleteDoc(doc(db, "feedback", id)); // Delete from Firestore
      }

      // Update state by filtering out the deleted feedbacks
      setFeedbacks(feedbacks.filter((feedback) => !feedbackIdsToDelete.includes(feedback.id)));
      setSelectedFeedbacks({}); // Clear selected feedbacks
    } catch (error) {
      alert("Error deleting selected feedbacks: " + error.message);
    }
  };

  const handleSelectFeedback = (id) => {
    setSelectedFeedbacks((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id], // Toggle selection state
    }));
  };

  if (loading) {
    return <div>Loading feedbacks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <head>
        <title>Feedback History - Gobyerno Ng Pilipinas</title>
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
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.scrollable}>
          <h1>Feedback History</h1>

          {feedbacks.length === 0 ? (
            <p>No feedbacks available.</p>
          ) : (
            <>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteSelected}
                disabled={Object.keys(selectedFeedbacks).length === 0}
              >
                Delete Selected Feedbacks
              </button>

              <ul className={styles.feedbackList}>
                {feedbacks.map((feedback) => (
                  <li
                    key={feedback.id}
                    className={`${styles.feedbackItem} ${selectedFeedbacks[feedback.id] ? styles.selected : ''}`}
                    onClick={() => handleSelectFeedback(feedback.id)} // Select the whole item on click
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeedbacks[feedback.id] || false} // Checkbox will reflect the selection state
                      onChange={() => handleSelectFeedback(feedback.id)} // Toggle on checkbox click
                    />
                    <p><strong>Name:</strong> {feedback.name || "Anonymous"}</p>
                    <p><strong>Rating:</strong> {feedback.stars} stars</p>
                    <p><strong>Comments:</strong> {feedback.comments}</p>
                    {selectedFeedbacks[feedback.id] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering card selection when deleting
                          handleDelete(feedback.id);
                        }}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
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
};

export default HistoryPages;

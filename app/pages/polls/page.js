"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import styles from "../../page.module.css";
import Image from "next/image";
import Link from "next/link";

const PollPage = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "polls"));
        const pollData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPolls(pollData);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionId) => {
    try {
      const pollRef = doc(db, "polls", pollId);
      const poll = polls.find((p) => p.id === pollId);
      const updatedOptions = poll.options.map((option) =>
        option.id === optionId
          ? { ...option, votes: option.votes + 1 }
          : option
      );

      await updateDoc(pollRef, { options: updatedOptions });
      alert("Vote submitted successfully!");
    } catch (error) {
      alert("Error submitting vote: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading polls...</div>;
  }

  return (
    <div>
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
          <li><Link href='/pages/feedbackpage'>Feedback Form</Link></li>
          <li><Link href='/pages/history'>History</Link></li>         
          <li><Link href='/pages/survey'>Survey</Link></li> 
          <li><Link href='/pages/sentiment'>Sentiment</Link></li> 
          <li><Link href='/pages/services'>Services</Link></li>
          <li><Link href='/pages/contact'>Contact</Link></li>
        </ul>
      </nav>  

      <div className={styles.pollPage}>
        <h1>Community Polls</h1>
        {polls.map((poll) => (
          <div key={poll.id} className={styles.pollCard}>
            <h2>{poll.title}</h2>
            {poll.options.map((option) => (
              <div key={option.id} className={styles.pollOption}>
                <label>
                  <input
                    type="radio"
                    name={`poll-${poll.id}`}
                    value={option.id}
                    checked={selectedOption[poll.id] === option.id}
                    onChange={() =>
                      setSelectedOption({ ...selectedOption, [poll.id]: option.id })
                    }
                  />
                  {option.text} ({option.votes} votes)
                </label>
              </div>
            ))}
            <button
              onClick={() => handleVote(poll.id, selectedOption[poll.id])}
              disabled={!selectedOption[poll.id]}
            >
              Submit Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollPage;

"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "surveys"));
        const surveyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSurveys(surveyData);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, []);

  const handleSubmit = async (surveyId) => {
    try {
      await addDoc(collection(db, `surveys/${surveyId}/responses`), {
        ...responses[surveyId],
      });
      alert("Survey response submitted successfully!");
    } catch (error) {
      alert("Error submitting survey response: " + error.message);
    }
  };

  const handleChange = (surveyId, questionId, value) => {
    setResponses({
      ...responses,
      [surveyId]: {
        ...responses[surveyId],
        [questionId]: value,
      },
    });
  };

  if (loading) {
    return <div>Loading surveys...</div>;
  }

  return (
    <div className={styles.surveyPage}>
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
          <li><Link href='/'>Home</Link></li>
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
      <h1>Community Surveys</h1>
      {surveys.map((survey) => (
        <div key={survey.id} className={styles.surveyCard}>
          <h2>{survey.title}</h2>
          {survey.questions.map((question) => (
            <div key={question.id} className={styles.surveyQuestion}>
              <label>{question.text}</label>
              {question.type === "text" ? (
                <input
                  type="text"
                  value={responses[survey.id]?.[question.id] || ""}
                  onChange={(e) =>
                    handleChange(survey.id, question.id, e.target.value)
                  }
                />
              ) : (
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={responses[survey.id]?.[question.id] || ""}
                  onChange={(e) =>
                    handleChange(survey.id, question.id, parseInt(e.target.value))
                  }
                />
              )}
            </div>
          ))}
          <button onClick={() => handleSubmit(survey.id)}>Submit Survey</button>
        </div>
      ))}
    </div>
  );
};

export default SurveyPage;

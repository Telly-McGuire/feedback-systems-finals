"use client";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "../../page.module.css";
import Image from "next/image";
import Link from "next/link";

const AddContent = () => {
  const [isPoll, setIsPoll] = useState(true);  // Track if adding Poll or Survey
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", type: "text" }]);
  const [loading, setLoading] = useState(false);

  // Poll Handling
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handlePollSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pollData = {
      title: pollTitle,
      options: options.map((option, index) => ({
        id: (index + 1).toString(),
        text: option,
        votes: 0,
      })),
    };

    try {
      await addDoc(collection(db, "polls"), pollData);
      alert("Poll added successfully!");
      setPollTitle("");
      setOptions([""]);
    } catch (error) {
      console.error("Error adding poll:", error);
      alert("Error adding poll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Survey Handling
  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", type: "text" }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    setQuestions(updatedQuestions);
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const surveyData = {
      title: surveyTitle,
      questions: questions.map((question) => ({
        text: question.text,
        type: question.type,
      })),
    };

    try {
      await addDoc(collection(db, "surveys"), surveyData);
      alert("Survey added successfully!");
      setSurveyTitle("");
      setQuestions([{ text: "", type: "text" }]);
    } catch (error) {
      console.error("Error adding survey:", error);
      alert("Error adding survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <li><a href="/">Home</a></li>
          <li><Link href="/pages/feedbackpage">Feedback Form</Link></li>
          <li><Link href="/pages/history">History</Link></li>
          <li><Link href="/pages/polls">Polls</Link></li>
          <li><Link href="/pages/survey">Survey</Link></li>
          <li><Link href="/pages/sentiment">Sentiment</Link></li>
          <li><Link href="/pages/services">Services</Link></li>
          <li><Link href="/pages/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className={styles.addContent}>
        <h1>{isPoll ? "Add New Poll" : "Add New Survey"}</h1>
        <button onClick={() => setIsPoll(!isPoll)}>
          Switch to {isPoll ? "Survey" : "Poll"}
        </button>

        {isPoll ? (
          <form onSubmit={handlePollSubmit}>
            <label>
              Poll Title:
              <input
                type="text"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                required
              />
            </label>
            <div>
              <h3>Options:</h3>
              {options.map((option, index) => (
                <div key={index} className={styles.optionInput}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddOption}>
                Add Option
              </button>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding Poll..." : "Add Poll"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSurveySubmit}>
            <label>
              Survey Title:
              <input
                type="text"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                required
              />
            </label>
            <div>
              <h3>Questions:</h3>
              {questions.map((question, index) => (
                <div key={index} className={styles.optionInput}>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    required
                    placeholder={`Question ${index + 1}`}
                  />
                  <select
                    value={question.type}
                    onChange={(e) =>
                      handleQuestionTypeChange(index, e.target.value)
                    }
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </div>
              ))}
              <button type="button" onClick={handleAddQuestion}>
                Add Question
              </button>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding Survey..." : "Add Survey"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddContent;

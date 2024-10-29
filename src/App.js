import React, { useState, useEffect} from "react";
import FeedBack from "./components/FeedBack/FeedBack.jsx"
import Statistics from "./components/Statistics/Statistics.jsx"
import Section  from "./components/Section/Section.jsx";
import Notification from "./components/Notifacation/Notification.jsx";


const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);


  const handleLeaveFeedback = (type) => {
    setFeedback((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  useEffect(() => {
    const total = feedback.good + feedback.neutral + feedback.bad;
    setTotalFeedback(total);

    const positive = total ? Math.round((feedback.good / total) * 100) : 0;
    setPositivePercentage(positive);
  }, [feedback]);


  return (
    <div>
      <Section title="Please leave your feedback">
        <FeedBack options={["good", "neutral", "bad"]} onLeaveFeedback={handleLeaveFeedback}/>
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics 
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedbacks" />
        )}
      </Section>
    </div>
  )
}

export default App 
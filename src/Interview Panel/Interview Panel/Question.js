import React, { useState, useEffect, useCallback } from "react";
import "./Question.css";
import { Button, Spinner } from "react-bootstrap";
import debounce from 'lodash.debounce';

function Question({
  question,
  index,
  totalQuestions,
  onAnswerSubmit,
  onTimeUp,
  saveAllAnswers,
  lastQuestionSubmitted,
  saveTotalResult,
  loading,
}) {
  const [answer, setAnswer] = useState("");
  const minimumTime = question?.minimumTime || 0;
  const [timeLeft, setTimeLeft] = useState(minimumTime);

  useEffect(() => {
    setAnswer("");
    setTimeLeft(minimumTime);
  }, [question, index, minimumTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp(index);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, onTimeUp]);

  const handleAnswerChange = useCallback(debounce((newValue) => {
    saveAllAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = newValue;
      return updatedAnswers;
    });
  }, 300), [index, saveAllAnswers]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    handleAnswerChange(newValue);
  };

  const handleSubmit = () => {
    onAnswerSubmit(index, answer);
  };

  return (
    <>
      {lastQuestionSubmitted ? (
        <div>
          <h1 className="text-light">
            To complete the exam, please click on Submit Exam Button
            <Button
              variant="success outline-success"
              onClick={saveTotalResult}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Submitting...
                </>
              ) : (
                "Submit Exam"
              )}
            </Button>
          </h1>
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <div className="inside p-3">
            <h2 className="text-light">
              Question <span className="text-info">{index + 1}</span> of {totalQuestions}
            </h2>
            <h5 className="question text-light">
              <span>Q)</span> {question?.question}
            </h5>
            <textarea
              className="form-control"
              value={answer}
              onChange={onChange}
              style={{ width: "100%", height: "200px" }}
              placeholder="Type your answer here..."
              disabled={timeLeft <= 0} // Disable when time is up
            />
            <div>
              <p className={`text-light ${timeLeft <= 10 ? 'text-danger' : ''}`}>
                Time Remaining for this Question: {timeLeft} seconds
              </p>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={timeLeft <= 0}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Question;
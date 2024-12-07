import React, { useState, useRef, useEffect } from "react";
import "./Exam.css";
import Question from "./Question";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Exam = () => {
  const Ref = useRef(null);
  const { emailid } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [lastQuestionSubmitted, setLastQuestionSubmitted] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [timer, setTimer] = useState("00:00:00");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [exitExam, setExitExam] = useState(false);
  const [isQuestions, setIsQuestions] = useState(false);
  const apiUrl = process.env.REACT_APP_DB;
  const [loading, setLoading] = useState(false);
  const environment = process.env.REACT_APP_NODE_ENV;
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const getCandidateDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}candidates/exam/${emailid}`);
      if (response) {
        setUserDetails(response.data);
    

        if (response.data.examStatus == true) {
          setIsVerified(true);
          if (response.data.candidateId) {
            getter(response.data.candidateId);
          }
        } else {
          setIsVerified(false);
          Swal.fire({
            title:
              "plase attend Interview at " +
              response.data?.interviewDate +
              " Time is " +
              response.data?.interviewTime,
            text:
              "Sorry to say u cannot write exam at the time please try at  " +
              response.data?.interviewDate +
              " Time is " +
              response.data?.interviewTime,
            icon: "warning",
          });
          navigate("/");
        }
      }
    } catch (error) {
      Swal.fire({
        title: error.response.data?.message,
        text: error.response.data?.message,
        icon: "error",
      });
      navigate("/");
    }
  };

  const getter = async (candidateId) => {
    try {
      const response = await axios.get(
        `${apiUrl}candidates/${candidateId}/questions`
      );
      setQuestions(response.data);
      setIsQuestions(true);
      if (response.data.length > 0) {
        Swal.fire({
          title: "INSTRUCTIONS",
          text: `
            Please Read Carefully:
            \u25A0 Do not refresh the page.
            \u25A0 Do not exit the exam directly without submitting.
            \u25A0 Cannot go to the previous or next question.
            
            * Click to start the exam.
          `,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "START",
          confirmButtonColor: "#17a2b8",
          showCancelButton: true,
          backdrop: true,
        }).then((result) => {
          if (result.isConfirmed) {
            handleStartExam();
          }
        });
      } else {
        Swal.fire({
          title: "Exam Postponed",
          text: "We regret to inform you that your exam has been postponed. Our team will reach out to you with further details soon. Thank you for your understanding.",
          icon: "warning",
        });
        setIsVerified(false);
        setIsQuestions(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Please try again later",
        text: "An error occurred while fetching questions",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  

 

  const Input = {
    TotalExamMarks: 20,
    PassPercentage: "50%",
    QuestionsAndAnswers: [
      {
        Question:
          "Can you describe your role and key responsibilities at IDREAM MEDIA related to managing YouTube and Facebook from July 2022 to January 2024?",
        MinimumTime: 90,
        MaximumMarks: 10,
        Answer: "",
      },
      {
        Question:
          "What were your primary responsibilities and achievements as an HR at Q CONNEQT BUSINESS SOLUTIONS LIMITED from June 2021 to May 2022?",
        MinimumTime: 90,
        MaximumMarks: 10,
        Answer: "",
      },
    ],
  };

  const fetchResults = async () => {
    let updatedInput = {
      ...Input,
      QuestionsAndAnswers: questions.map((q) => ({
        Question: q.question,
        MinimumTime: q.minimumTime,
        MaximumMarks: q.maximumMarks,
        Answer: "",
      })),
    };

    updatedInput = {
      ...updatedInput,
      QuestionsAndAnswers: updatedInput.QuestionsAndAnswers.map(
        (qa, index) => ({
          ...qa,
          Answer: answers[index] || "",
        })
      ),
    };

    try {
      const response = await axios.post(
        `https://hook.eu2.make.com/5a0umo82ii6z8j0gmcl84v8hs1xyq00p`,
        updatedInput
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const saveTotalResult = async () => {
    try {
      setLoading(true);
      const result = await fetchResults();
      let finalOutput = {
        ...result,
        answers: answers,
      };

      const response = await axios.post(
        `${apiUrl}interviews/save-answers/${userDetails.candidateId}`,
        finalOutput
      );

      setExitExam(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: error.response.data.error,
        text: error.response.data.message,
        icon: "error",
      });
    }
  };
  const countVariable = 1;
  useEffect(() => {
    getCandidateDetails();
  }, [countVariable]);

  const [statuses, setStatuses] = useState(
    Array(questions.length).fill("unattempted")
  );

  const totalTime = questions.reduce(
    (accumulator, currentElement) => accumulator + currentElement.minimumTime,
    0
  );

  const getTimeRemaining = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (time) => {
    let { hours, minutes, seconds } = getTimeRemaining(time);
    if (time >= 0) {
      setTimer(
        `${hours > 9 ? hours : "0" + hours}:${
          minutes > 9 ? minutes : "0" + minutes
        }:${seconds > 9 ? seconds : "0" + seconds}`
      );
    }
  };

  const clearTimer = (time) => {
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      if (time > 0) {
        time -= 1;
        startTimer(time);
      } else {
        clearInterval(Ref.current);
      }
    }, 1000);

    Ref.current = id;
  };


  const handleStartExam = () => {
    clearTimer(totalTime);
  };

 

  const handleAnswerSubmit = (index, answer) => {
    if (index < questions.length - 1) {
      const newStatuses = [...statuses];
      newStatuses[index] = "attempted";
      setStatuses(newStatuses);
      setCurrentIndex(index + 1);
    } else {
      setLastQuestionSubmitted(true);
    }
  };

  const handleTimeUp = (index) => {
    if (index < questions.length - 1) {
      const newStatuses = [...statuses];
      newStatuses[index] = "timed-out";
      setStatuses(newStatuses);
      setCurrentIndex(index + 1);
    } else {
      setLastQuestionSubmitted(true);
    }
  };

  return (
    <div className="exam-background">
      {exitExam ? (
        <>
          <p className="text-light text-center fw-bold fst-italic">
            your answers are saved with us. please, exit the exam
          </p>
        </>
      ) : (
        <>
          {isVerified ? (
            <>
              <div className="">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a className="navbar-brand">
                    <img src="/logo192.png" alt="logo" class="responsive" />
                  </a>
                  <h6 className="text-light text-center">{emailid}</h6>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse "
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-auto"></ul>
                    <div className="form-inline my-2 pe-1 my-lg-0 text-light">
                      <span className="text-bold p-0 m-0 g-0">Time Left: </span>
                      <span className="p-0 ms-1 g-0">
                        <h3> {timer}</h3>
                      </span>
                    </div>
                  </div>
                </nav>
              </div>
            </>
          ) : (
            <>
           

              <div className="container mb-3 text-light">
                <h1 className="text-center mb-4">Interview Starting Soon</h1>
                <p className="lead text-center text-light">
                  Your online interview will begin in one minute. Please be
                  prepared. All the best!
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <div className="card bg-info text-white">
                      <h3 className="card-title text-center">
                        <div className="d-flex flex-wrap justify-content-center mt-2">
                          <span className="badge">
                            {minutes < 10 ? "0" : ""}
                            {minutes}
                          </span>{" "}
                          :
                          <span className="badge">
                            {seconds < 10 ? "0" : ""}
                            {seconds}
                          </span>
                        </div>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isQuestions ? (
            <>
              <div className="row">
                <div className="col-2 border-right">
                  <div className="container fw-bolder pt-1 pt-md-0 pt-sm-0">
                    {questions.map((element, index) => (
                      <span
                        className={`dot m-1 text-center ${
                          currentIndex === index
                            ? "bg-info text-white"
                            : statuses[index] === "attempted"
                            ? "bg-success text-white"
                            : statuses[index] === "timed-out"
                            ? "bg-danger text-white"
                            : statuses[index] === "unattempted"
                            ? "bg-warning text-white"
                            : ""
                        }`}
                        key={`question-dot-${index}`}
                      >
                        <div>{index + 1}</div>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-10">
                  <div className="row">
                    <Question
                      question={questions[currentIndex]}
                      index={currentIndex}
                      totalQuestions={questions.length}
                      onAnswerSubmit={handleAnswerSubmit}
                      onTimeUp={handleTimeUp}
                      saveAllAnswers={setAnswers}
                      lastQuestionSubmitted={lastQuestionSubmitted}
                      saveTotalResult={saveTotalResult}
                      loading={loading}
                      isQuestions={isQuestions}
                    />
                  </div>
                  <div className="row"></div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Exam;

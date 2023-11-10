import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Question from "../../Components/Question/Question";
// import axios from "axios";
import axiosInstance from "../axioConfig/axioConfig";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  console.log(userData);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  // const handleAskQuestionClick = () => {
  //   // Navigate to the "Ask Question" page when the button is clicked
  //   navigate("/askquestion");
  // };

  const question = () => {
    axiosInstance
      .get("/questions", {
        headers: { "x-auth-token": userData.token },
      })
      .then((res) => {
        console.log("Response data:", res.data);
        setQuestions(res?.data?.questions);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  useEffect(() => {
    question();
    console.log(userData);
  }, [userData.user]);

  
  return (
    <>
      <Header />
      <section>
        <div className="d-flex justify-content-around mt-5 body-tertiary">
          <Link to="/askquestion" className="btn btn-primary action-btn px-5">
            Ask Question
          </Link>
          <p className="fw-semibold">
            <span className="text-warning">Welcome,</span>{" "}
            {userData.user?.display_name}
          </p>
        </div>
        <div className="container mt-5">
          <h2>Questions</h2>
          {questions.map((question) => (
            <div onClick={()=>navigate(`/questions/${question.question_id}`)}>
              <Question
                firstName={question.first_name}
                lastName={question.last_name}
                question={question.question}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;





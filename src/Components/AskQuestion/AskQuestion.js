
import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import axiosInstance from "../../Pages/axioConfig/axioConfig";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const [userData] = useContext(UserContext);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostQuestion = async () => {
    try {
      if (!userData.user) {
        console.log("User is not logged in. Please log in to post a question.");
        return;
      }

      const questionData = {
        question: form.title,
        question_description: form.description,
        user_id: userData.user.user_id, // Get the user_id from the context
      };

      const response = await axiosInstance.post("/questions", questionData, {
        headers: {
          "x-auth-token": userData.token,
        },
      });

      console.log("Question posted successfully:", response.data);

      navigate("/"); // You might need to adjust this route based on your project's routing configuration
    } catch (error) {
      console.error("Error posting the question:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center">
              <h4 className="fs-5">Steps to write a good question</h4>
              <ul className="text-start mx-auto" style={{ maxWidth: "500px" }}>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>Review your question and post it to the site.</li>
              </ul>
              <div className="mt-5">
                <h4 className="fs-5 pt-5">Ask a public question</h4>
                <p className="fs-">Go to the Question page</p>
              </div>
            </div>

            <form>
              <div className="mb-0">
                <label htmlFor="questionTitle" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  id="questionTitle"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-1">
                <label
                  htmlFor="questionDescription"
                  className="form-label"
                ></label>
                <textarea
                  className="form-control"
                  id="questionDescription"
                  name="description"
                  rows="4"
                  placeholder="Question description"
                  value={form.description}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePostQuestion}
                >
                  Post Your Question
                </button>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;

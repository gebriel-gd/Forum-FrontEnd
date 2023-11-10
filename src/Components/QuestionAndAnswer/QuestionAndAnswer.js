// 
//latest version 
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Pages/axioConfig/axioConfig";
import { LiaUserCircle } from "react-icons/lia";
import Header from "../Header/Header";
import { UserContext } from "../../context/UserContext";

const QuestionAndAnswer = () => {
  const { question_id } = useParams();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  const [form, setForm] = useState("");

const handleFormChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};



  // const [value]=useState()

  console.log(userData);
  //Getting user data
  const getQuestion = async () => {
    try {
      if (!userData || !userData.token) {
        return;
      }

      const questionResponse = await axiosInstance.get(
        `/questions/${question_id}`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );

      setQuestion(questionResponse?.data?.questions);
      console.log(questionResponse);
    } catch (error) {
      console.log("Error fetching question:", error);
    }
  };

  useEffect(() => {
    getQuestion();
    AnswerSets();
  }, []);

  const AnswerSets = async () => {
    try {
      const answerGetter = await axiosInstance.get(
        `/questions/${question_id}/answers`,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );
      setAnswers(answerGetter?.data?.answers);
      console.log(answerGetter);
    } catch (error) {
      console.log("Error fetching answers:", error);
    }
  };


  const handlePostAnswers = async () => {
    try {
      if (!userData || !userData.token) {
        console.log("User is not logged in. Please log in to post an answer.");
        return;
      }

      const answerData = {
        answer: form.answer,
        user_id:userData.user.id,
        question_id: question_id,
      };
      console.log(answerData);
      
      const response = await axiosInstance.post(
        `/questions/${question_id}/answers`,
        answerData,
        {
          headers: {
            "x-auth-token": userData.token,
          },
        }
      );

      console.log("New Answer:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error posting answer:", error);
      //console.log("Error response data:", error.response.data);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div>
          <h2>Question</h2>
          <div className>
            {question?.map((data) => (
              <div key={data.question_id} className="answer-container row">
                <div className="col-auto">
                  {/* <h1 className="h2">{data.question}</h1> */}
                </div>
                <div className="col">
                  <p className="text-muted small">
                    {data.question}
                  </p>
                  <p className="text-muted small">
                    {data.question_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <h2>Answer From the Community</h2>
          <hr />
          <div className>
            {answers?.map((answer) => (
              <div key={answer.answer_id} className="answer-container row">
                <div className="col-auto">
                  <LiaUserCircle style={{ fontSize: `5rem` }} />
                  <div> </div>
                </div>
                <div className="col">
                  <p className="text-info">{answer.userName}</p>
                  <p className="text-muted small">{answer.text}</p>
                  <h1 className="text-muted small">{answer.answer}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="mt-5">
                <h4 className="fs-5 pt-1">Answer The Top Question</h4>
                <p className="fs-6">Go to the Question page</p>
              </div>
            </div>

            <form>
              <div className="mb-1">
                <label htmlFor="newAnswers" className="form-label"></label>
                <textarea
                  className="form-control"
                  id="newAnswers"
                  name="answer" // Update this line
                  rows="4"
                  placeholder="Your Answer..."
                  value={form.answer} // Update this line
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePostAnswers}
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
export default QuestionAndAnswer;






















 
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../Pages/axioConfig/axioConfig";
// import { LiaUserCircle } from "react-icons/lia";
// import Header from "../Header/Header";
// import { UserContext } from "../../context/UserContext";

// const QuestionAndAnswer = () => {
//   const { questionId } = useParams();
//   const [question, setQuestion] = useState();
//   const [answers, setAnswers] = useState([]);
//   const [newAnswer, setNewAnswer] = useState("");
//   const navigate = useNavigate();
//   const [userData, setUserData] = useContext(UserContext);


//   console.log(userData);
//   //Getting user data
//   const getQuestion = async () => {
//     try {
//       if (!userData || !userData.token) {
//         return;
//       }

//       const questionResponse = await axiosInstance.get(
//         `/questions/${questionId}`,
//         {
//           headers: {
//             "x-auth-token": userData.token,
//           },
//         }
//       );

//       setQuestion(questionResponse.data.question);
//     } catch (error) {
//       console.log("Error fetching question:", error);
//     }
//   };

//   useEffect(() => {
//     getQuestion();
//   }, [questionId, userData]);

//   const handleFormChange = (e) => {
//     setNewAnswer(e.target.value);
//   };

//   const handlePostAnswer = async () => {
//     try {
//       if (!userData || !userData.token) {
//         console.log("User is not logged in. Please log in to post an answer.");
//         return;
//       }

//       const answerData = {
//         text: newAnswer,
//         question_id: questionId,
//       };

//       const response = await axiosInstance.post("/answers", answerData, {
//         headers: {
//           "x-auth-token": userData.token,
//         },
//       });

//       console.log("New Answer:", response.data);

//       navigate("/");
//     } catch (error) {
//       console.error("Error posting answer:", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <div>
//           <h2>Question</h2>
//           <h3>{question?.title}</h3>
//           <p>{question?.description}</p>
//           <hr />
//           <h2>Answer From the Community</h2>
//           <hr />
//           <div className="center-text">
//             {answers.map((answer) => (
//               <div key={answer.answer_id}>
//                 <LiaUserCircle />
//                 <p>{answer.userName}</p>
//                 <p>{answer.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="center-text">
//           <h2>Answer The Top Question</h2>
//           <textarea
//             value={newAnswer}
//             onChange={handleFormChange}
//             rows={4}
//             style={{ width: "100%" }}
//             placeholder="Your Answer..."
//           />
//           <button className="blue-button" onClick={handlePostAnswer}>
//             Post Your Answer
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default QuestionAndAnswer;


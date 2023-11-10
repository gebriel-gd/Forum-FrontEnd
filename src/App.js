import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LandingLayout from "./Pages/Landing/LandingLayout";
import axiosInstance from "./Pages/axioConfig/axioConfig";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import QuestionAndAnswer from "./Components/QuestionAndAnswer/QuestionAndAnswer";
import Login from "./Pages/Login/Login";
// import Question from "./Components/Question/Question";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const userRes = await axiosInstance.get("/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route
          path="/questions/:question_id"
          element={<QuestionAndAnswer />}
        />
        <Route
          path="/"
          element={userData.user ? <Home logout={logout} /> : <LandingLayout />}
        />
      </Routes>
    </Router>
  );
}

export default App;
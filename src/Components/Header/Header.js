import React,{useContext} from "react";
import logo from "../../assets/logo.png"; //image not being recognized
// import bg from "../../assets/bg.svg"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


  const Header = () => {
  const [userData, setUserData] = useContext(UserContext);
  const Navigate = useNavigate();

const logout = () => {
  // Perform the logout action, e.g., clear the user data and token from context and localStorage
  setUserData({
    user: undefined,
    token: undefined,
  });

  localStorage.removeItem("auth-token");

  // You can also navigate to a different page after logout, e.g., the login page
  Navigate("/");
};

  return (
    <section>
      <nav className="navbar p-3 navbar-expand-lg ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {" "}
            {/* Add Link to Home */}
            <img src={logo} alt="" />
          </Link>
          {/* <a className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end fw-semibold"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item align-items-center d-flex">
                <Link to="/" className="nav-link active">
                  Home
                </Link>{" "}
                {/* Add Link to Home */}
              </li>
              <li className="nav-item align-items-center d-flex">
                <a className="nav-link" href="">
                  How it works
                </a>
              </li>
              <li className="nav-item align-items-center">
                <a className="nav-link" href="">
                  {userData.user ? (
                    <button
                      onClick={logout}
                      className="btn btn-primary fw-bold px-5 action-btn"
                    >
                      SIGN OUT
                    </button>
                  ) : (
                    <button className="btn btn-primary fw-bold px-5 action-btn">
                      SIGN IN
                    </button>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;

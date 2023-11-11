import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axioConfig/axioConfig";
// require("dotenv").config();

const Login = ({ setCurrentPage }) => {
  const [userData, setUserData] = useContext(UserContext);
  const Navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axiosInstance.post(
        "/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      Navigate("/");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) Navigate("/");
  }, [userData.user, Navigate]);

  return (
    <div className="col card p-5  text-center mt-5">
      <div>
        <h3 className="m-3">Login to your account</h3>
        <p className="mb-5">
          Don't have an account?{" "}
          {/* <Link
            to="/signup"
            className="fw-semibold text-decoration-none text-warning"
            onClick={() => setCurrentPage("signup")}
          >
            Create a new account
          </Link> */}
          <a
            href="#"
            onClick={() => setCurrentPage("signup")}
            className="fw-semibold text-decoration-none text-warning"
          >
            Create a new account
          </a>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-3">
          <input
            type="email"
            name="email"
            className="form-control p-3"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-control p-3"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <p className="d-flex justify-content-end">
            <a
              href=""
              className="fw-semibold text-decoration-none text-warning"
            >
              Forgot Password
            </a>
          </p>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary action-btn fs-5 fw-semibold"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

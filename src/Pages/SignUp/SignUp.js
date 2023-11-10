import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const SignUp = ({ setCurrentPage }) => {
  const [form, setForm] = useState({});
  const Navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_base_url}/api/users`, form);
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
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
       <h3 className="m-3">Join the network</h3>
       <p className="mb-5">
         Already have an account?{" "}
         {/* <Link
           to="/login"
           className="fw-semibold text-decoration-none text-warning"
           onClick={() => setCurrentPage("login")}
         >
           Sign in
         </Link> */}
         <a
           href=""
           onClick={() => setCurrentPage("login")}
           className="fw-semibold text-decoration-none text-warning"
         >
           Sign in
         </a>
       </p>
     </div>
     <form onSubmit={handleSubmit}>
       <div className="d-flex flex-column gap-3">
         <input
           type="User name"
           className="form-control p-3"
           name="userName"
           placeholder="User name"
           onChange={handleChange}
         />
         <input
           type="email"
           className="form-control p-3"
           name="email"
           placeholder="Email address"
           onChange={handleChange}
         />
         <div className="d-flex gap-4">
           <input
             type="text"
             className="form-control p-3"
             name="firstName"
             placeholder="First Name"
             onChange={handleChange}
           />

           <input
             type="text"
             className="form-control p-3"
             name="lastName"
             placeholder="Last Name"
             onChange={handleChange}
           />
         </div>
         <input
           type="password"
           className="form-control p-3"
           name="password"
           placeholder="password"
           onChange={handleChange}
         />
       </div>
       <div className="p-3">
         <small>I agree to the privacy policy and terms of service.</small>
       </div>

       <div className="d-grid">
         <button
           type="submit"
           className="btn btn-primary action-btn fs-5 fw-semibold"
         >
           Agree and Join
         </button>
         <div className="mt-3">
           <p className="d-flex justify-content-center">
             <a
               href=""
               onClick={() => setCurrentPage("login")}
               className="fw-semibold text-decoration-none text-warning"
             >
               Already have an account?
             </a>
           </p>
         </div>
       </div>
     </form>
   </div>
 );
};

export default SignUp;

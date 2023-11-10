
import React from "react";
import { LiaUserCircle, LiaAngleRightSolid } from "react-icons/lia";
import { Navigate, useNavigate, Link } from "react-router-dom";


const Question = ({firstName,lastName,question}) => {
  return (
    <Link
      to=""
      className="text-decoration-none text-black"
    >
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-md-flex align-items-center">
          <div className="user d-flex flex-column align-items-center">
            <div>
              <LiaUserCircle />
            </div>
            <div>{firstName} {lastName}</div>
          </div>
          <div>
            <p>{question}</p>
          </div>
        </div>
        <div>
          <span>
            <LiaAngleRightSolid />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Question;


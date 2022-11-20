import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./forgotPassword.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(Context);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();
    // console.log("Request to backend from forgot password");
    // console.log("user", user);
    // console.log("Email: ", user?.email);
    try {
      let res = await axios.patch("https://blogapp-backend18.herokuapp.com/api/v1/auth/forgotPassword", { email } );
      if (res.status == 204) {
        toast.success("OTP sent successfully");
        navigate("/resetPassword");
      }
      // console.log("Email again " , email);
    } catch (err) {
      if (err.message == "Request failed with status code 404") {
        toast.error("Email not found");
      } else if (err.message == "Request failed with status code 500") {
        toast.error("Internal Server Error");
      }
      console.log(err.message);
    }
  };
  return (
    <div className="forgotpass">
      <span className="forgotTitle">Forgot Password</span>
      <form className="forgotForm">
        <label>EMAIL</label>
        <input
          className="forgotInput"
          type="text"
          placeholder="Enter email to generate OTP"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link to="/resetPassword">
          <button className="forgotButton" onClick={sendEmail}>
            SEND OTP
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;

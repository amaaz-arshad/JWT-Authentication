// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Fill recaptcha");
      return;
    }
    axios
      .post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          localStorage.setItem("jwtToken", JSON.stringify(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div className="mt-5 text-center">
      <form onSubmit={signup}>
        <input
          type="text"
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <div className="text-center">
          <ReCAPTCHA
            sitekey={config.RECAPTCHA_SITE_KEY}
            onChange={(token) => setToken(token)}
            onExpired={(e) => setToken("")}
          />
        </div>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
};

export default Register;

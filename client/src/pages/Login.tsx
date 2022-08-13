// @ts-nocheck
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const captchaRef = useRef(null);

  const signin = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Fill recaptcha");
      return;
    }

    axios
      .post("http://localhost:5000/auth/login", {
        // token,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          captchaRef.current.reset();
          setToken("");
          localStorage.setItem("jwtToken", JSON.stringify(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
        console.log(err.response.data.error);
      });

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // };
    // fetch("http://localhost:5000/auth/login", requestOptions)
    //   .then((response) => response.json())
    //   .then((res) => console.log(res));
  };

  return (
    <div className="mt-5 text-center">
      <form onSubmit={signin}>
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
        <div style={{ width: "300px", margin: "auto" }}>
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={config.RECAPTCHA_SITE_KEY}
            onChange={(token) => {
              console.log(token);
              setToken(token);
            }}
            onExpired={(e) => setToken("")}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default Login;

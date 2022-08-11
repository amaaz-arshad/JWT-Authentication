// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const signin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
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
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const Login = () => {
  const { setIsLogin, setCurrEmail, setData } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log("user found");
        if (json) {
          setCurrEmail(email);
          fetch("http://localhost:5001/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              setData(json);
            })
            .catch((error) => {
              console.error(error);
            });
          setIsLogin(true);
        } else {
          alert("User Not Found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          onClick={handleSignIn}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <Link to="/forgot">Forgot Password</Link>
    </div>
  );
};

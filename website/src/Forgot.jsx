import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Forgot = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleForgot(e) {
    e.preventDefault();
    fetch("http://localhost:5001/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.status);
        if (json.status) {
          alert("password updated");
          navigate("/");
        } else {
          alert("User not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">
          Please enter new password for user
        </h1>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          onClick={handleForgot}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

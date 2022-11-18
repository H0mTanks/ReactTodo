import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { setIsLogin, setCurrEmail } = useContext(GlobalContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    fetch("http://localhost:5001/register", {
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
          setCurrEmail(email);
          setIsLogin(true);
          navigate("/");
        } else {
          alert("User already exists");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
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
          onClick={handleRegister}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

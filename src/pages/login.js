import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import UserDataService from "../services/user.service";

const Login = (props) => {
  const initialUserState = {
    // id: null,
    name: "",
    email: "",
  };
  let navigate = useNavigate();

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    if (user.email !== "") {
      UserDataService.getUser(user.email)
        .then((response) => {
          console.log(response.data);
          props.login(response.data);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <section className="section">
      <h2>Login</h2>
      <br />
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <button onClick={login} className="btn btn-success">
            Login
          </button>
        </div>
      </div>
      <br />
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </section>
  );
};

export default Login;

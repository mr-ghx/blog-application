import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        Blog Application
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>
          <li className="navbar-item">
            {props.user ? (
              <a onClick={props.logout} className="nav-link" style={{cursor: "pointer"}}>
                Logout {props.user.name.split(" ")[0]}
              </a>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

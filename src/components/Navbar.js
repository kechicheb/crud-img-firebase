import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="page">
      <nav className="topnav page__topnav">
        <ul className="topnav__links">
          <li className="topnav__link-box active">
            <Link className="topnav__link" to="/">
              Home
            </Link>
          </li>
          <li className="topnav__link-box">
            <Link className="topnav__link" to="/add">
              Add User
            </Link>
          </li>
          <li className="topnav__link-box">
            <Link className="topnav__link" to="/update">
              Update
            </Link>
          </li>
          <li className="topnav__link-box">
            <Link className="topnav__link" to="#">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

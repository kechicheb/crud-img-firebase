import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>crud image Firebase</h3>
        </Link>
        <nav>
          <div>
            <Link to="/add" className="add">Add user</Link>
      
          </div>
        </nav>
      </div>
    </header>
  );
}

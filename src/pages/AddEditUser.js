import React from "react";
import { useState } from "react";
let initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};
export default function AddEditUser() {
  const [data, setData] = useState(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validate = ()=> {
    let errors = {
      
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>add user</h3>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} value={name} />
        <label>Email address:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <label>info:</label>
        <input type="text" name="info" onChange={handleChange} value={info} />
        <label>contact:</label>
        <input
          type="text"
          name="contact"
          onChange={handleChange}
          value={contact}
        />
        <label>Upload</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          value={contact}
        />
        <button>add user</button>
      </form>
    </div>
  );
}

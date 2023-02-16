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
  // const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  // const [isSubmit, setSubmit] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validate = () => {
    if (!name || !email || !contact || !info) {
      setError("All fields must be filled");
    }
    let empty = [];
    if (!name) empty.push("name");
    if (!email) empty.push("email");
    if (!info) empty.push("info");
    if (!contact) empty.push("contact");
    setEmptyFields(empty);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>add user</h3>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Email address:</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={email}
        className={emptyFields.includes("email") ? "error" : ""}
      />
      <label>info:</label>
      <input
        type="text"
        name="info"
        onChange={handleChange}
        value={info}
        className={emptyFields.includes("info") ? "error" : ""}
      />
      <label>contact:</label>
      <input
        type="text"
        name="contact"
        onChange={handleChange}
        value={contact}
        className={emptyFields.includes("contact") ? "error" : ""}
      />
      <label>Upload</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button>add user</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

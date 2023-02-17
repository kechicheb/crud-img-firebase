import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";
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
  const [error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
    if(!id){
      setData(initialState)
    }
  }, [id]);
  const getSingleUser = async () => {
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) setData({ ...snapshot.data() });
  
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "users"), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }else {
      try {
        await updateDoc(doc(db, "users",id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>{id ? "Update" : "Add"} user</h3>
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
      <button disabled={progress !== null && progress < 100}>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

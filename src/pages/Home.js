import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { deleteDoc, collection, doc, onSnapshot } from "firebase/firestore";
import ModalComp from "../components/ModalComp";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleModel = (item) => {
    setOpen(true);
    setUser(item);
  };
  useEffect(() => {
    if (open) {
      if (document.querySelector(".overlay")) {
        document.querySelector(".overlay").style.visibility = "visible;";
        document.querySelector(".overlay").style.opacity = "1";
      }
    } else {
      if (document.querySelector(".overlay")) {
        document.querySelector(".overlay").style.visibility = "hidden";
        document.querySelector(".overlay").style.opacity = "0";
      }
    }
  }, [open]);
  const handleDelete = async (id) => {
   if(window.confirm("Are you sure to delete that user ?")){
     try {
      setOpen(false);
      setUser({});
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
    }
   }
  };
  return (
    <div className="home">
      {users &&
        users.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.img} alt="Avatar" style={{ width: "100%" }} />
            <div className="container">
              <h4>
                <b>{item.name}</b>
              </h4>
              <p>{item.email}</p>
            </div>
            <div className="btns">
              <button
                className="update btn"
                onClick={() => navigate(`/update/${item.id}`)}
              >
                Update
              </button>
              <button
                className="view btn"
                onClick={() => {
                  handleModel(item);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      {open && (
        <ModalComp
          open={open}
          setOpen={setOpen}
          setUser={setUser}
          handleDelete={handleDelete}
          {...user}
        />
      )}
    </div>
  );
};
export default Home;

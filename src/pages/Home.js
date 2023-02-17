import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [users, setUsers] = useState([]);
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
                <button className="view btn">View</button>
              </div>
          </div>
        ))}
    </div>
  );
};
export default Home;

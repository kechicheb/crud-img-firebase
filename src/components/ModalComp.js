import React from "react";

export default function ModalComp({
  open,
  setOpen,
  setUser,
  img,
  name,
  info,
  email,
  contact,
  id,
  handleDelete,
}) {
  return (
    <div id="popup1" className="overlay" open={open}>
      <div className="popup">
        <h2>{name}</h2>
        <a
          className="close"
          onClick={() => {
            setOpen(false);
            setUser({});
          }}
        >
          &times;
        </a>
        <div className="content">
          <div className="info">
            <img src={img} />
            <div>
              <p>{email}</p>
              <p>{info}</p>
              <p>{contact}</p>

              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

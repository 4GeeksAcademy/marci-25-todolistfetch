import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Contacts = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const fetchData = async () => {
    await actions.getUsers();
  };

  const handleAlert = () => {
    console.log(person);
  };

  const handleDelete = async (id) => {
    await actions.deleteContact(id)
    fetchData()
  }

  const handleEdit = (personas) => {
    actions.setCurrentContact(personas);
    navigate("/edit-contact");
  }
  useEffect(() => {
    fetchData()
  }, []);

  const handleEye = (person) => {
    console.log(person);
    actions.setCurrentContact(person)
    navigate('/card-contact')
  };

  return (
    <div className="container text-start">
      <h1 className="text-center text-success">Contactos de {store.slug}</h1>
      <button className="btn btn-warning" onClick={handleAlert}>Alert</button>

      <ul className="list-group">
        {store.contacts.map((item) =>
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            {item.name}
            <div>
              {/* <Link to='/contact-details'> */}
              <span className="text-primary me-2" onClick={() => handleEye(item)}>
                <i className="far fa-eye"></i>
              </span>
              {/* </Link/> */}
              <span className="text-success me-2" onClick={()=> handleEdit(item)} >
                <i className="far fa-edit"></i>
              </span>
              <span className="text-danger" onClick={() => handleDelete(item.id)}>
                <i className="fas fa-trash"></i>
              </span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

import React from "react";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../store/appContext'

export const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context)


    const Contacto = () => {
        console.log(contact)
        actions.deleteContact(contact.id);
    };

    return (
        <div className="container">
        <h1 className="text-center">Detalles</h1>
        <div className="d-flex justify-content-center">
         <div className="row row-cols row-cols-sm-auto row-cols-md-auto row-cols-lg-auto">
            <div className="card">
              {!store.currentContact ? 
                'Sin datos' 
              :
              <>
                <img src={`https://randomuser.me/api/portraits/women/${store.currentContact.id}.jpg`} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h2 className="card-title">{store.currentContact.name}</h2>
                    <p className="card-text">Email: {store.currentContact.email}</p>
                    <p className="card-text">phone:  {store.currentContact.phone}</p>
                    <p className="card-text">website:  {store.currentContact.website}</p>
                  </div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    )
}
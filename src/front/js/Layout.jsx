import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import { BackendURL } from "./component/BackendURL.jsx";

import ScrollToTop from "./component/ScrollToTop.jsx";
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { CardContact } from "./pages/CardContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Species } from "./pages/Species.jsx";
import { Vehicles } from "./pages/Vehicles.jsx";
import { Starships } from "./pages/Starships.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Character } from "./pages/Character.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<CardContact />} path="/card-contact" />
                        <Route element={<EditContact />} path="/edit-contact" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Species />} path="/species" />
                        <Route element={<Vehicles />} path="/vehicles" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Character />} path="/pages/character" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { TodoList } from "../component/TodoList.jsx";
import { UserJPH } from "../component/UsersJPH.jsx";
import { CardContact } from "./CardContact.jsx";
import { Contacts } from "./Contacts.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
{/* 			<CardContact />
			<Contacts /> */}
			{/* 			<TodoList /> */}
			{/* 			<UserJPH /> */}
			{/* 			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
		</div>
	);
};

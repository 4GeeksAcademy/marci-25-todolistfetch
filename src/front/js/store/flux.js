const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{ title: "FIRST", background: "white", initial: "white" },
				{ title: "SECOND", background: "white", initial: "white" }
			],
			slug: 'Marcel',
			host: 'https://playground.4geeks.com/contact',
			contacts: [],
			currentContact: null,
			currentUser: null,
		},
		actions: {
				// Use getActions to call a function within a fuction
				exampleFunction: () => {
					getActions().changeColor(0, "green");
				},

				getMessage: async () => {
					try {
						// fetching data from the backend
						const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
						const data = await resp.json()
						setStore({ message: data.message })
						// don't forget to return something, that is how the async resolves
						return data;
					} catch (error) {
						console.log("Error loading message from backend", error)
					}
				},
				changeColor: (index, color) => {
					//get the store
					const store = getStore();

					//we have to loop the entire demo array to look for the respective index
					//and change its color
					const demo = store.demo.map((elm, i) => {
						if (i === index) elm.background = color;
						return elm;
					});

					//reset the global store
					setStore({ demo: demo });
				},
				getUsers: async () => {
					// const url = 'https://jsonplaceholder.typicode.com/users';
					const url = `${getStore().host}/agendas/${getStore().slug}/contacts`;
					const options = {
						method: 'GET'
					};
					const response = await fetch(url, options);
					if (!response.ok) {
						log('error: ', response.status, response.statusText);
						return;
					}
					const data = await response.json();
					setStore({ contacts: data.contacts});
					// setStore({ contacts: data });
					localStorage.setItem('contacts', JSON.stringify(data));
					localStorage.setItem('usuario', getStore().slug)
				},
				deleteContact: async (id) => {
					const url = `${getStore().host}/agendas/${getStore().slug}/contacts/${id}`;
					const options = {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json"
						}
					}
					const response = await fetch(url, options)
					if (!response.ok){
						console.error("Hay un error", response.status, response.statusText);
						console.error(url, options);
						return false;
					} else {
						console.log(`Contacto con ID ${id} eliminado correctamente`);
						setStore({ contacts: getStore().contacts.filter(contact => contact.id !== id) });
						return true;
					}
				},
				editContact: async (id, name, email, phone, address) => {
					const uri = `${getStore().host}/agendas/${getStore().slug}/contacts/${id}`;
					const dataToSend = {
						"name": name,
						"email": email,
						"phone": phone,
						"address": address,
					};
					const options = {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(dataToSend)
					}
					const response = await fetch(uri, options)
					console.log(response);
					if (!response.ok){
						console.log('Error:', response.status, response.statusText);
						return
					}
					console.log(dataToSend);
					await getActions().getUsers(); 
					console.log(response);
				},
				setCurrentContact: (contact) => { setStore({ currentContact: contact }) },
				setCurrentUser: (slug) => { setStore({ currentUser: slug }) },
			}
		}
	};

export default getState;

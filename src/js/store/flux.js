const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			deleteContact: (indexToDelete) => {
				const store = getStore();
				console.log('deleteContact desde flux',indexToDelete)
				console.log(store.contacts)				
				//setStore({ contacts: store.contacts.filter( (contact, index)=> index != indexToDelete ) });
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				fetch("https://playground.4geeks.com/contact/agendas/elon/contacts/"+indexToDelete, requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result)
					fetch('https://playground.4geeks.com/contact/agendas/elon/contacts')
					.then( (response)=> response.json() )
					// .then( (data)=> console.log(data.contacts) )
					.then( (data)=> setStore({ contacts: data.contacts }) )
				
				})
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log('se cargo la pagina flux me aviso')
				
				fetch('https://playground.4geeks.com/contact/agendas/elon/contacts')
				.then( (response)=> response.json() )
				// .then( (data)=> console.log(data.contacts) )
				.then( (data)=> setStore({ contacts: data.contacts }) )

				
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
			}
		}
	};
};

export default getState;

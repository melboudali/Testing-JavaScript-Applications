import React, { useState, useEffect } from "react";
import { API_ADDR } from "./constants.js";
import ItemForm from "./ItemForm.jsx";
import ItemList from "./ItemList.jsx";

const App = () => {
	const [items, setItems] = useState({});
	useEffect(() => {
		const loadItems = async () => {
			const response = await fetch(`${API_ADDR}/inventory`);
			setItems(await response.json());
		};
		loadItems();
	}, []);

	return (
		<div>
			<h1>Inventory Contents</h1>
			<ItemList items={items} />
			<ItemForm />
		</div>
	);
};
export default App;

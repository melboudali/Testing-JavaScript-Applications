import React, { useState } from "react";
import ItemList from "./ItemList";

export default {
	title: "ItemList",
	component: ItemList,
	includeStories: ["staticItemList", "animatedItems"]
};

export const staticItemList = () => (
	<ItemList
		items={{
			cheesecake: 2,
			croissant: 5,
			macaroon: 96
		}}
	/>
);

export const animatedItems = () => {
	const initialList = { cheesecake: 2, croissant: 5 };
	const StatefulItemList = () => {
		const [itemList, setItemList] = useState(initialList);
		const add = () => setItemList({ ...initialList, macaroon: 96 });

		const reset = () => setItemList(initialList);

		return (
			<div>
				<ItemList items={itemList} />
				<button onClick={add}>Add item</button>
				<button onClick={reset}>Reset</button>
			</div>
		);
	};

	return <StatefulItemList />;
};

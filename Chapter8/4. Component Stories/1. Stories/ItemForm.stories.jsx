import React, { useEffect } from "react";
import ItemForm from "./ItemForm";
import fetchMock from "fetch-mock";
import { API_ADDR } from "./constants";

export default {
	title: "ItemForm",
	component: ItemForm,
	includeStories: ["itemForm"]
};

export const itemForm = () => {
	const ItemFormStory = () => {
		useEffect(() => {
			fetchMock.post(`glob:${API_ADDR}/inventory/*`, 200);
			return () => fetchMock.restore();
		}, []);

		return (
			<ItemForm
				onItemAdded={(...data) => {
					alert(JSON.stringify(data));
				}}
			/>
		);
	};

	return <ItemFormStory />;
};

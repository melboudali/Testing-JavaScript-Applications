const addItemToCart = async (username, itemName) => {
	if (itemEntry) {
		await db("carts_items").increment("quantity").update({ updatedAt: new Date().toISOString() }).where({
			userId: itemEntry.userId,
			itemName
		});
	} else {
		await db("carts_items").insert({
			userId: user.id,
			itemName,
			quantity: 1,
			updatedAt: new Date().toISOString()
		});
	}
};

const hoursInMs = n => 1000 * 60 * 60 * n;

const removeStaleItems = async () => {
	const fourHoursAgo = new Date(Date.now() - hoursInMs(4)).toISOString();

	const staleItems = await db.select().from("carts_items").where("updatedAt", "<", fourHoursAgo);

	if (staleItems.length === 0) return;

	const inventoryUpdates = staleItems.map(staleItem =>
		db("inventory").increment("quantity", staleItem.quantity).where({ itemName: staleItem.itemName })
	);
	await Promise.all(inventoryUpdates);

	const staleItemTuples = staleItems.map(i => [i.itemName, i.userId]);
	await db("carts_items").del().whereIn(["itemName", "userId"], staleItemTuples);
};

const monitorStaleItems = () => setInterval(removeStaleItems, hoursInMs(2));

module.exports = { addItemToCart, monitorStaleItems };

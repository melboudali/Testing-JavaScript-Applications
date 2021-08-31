exports.up = function (knex) {
	return knex.schema.alterTable("carts_items", table => {
		table.timestamp("updatedAt");
	});
};

exports.down = function (knex) {
	return knex.schema.alterTable("carts_items", table => {
		table.timestamp("updatedAt");
	});
};

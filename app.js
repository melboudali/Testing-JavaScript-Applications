const koa = require("koa");
const Router = require("@koa/router");

const app = new koa();
const router = new Router();

let carts = new Map();
let inventory = new Map();

router.get("/carts/:username/items", ctx => {
	const cart = carts.get(ctx.params.username);
	cart ? (ctx.body = cart) : (ctx.status = 404);
});

router.post("/carts/:username/items/:item", ctx => {
	const { username, item } = ctx.params;

	if (!inventory.get(item)) {
		ctx.status = 404;
		return;
	}

	inventory.set(item, inventory.get(item) - 1);

	const newItems = (carts.get(username) || []).concat(item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

router.delete("/carts/:username/items/:item", ctx => {
	const { username, item } = ctx.params;
	const newItems = (carts.get(username) || []).filter(i => i !== item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

app.use(router.routes());

const resetState = () => {
	carts = new Map();
};

module.exports = { app: app.listen(3000), carts, resetState, inventory };

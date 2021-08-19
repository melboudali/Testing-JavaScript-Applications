const koa = require("koa");
const Router = require("@koa/router");
const fetch = require("isomorphic-fetch");

const app = new koa();
const router = new Router();

const carts = new Map();

router.get("/carts/:username/items", ({ params: { username }, body, status }) => {
	const cart = carts.get(username);
	cart ? body(cart) : status(404);
});

router.post("/carts/:username/items/:item", ({ params: { username, item } }) => {
	const newItems = (carts.get(username) || []).concat(item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

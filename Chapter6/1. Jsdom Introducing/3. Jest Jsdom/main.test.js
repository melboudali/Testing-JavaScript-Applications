const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const { count, incrementCount } = require("./main");

describe("incrementCount", () => {
	test("incrementing the count", () => {
		expect(count).toBe(0);
		incrementCount();
		expect(count).toBe(1);
	});
});

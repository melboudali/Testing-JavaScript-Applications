const fs = require("fs");
document.body.innerHTML = fs.readFileSync(`${__dirname}/index.html`);

const { count, incrementCount } = require("./main");

describe("incrementCount", () => {
	test("incrementing the count", () => {
		count = 0;
		incrementCount();
		expect(count).toBe(1);
	});
});

import React from "react";
import { ActionLog } from "./ActionLog";
import { render } from "@testing-library/react";

const daysToMs = days => days * 24 * 60 * 60 * 1000;

test("logging actions", () => {
	const actions = [
		{
			time: new Date(daysToMs(1)),
			message: "Loaded item list",
			data: { cheesecake: 2, macaroon: 5 }
		},
		{
			time: new Date(daysToMs(2)),
			message: "Item added",
			data: { cheesecake: 2 }
		},
		{
			time: new Date(daysToMs(3)),
			message: "Item removed",
			data: { cheesecake: 1 }
		},
		{
			time: new Date(daysToMs(4)),
			message: "Something weird happened",
			data: { error: "The cheesecake is a lie" }
		}
	];

	const { container: containerOne } = render(<ActionLog actions={actions} />);
	expect(containerOne).toMatchSnapshot();

	const newActions = actions.concat({
		time: new Date(daysToMs(5)),
		message: "You were given lemons",
		data: { lemons: 1337 }
	});

	const { container: containerTwo } = render(<ActionLog actions={newActions} />);
	expect(containerTwo).toMatchSnapshot();
});

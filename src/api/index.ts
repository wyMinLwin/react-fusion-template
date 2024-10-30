import * as test from "./test";
import * as todo from "./to-do-list";

class API {
	test: typeof test;
	todo: typeof todo;

	constructor() {
		this.test = test;
		this.todo = todo;
	}
}

const api = new API();

export default api;

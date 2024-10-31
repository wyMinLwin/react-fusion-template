import * as test from "./test";
import * as todo from "./to-do-list";
import * as text_to_speech_v from "./text-to-speech-v";
import * as text_to_speech from "./text-to-speech";

class API {
	test: typeof test;
	todo: typeof todo;
	text_to_speech_v: typeof text_to_speech_v;
	text_to_speech: typeof text_to_speech;

	constructor() {
		this.test = test;
		this.todo = todo;
		this.text_to_speech_v = text_to_speech_v;
		this.text_to_speech = text_to_speech;
	}
}

const api = new API();

export default api;

export class CurrentAndPreviousRune<T> {
	#current = $state<T>();
	#previous = $state<T>();

	constructor(current: T) {
		this.reset(current);
	}

	get current() {
		return this.#current;
	}

	get previous() {
		return this.#previous;
	}

	set current(value) {
		this.#previous = this.#current;
		this.#current = value;
	}

	reset(current: T) {
		this.#current = current;
		this.#previous = undefined;
	}
}


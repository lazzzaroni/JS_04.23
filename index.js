// ********************************* Task 1 ********************************* //

class Stack {
  #length;
  #lastElement;
  #isValidInput(arg) {
    return (
      typeof arg == "number" &&
      Number.isFinite(arg) &&
      Number.isSafeInteger(arg) &&
      !Object.is(arg, -0) &&
      arg > 0
    );
  }

  constructor(maxLength = 10) {
    if (!this.#isValidInput(maxLength)) {
      throw new Error("Invalid limit value");
    }
    this.maxLength = maxLength;
    this.#length = 0;
    this.#lastElement = null;
  }

  push(elem) {
    if (this.#length < this.maxLength) {
      const stack = {};
      stack.value = elem;
      stack.previous = this.#lastElement;
      this.#lastElement = stack;
      this.#length++;
    } else {
      throw new Error("Limit exceeded");
    }
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty stack");
    } else {
      const value = this.#lastElement.value;
      this.#lastElement = this.#lastElement.previous;
      this.#length--;

      return value;
    }
  }

  peek() {
    if (this.#lastElement == null) {
      return null;
    }
    return this.#lastElement.value;
  }

  isEmpty() {
    return this.#length == 0;
  }

  toArray() {
    const result = [];

    while (!this.isEmpty()) {
      result.unshift(this.#lastElement.value);
      this.#lastElement = this.#lastElement.previous;
      this.#length--;
    }

    return result;
  }

  static fromIterable(iterable) {
    if (
      iterable == undefined ||
      typeof iterable[Symbol.iterator] != "function"
    ) {
      throw new Error("Not iterable");
    }

    let i = 0;
    for (const _ of iterable) {
      i++;
    }

    const newStack = new Stack(i);

    for (const item of iterable) {
      newStack.push(item);
    }

    return newStack;
  }
}

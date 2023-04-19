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

// ********************************* Task 2 ********************************* //

class LinkedList {
  #tail;
  #createNode(value) {
    return {
      value: value,
      next: null,
    };
  }

  constructor() {
    this.head = null;
    this.length = 0;
    this.#tail = null;
  }

  append(elem) {
    const node = this.#createNode(elem);

    if (this.head == null) {
      this.head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
    this.length++;
  }

  prepend(elem) {
    const node = this.#createNode(elem);

    if (this.head == null) {
      this.head = node;
      this.#tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  find(elem) {
    let current = this.head;

    while (current != null) {
      if (current.value === elem) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }

  toArray() {
    const result = [];
    let current = this.head;

    while (current != null) {
      result.push(current.value);
      current = current.next;
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

    const newLinkedList = new LinkedList();

    for (const item of iterable) {
      newLinkedList.append(item);
    }

    return newLinkedList;
  }
}

// ********************************* Task 3 ********************************* //

class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #damage;
  #currentFuelVolume;
  #isStarted;
  #mileage;
  #health;

  #MAX_STRING_LENGTH = 50;
  #MIN_YEAR = 1950;
  #MIN_SPEED = 100;
  #MAX_SPEED = 330;
  #MIN_FUEL_VOLUME = 20;
  #MAX_FUEL_VOLUME = 100;
  #MIN_DAMAGE = 1;
  #MAX_DAMAGE = 5;
  #MAX_HEALTH = 100;
  #MIN_AMOUNT = 1;

  #isValidNumber(num, minValue, maxValue) {
    return (
      typeof num == "number" &&
      Number.isFinite(num) &&
      Number.isSafeInteger(num) &&
      !Object.is(num, -0) &&
      num >= minValue &&
      num <= maxValue
    );
  }

  #setName(value, errorMessage) {
    const maxLength = this.#MAX_STRING_LENGTH;

    if (!isValidString(value)) {
      throw new Error(errorMessage);
    }

    return value.trim();

    function isValidString(value) {
      return (
        typeof value == "string" &&
        value.trim().length > 0 &&
        value.trim().length <= maxLength
      );
    }
  }

  constructor() {
    this.#brand = "";
    this.#model = "";
    this.#yearOfManufacturing = this.#MIN_YEAR;
    this.#maxSpeed = this.#MIN_SPEED;
    this.#maxFuelVolume = this.#MIN_FUEL_VOLUME;
    this.#fuelConsumption = 1;
    this.#damage = this.#MIN_DAMAGE;
    this.#currentFuelVolume = 0;
    this.#isStarted = false;
    this.#mileage = 0;
    this.#health = this.#MAX_HEALTH;
  }

  get brand() {
    return this.#brand;
  }
  set brand(value) {
    this.#brand = this.#setName(value, "Invalid brand name");
  }
  get model() {
    return this.#model;
  }
  set model(value) {
    this.#model = this.#setName(value, "Invalid model name");
  }
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  set yearOfManufacturing(value) {
    const MIN_YEAR = this.#MIN_YEAR;
    const currentYear = new Date().getFullYear();

    if (!this.#isValidNumber(value, MIN_YEAR, currentYear)) {
      throw new Error("Invalid year of manufacturing");
    }

    this.#yearOfManufacturing = value;
  }
  get maxSpeed() {
    return this.#maxSpeed;
  }
  set maxSpeed(value) {
    const MIN_SPEED = this.#MIN_SPEED;
    const MAX_SPEED = this.#MAX_SPEED;

    if (!this.#isValidNumber(value, MIN_SPEED, MAX_SPEED)) {
      throw new Error("Invalid max speed");
    }

    this.#maxSpeed = value;
  }
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  set maxFuelVolume(value) {
    const MIN_FUEL_VOLUME = this.#MIN_FUEL_VOLUME;
    const MAX_FUEL_VOLUME = this.#MAX_FUEL_VOLUME;

    if (!this.#isValidNumber(value, MIN_FUEL_VOLUME, MAX_FUEL_VOLUME)) {
      throw new Error("Invalid max fuel volume");
    }

    this.#maxFuelVolume = value;
  }
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  set fuelConsumption(value) {
    const MIN_AMOUNT = this.#MIN_AMOUNT;

    if (!this.#isValidNumber(value, MIN_AMOUNT, Number.MAX_SAFE_INTEGER)) {
      throw new Error("Invalid fuel consumption");
    }

    this.#fuelConsumption = value;
  }

  get damage() {
    return this.#damage;
  }
  set damage(value) {
    const MIN_DAMAGE = this.#MIN_DAMAGE;
    const MAX_DAMAGE = this.#MAX_DAMAGE;

    if (!this.#isValidNumber(value, MIN_DAMAGE, MAX_DAMAGE)) {
      throw new Error("Invalid damage");
    }

    this.#damage = value;
  }
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }
  get isStarted() {
    return this.#isStarted;
  }
  get mileage() {
    return this.#mileage;
  }
  get health() {
    return this.#health;
  }

  start() {
    if (this.#isStarted) {
      throw new Error("Car has already started");
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    }

    this.#isStarted = false;
  }

  fillUpGasTank(value) {
    const MIN_AMOUNT = this.#MIN_AMOUNT;

    if (!this.#isValidNumber(value, MIN_AMOUNT, Number.MAX_SAFE_INTEGER)) {
      throw new Error("Invalid fuel amount");
    }
    if (this.#currentFuelVolume + value > this.#maxFuelVolume) {
      throw new Error("Too much fuel");
    }
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }

    this.#currentFuelVolume += value;
  }

  drive(speed, duration) {
    const MIN_AMOUNT = this.#MIN_AMOUNT;
    const HUNDRED_KM = 100;

    if (!this.#isValidNumber(speed, MIN_AMOUNT, Number.MAX_SAFE_INTEGER)) {
      throw new Error("Invalid speed");
    }
    if (!this.#isValidNumber(duration, MIN_AMOUNT, Number.MAX_SAFE_INTEGER)) {
      throw new Error("Invalid duration");
    }
    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    }
    if (!this.#isStarted) {
      throw new Error("You have to start your car first");
    }

    const distance = speed * duration;
    const consumption = distance / HUNDRED_KM;
    const fuelToUse = consumption * this.#fuelConsumption;

    if (fuelToUse > this.#currentFuelVolume) {
      throw new Error("You don't have enough fuel");
    }

    const damage = consumption * this.#damage;

    if (damage > this.#health) {
      throw new Error("Your car won’t make it");
    }

    this.#currentFuelVolume -= fuelToUse;
    this.#health -= damage;
    this.#mileage += distance;
  }

  repair() {
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first");
    }
    if (this.#currentFuelVolume != this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first");
    }

    this.#health = this.#MAX_HEALTH;
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}

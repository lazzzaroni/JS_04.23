// ********************************* Task 1 ********************************* //

function makeDeepCopy(input) {
  // Если отправляемый параметр не является объектом или его нет,
  // функция должна выбрасывать ошибку.
  if (input == null || typeof input != "object") {
    throw new Error();
  }

  function clone(input) {
    if (input == null || typeof input != "object") {
      return input;
    }

    const initOutput = Array.isArray(input) ? [] : {};

    return Object.keys(input).reduce((acc, key) => {
      acc[key] = clone(input[key]);
      return acc;
    }, initOutput);
  }

  return clone(input);
}

// ********************************* Task 2 ********************************* //

function selectFromInterval(arrOfNums, first, second) {
  let result = [];

  if (
    isNotValidArray(arrOfNums) ||
    isNotValidNumber(first) ||
    isNotValidNumber(second)
  ) {
    throw new Error();
  }

  if (first > second) {
    [first, second] = [second, first];
  }

  for (let num of arrOfNums) {
    if (num >= first && num <= second) {
      result.push(num);
    }
  }

  return result;

  //*** Helper Functions ***/

  function isNotValidArray(arr) {
    if (Array.isArray(arr)) {
      if (arr.length == 0) return true;
      return arr.some((item) => typeof item != "number");
    }

    return true;
  }

  function isNotValidNumber(arg) {
    if (typeof arg != "number" || !Number.isFinite(arg)) {
      return true;
    }
    return false;
  }
}

// ********************************* Task 3 ********************************* //

function createIterable(from, to) {
  validateInput(from, to);

  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;

  //*** Helper Function ***/

  function validateInput(arg1, arg2) {
    if (typeof arg1 != "number" || typeof arg2 != "number" || arg2 <= arg1) {
      throw new Error();
    }
  }
}

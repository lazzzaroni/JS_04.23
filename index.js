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

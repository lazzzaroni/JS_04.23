// ********************************* Task 1 ********************************* //

Array.prototype.customFilter = function (fn, obj) {
  const result = [];

  if (isObject(obj)) {
    for (let i = 0; i < this.length; i++) {
      if (fn.apply(obj, [this[i], i, this])) {
        result.push(this[i]);
      }
    }
  } else {
    for (let i = 0; i < this.length; i++) {
      if (fn(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;

  //*** Helper Function ***/
  function isObject(value) {
    return typeof value == "object" && value != null && !Array.isArray(value);
  }
};

// ********************************* Task 2 ********************************* //

function createDebounceFunction() {}

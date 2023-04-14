// ********************************* Task 1 ********************************* //

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...newArgs) {
        return curried.apply(this, args.concat(newArgs));
      };
    }
  };
}

// ********************************* Task 2 ********************************* //

class Calculator {
  constructor(x, y) {
    if (isValidInput(x) && isValidInput(y)) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error();
    }

    //*** Helper Function ***/

    function isValidInput(arg) {
      return (
        typeof arg == "number" && Number.isFinite(arg) && !Object.is(arg, -0)
      );
    }
  }

  setX = (num) => {
    if (typeof num == "number" && Number.isFinite(num) && !Object.is(num, -0)) {
      this.x = num;
    } else {
      throw new Error();
    }
  };

  setY = (num) => {
    if (typeof num == "number" && Number.isFinite(num) && !Object.is(num, -0)) {
      this.y = num;
    } else {
      throw new Error();
    }
  };

  getSum = () => {
    return this.x + this.y;
  };

  getMul = () => {
    return this.x * this.y;
  };

  getSub = () => {
    return Math.abs(this.x - this.y);
  };

  getDiv = () => {
    if (Object.is(this.y, 0)) {
      throw new Error();
    }

    return this.x / this.y;
  };
}

// const fetch = require("node-fetch");

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
    if (Calculator.isValidInput(x) && Calculator.isValidInput(y)) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error();
    }
  }

  setX = (num) => {
    if (Calculator.isValidInput(num)) {
      this.x = num;
    } else {
      throw new Error();
    }
  };

  setY = (num) => {
    if (Calculator.isValidInput(num)) {
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

  //*** Helper Method ***/

  static isValidInput(arg) {
    return (
      typeof arg == "number" && Number.isFinite(arg) && !Object.is(arg, -0)
    );
  }
}

// ********************************* Task 3 ********************************* //

class RickAndMorty {
  getCharacter(id) {
    if (!RickAndMorty.isValidInput(id)) {
      throw new Error();
    }

    const req = fetch(`https://rickandmortyapi.com/api/character/${id}`);

    return req
      .then((res) => {
        if (!res.ok) {
          throw new Error(null);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return e.message;
      });
  }

  async getEpisode(id) {
    if (!RickAndMorty.isValidInput(id)) {
      throw new Error();
    }

    try {
      const req = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);

      if (!req.ok) {
        throw new Error(null);
      }

      const data = await req.json();
      return data;
    } catch (e) {
      return e.message;
    }
  }

  //*** Helper Method ***/

  static isValidInput(arg) {
    return (
      typeof arg == "number" &&
      Number.isFinite(arg) &&
      !Object.is(arg, -0) &&
      arg >= 0
    );
  }
}

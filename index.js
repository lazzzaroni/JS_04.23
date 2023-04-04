// ********************************* Task 1 ********************************* //

let userNum = "";

while (!userNum.match(/^\d+$/g)) {
  if (userNum.length) {
    incorrectInput();
  }

  userNum = prompt("Enter a valid number");

  checkLength(userNum);

  if (userNum.startsWith("0") && userNum.length != 1) {
    userNum = userNum.replace(/^0+/, "");

    if (!userNum.length) {
      userNum = "0";
    }

    console.log("Trim unnecessary zeros at the beginning 😉");
  }
}

/** From this point I'm pretty sure that I'll receive a string
 *  which will be coerced to number correctly => because of that
 *  I'm using double equals in comparisons */

console.log(`Number: ${userNum}
Factorial: ${factorial(userNum)}
Square: ${square(userNum)}
isPrime: ${isPrime(userNum)}
isEven: ${isEven(userNum)}
Delimiters: ${delimiters(userNum)}
`);

//*** Helper Functions ***/

function recursiveFactorial(number) {
  if (number == 0) {
    return 1;
  }
  return number * factorial(number - 1); //! stack overflow from ~10432
}

function factorial(number) {
  if (number == 0 || number == 1) {
    return 1;
  }

  for (let i = number - 1; i >= 1; i--) {
    number *= i;
  }

  return number;
}

function square(number) {
  return number ** 2;
}

function isPrime(number) {
  if (number % 1 || number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) {
      return false;
    }
  }

  return true;
}

function isEven(number) {
  return number % 2 == 0;
}

function delimiters(number) {
  if (number == 0) {
    return "none";
  }

  const delimiters = [];

  if (isPrime(number)) {
    delimiters.push(number, 1);
    return delimiters.join(", ");
  }

  for (let i = number; i >= 1; i--) {
    if (number % i == 0) {
      delimiters.push(i);
    }
  }

  return delimiters.join(", ");
}

// ********************************* Task 2 ********************************* //

let input = "";
let nthTimes = "";

const MAX_NUMBER = 10;
const MAX_LENGTH = 3;

while (!input.match(/[^\s\\]/g)) {
  input = prompt("Enter 1-3 characters (except for whitespace)");

  checkLength(input);

  if (input.length > MAX_LENGTH || input.match(/[^\S\\]/g)) {
    incorrectInput();
    input = "";
  }
}

while (!nthTimes.match(/^\d+$/g)) {
  if (nthTimes.length) {
    incorrectInput();
  }

  nthTimes = prompt("Enter any number from 1 to 10");

  checkLength(nthTimes);

  if (nthTimes.startsWith("0")) {
    nthTimes = nthTimes.replace(/^0+/, "");
    if (!nthTimes.length) {
      incorrectInput();
    }
  }

  if (nthTimes > MAX_NUMBER) {
    incorrectInput();
    nthTimes = "";
  }
}

const row = [];

for (let i = 0; i < nthTimes; i++) {
  row.push(input);
}

console.log(row.join(" ").concat("\n").repeat(nthTimes));

//*** Helper Functions ***/

function incorrectInput() {
  console.log("Incorrect input 🙁");
}

function checkLength(item) {
  if (!item.length) {
    console.log("Input field is empty 😕");
  }
}

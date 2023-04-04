let input = "";

while (!input.match(/^\d+$/g)) {
  if (input.length) {
    console.log("Incorrect input 🙁");
  }

  input = prompt("Enter a valid number");

  if (!input.length) {
    console.log("Input field is empty 😕");
  }

  if (input.startsWith("0") && input.length != 1) {
    input = input.replace(/^0+/, "");

    if (!input.length) {
      input = "0";
    }

    console.log("Trim unnecessary zeros at the beginning 😉");
  }
}

/** From this point I'm pretty sure that I'll receive a string
 *  which will be coerced to number correctly => because of that
 *  I'm using double equals in comparisons */

console.log(`Number: ${input}
Factorial: ${factorial(input)}
Square: ${square(input)}
isPrime: ${isPrime(input)}
isEven: ${isEven(input)}
Delimiters: ${delimiters(input)}
`);

// ********** Helper Functions ********** //

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

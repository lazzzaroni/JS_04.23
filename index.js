const data = document.querySelector(".data");
const error = document.querySelector(".error");

const INIT = " 0";
const NUM_AFTER_DOT = 8;

data.innerText = INIT;

let buffer = INIT;
let runningTotal = 0;
let previousOperator = null;
let isEqualPressed = false;

function buttonClick(value) {
  if (isNaN(parseInt(value)) && value != ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(input) {
  if (isEqualPressed) {
    isEqualPressed = false;
    buffer = INIT;
  }

  if (input == "." && buffer.includes(input)) return;
  if (input == "00" && buffer == INIT) return;

  if (buffer == INIT) {
    if (input == ".") {
      buffer = INIT + ".";
      return;
    }
    buffer = " " + input;
  } else {
    if (buffer.includes(".")) {
      if (buffer.length - buffer.indexOf(".") > NUM_AFTER_DOT) {
        handleError("No more than 8 char after dot");
        return;
      }
    }

    buffer += input;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "c":
      buffer = INIT;
      break;
    case "±":
      handlePlusMinus();
      break;
    case "←":
      handleBackspace();
      break;
    case "÷":
    case "×":
    case "−":
    case "+":
      handleMath(symbol);
      break;
    case "＝":
      handleEqual();
      break;
    default:
      break;
  }
}

function handlePlusMinus() {
  if (buffer == INIT) return;

  let newBuffer = [...buffer];

  if (newBuffer.at(-1) == ".") {
    handleError("Fill number after dot");
    return;
  }

  if (newBuffer[0] != "-") {
    newBuffer[0] = "-";
  } else {
    newBuffer[0] = " ";
  }

  buffer = newBuffer.join("");
}

function handleBackspace() {
  if (buffer.length == INIT.length) {
    buffer = INIT;
  } else {
    buffer = buffer.substring(0, buffer.length - 1);
  }
}

function handleMath(value) {
  if (buffer == INIT) return;
  if (buffer.at(-1) == ".") {
    handleError("Fill number after dot");
    return;
  }

  const intBuffer = parseFloat(buffer);

  if (runningTotal == 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = INIT;
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "÷":
      runningTotal /= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "+":
      runningTotal += intBuffer;
      break;
    default:
      break;
  }

  console.log(runningTotal, "from flushOperation()");
}

function handleEqual() {
  if (previousOperator == null) return;

  flushOperation(parseFloat(buffer));

  buffer = formatResult(runningTotal);
  previousOperator = null;
  runningTotal = 0;
  isEqualPressed = true;
  console.log(buffer);
}

function formatResult(total) {
  let temp = [...total.toString()];

  // check if result have "-" character
  if (temp[0] == "-") {
    // do nothing
  } else {
    temp.unshift(" ");
  }

  // trim result to max length
  if (temp.length >= 18) {
    temp = temp.slice(0, 17);
  }

  temp = temp.join("");

  // trim numbers after dot
  if (temp.includes(".")) {
    if (temp.length - temp.indexOf(".") > NUM_AFTER_DOT) {
      const dot = temp.indexOf(".") + 1;
      const int = temp.substring(0, dot);
      const float = temp.substring(dot, dot + NUM_AFTER_DOT);
      temp = int + float;
    }
  }

  return temp;
}

function rerender() {
  if (buffer.length >= 18) {
    handleError("Max 16 symbols");
    buffer = buffer.substring(0, 17); // don't count " " or "-" symbols
  }
  data.innerText = buffer;
}

function handleError(text) {
  error.innerText = text;
  setTimeout(() => {
    error.innerText = "";
  }, 1500);
}

function init() {
  document.querySelector(".buttons").addEventListener("click", (e) => {
    buttonClick(e.target.innerText);
  });
}

init();

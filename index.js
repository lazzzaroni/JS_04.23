const data = document.querySelector(".data");
const error = document.querySelector(".error");

const INIT = " 0";

data.innerText = INIT;

let buffer = INIT;

function buttonClick(value) {
  if (isNaN(parseInt(value)) && value != ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(input) {
  if (input == "." && buffer.includes(input)) return;
  if (input == "00" && buffer == INIT) return;

  if (buffer == INIT) {
    if (input == ".") {
      buffer = INIT + ".";
      return;
    }
    buffer = " " + input;
  } else {
    buffer += input;
  }
}
function handleSymbol(symbol) {
  console.log("symbol: ", symbol);

  switch (symbol) {
    case "c":
      buffer = INIT;
      break;
    case "±":
      handlePlusMinus();
      break;
    case "←":
      if (buffer.length == INIT.length) {
        buffer = INIT;
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "÷":
    case "×":
    case "−":
    case "+":
      console.log("math operation");
      break;
    case "＝":
      console.log("equals");
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

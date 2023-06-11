const output = document.getElementById("output");
const operators = ["divide", "multiply", "subtract", "add"];
const buttons = {};

let current = 0;
let buffer = 0;
let setMode = "rest";
let hasDecimal = 0;

// Loop through all the numbers to get button element based on ID
for (let i = 0; i <= 9; i++) {
  assignNumbers(i);
}

function assignNumbers(i) {
  const button = document
    .getElementById(String(i))
    .addEventListener("click", () => {
      calculate(i);
    });
  buttons[i] = button;
}

operators.forEach((id) => {
  const button = document
    .getElementById(id)
    .addEventListener("click", (event) => {
      if (setMode != "rest") performOperation();
      setMode = event.target.id;
      hasDecimal = 0;
    });
  buttons[id] = button;
});

const ac = document.getElementById("ac").addEventListener("click", () => {
  current = 0;
  setMode = "rest";
  hasDecimal = 0;
  output.innerText = current;
});

const equals = document
  .getElementById("equals")
  .addEventListener("click", performOperation);

const dot = document.getElementById("dot").addEventListener("click", () => {
  if (hasDecimal > 0) return;
  if (setMode === "rest") output.innerText = current + ".";
  else if (setMode != "rest") output.innerText = buffer + ".";
  hasDecimal++;
});

function calculate(n) {
  if (setMode === "rest") {
    if (current === 0) {
      current = n;
      output.innerText = current;
    } else if (hasDecimal > 0) {
      current += n / 10 ** hasDecimal;
      hasDecimal++;
      output.innerText = current;
    } else {
      current = current * 10 + n;
      output.innerText = current;
    }
  } else {
    // Handles 2nd number
    if (buffer == 0) {
      buffer = n;
      output.innerText = buffer;
    } else if (hasDecimal > 0) {
      buffer += n / 10 ** hasDecimal;
      hasDecimal++;
      output.innerText = buffer;
    } else {
      buffer = buffer * 10 + n;
      output.innerText = buffer;
    }
  }
}

function performOperation() {
  if (setMode === "divide") {
    current = current / buffer;
  } else if (setMode === "multiply") {
    current = current * buffer;
  } else if (setMode === "subtract") {
    current = current - buffer;
  } else if (setMode === "add") {
    current = current + buffer;
  }
  buffer = 0;
  setMode = "rest";
  current = Math.round((current + Number.EPSILON) * 1e10) / 1e10;
  output.innerText = current;
}

"use strict";

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const deleteAllButton = document.querySelector("[data-delete-all]");
const equalButton = document.querySelector("[data-equal]");
const previousTextElement = document.querySelector("[data-upper-display]");
const currentTextElement = document.querySelector("[data-lower-display]");

class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  clear() {
    this.currentText = "";
    this.previousText = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentText = this.currentText.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if ((number === ".") & this.currentText.includes(".")) return;
    this.currentText = this.currentText.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentText === "") return;
    if (this.previousText !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousText = this.currentText;
    this.currentText = "";
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousText);
    const current = parseFloat(this.currentText);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentText = computation;
    this.operation = undefined;
    this.previousText = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.currentText;
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.previousText} ${this.operation}`;
    } else {
      this.previousTextElement.innerText = this.previousText;
    }
  }
}

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

deleteAllButton.addEventListener("click", () => {
  calculator.clear();
});

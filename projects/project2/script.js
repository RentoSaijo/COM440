'use strict';

// Page elements ----------------------------------------------------------

const setup           = document.querySelector('#setup');
const challenge       = document.querySelector('#challenge');
const feedback        = document.querySelector('#feedback');
const sizeForm        = document.querySelector('#size-form');
const sizeInput       = document.querySelector('#size');
const sizeError       = document.querySelector('#size-error');
const answerForm      = document.querySelector('#answer-form');
const tableContainer  = document.querySelector('#table-container');
const secondsLeft     = document.querySelector('#seconds-left');
const feedbackMessage = document.querySelector('#feedback-message');

// Round state ------------------------------------------------------------

let roundActive    = false;
let expectedAnswer = 0;
let answerInput    = null;
let deadline       = 0;
let countdownId    = null;

// Table ------------------------------------------------------------------

// Build multiplication table.
function buildTable(size, questionRow, questionColumn) {
  const table      = document.createElement('table');
  const caption    = document.createElement('caption');
  const head       = document.createElement('thead');
  const headRow    = document.createElement('tr');
  const corner     = document.createElement('th');
  const body       = document.createElement('tbody');
  let questionInput = null;
  caption.textContent = `${size} by ${size} multiplication table`;
  corner.scope = 'col';
  corner.textContent = '×';
  headRow.append(corner);
  for (let column = 1; column <= size; column += 1) {
    const header = document.createElement('th');
    header.scope = 'col';
    header.textContent = column;
    headRow.append(header);
  }
  head.append(headRow);
  for (let row = 1; row <= size; row += 1) {
    const tableRow = document.createElement('tr');
    const header = document.createElement('th');
    header.scope = 'row';
    header.textContent = row;
    tableRow.append(header);
    for (let column = 1; column <= size; column += 1) {
      const cell = document.createElement('td');
      cell.className = (row + column) % 2 === 0 ? 'product-red' : 'product-blue';
      if (row === questionRow && column === questionColumn) {
        questionInput = document.createElement('input');
        questionInput.className = 'answer';
        questionInput.type = 'number';
        questionInput.min = '0';
        questionInput.step = '1';
        questionInput.inputMode = 'numeric';
        questionInput.autocomplete = 'off';
        questionInput.placeholder = '?';
        questionInput.setAttribute('aria-label', `Missing answer for ${row} times ${column}`);
        cell.append(questionInput);
      } else {
        cell.textContent = row * column;
      }
      tableRow.append(cell);
    }
    body.append(tableRow);
  }
  table.append(caption, head, body);
  return { table, questionInput };
}

// Challenge --------------------------------------------------------------

// Start challenge.
function startRound(event) {
  event.preventDefault();
  const rawSize = sizeInput.value.trim();
  const size = Number(rawSize);
  if (!/^\d+$/.test(rawSize) || size < 1 || size > 20) {
    sizeError.hidden = false;
    sizeInput.focus();
    return;
  }
  sizeError.hidden = true;
  const questionIndex = Math.floor(Math.random() * size * size);
  const questionRow = Math.floor(questionIndex / size) + 1;
  const questionColumn = questionIndex % size + 1;
  const built = buildTable(size, questionRow, questionColumn);
  expectedAnswer = questionRow * questionColumn;
  answerInput = built.questionInput;
  tableContainer.replaceChildren(built.table);
  secondsLeft.textContent = size;
  setup.hidden = true;
  feedback.hidden = true;
  challenge.hidden = false;
  roundActive = true;
  deadline = performance.now() + size * 1000;
  countdownId = window.setInterval(updateCountdown, 100);
  answerInput.focus();
}

// Update countdown.
function updateCountdown() {
  if (!roundActive) return;
  const millisecondsLeft = deadline - performance.now();
  secondsLeft.textContent = Math.max(0, Math.ceil(millisecondsLeft / 1000));
  if (millisecondsLeft <= 0) finishRound();
}

// Check answer.
function finishRound() {
  if (!roundActive) return;
  roundActive = false;
  window.clearInterval(countdownId);
  countdownId = null;
  const response = answerInput.value.trim();
  if (response === '') {
    feedbackMessage.textContent = 'You need to enter a number. Try again.';
  } else if (!/^-?\d+$/.test(response)) {
    feedbackMessage.textContent = 'Enter a whole number. Try again.';
  } else if (Number(response) === expectedAnswer) {
    feedbackMessage.textContent = 'Correct!';
  } else {
    feedbackMessage.textContent = `The correct answer was ${expectedAnswer}. Try again.`;
  }
  tableContainer.replaceChildren();
  challenge.hidden = true;
  feedback.hidden = false;
  feedbackMessage.focus();
  window.setTimeout(resetRound, 2000);
}

// Restore size form.
function resetRound() {
  feedback.hidden = true;
  setup.hidden = false;
  sizeInput.focus();
}

// Events -----------------------------------------------------------------

// Create challenge from size form.
sizeForm.addEventListener('submit', startRound);

// Check answer from button or Enter key.
answerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  finishRound();
});

// Clear size error after edit.
sizeInput.addEventListener('input', () => {
  sizeError.hidden = true;
});

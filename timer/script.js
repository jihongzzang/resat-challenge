let countdown;

let isRunning = false;

document.querySelectorAll('.time-display').forEach((input) => {
  input.addEventListener('input', handleInput);
});

function handleInput(event) {
  const input = event.target;

  const value = input.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자는 제거

  input.value = value.slice(-1); // 마지막 숫자만 남김

  toggleButtons();
}

function increment(unit) {
  let tenUnit = document.getElementById('ten' + capitalize(unit));
  let singleUnit = document.getElementById(unit);
  let tenValue = parseInt(tenUnit.value);
  let singleValue = parseInt(singleUnit.value);

  singleValue++;

  if (singleValue >= 10) {
    singleValue = 0;
    tenValue++;

    if (unit === 'hours' && tenValue >= 10 && singleUnit.value >= 0) {
      tenValue = 0;
      singleValue = 0;
    }

    if (unit === 'hours' && tenValue >= 10) {
      tenValue = 0;
      singleValue = 0;
    } else if (unit !== 'hours' && tenValue >= 6) {
      tenValue = 0;
    }
  }

  tenUnit.value = tenValue;
  singleUnit.value = singleValue;
  toggleButtons();
}

function decrement(unit) {
  let tenUnit = document.getElementById('ten' + capitalize(unit));
  let singleUnit = document.getElementById(unit);
  let tenValue = parseInt(tenUnit.value);
  let singleValue = parseInt(singleUnit.value);

  singleValue--;

  if (singleValue < 0) {
    singleValue = 9;
    tenValue--;

    if (unit === 'hours' && tenValue < 0) {
      tenValue = 9;
      singleValue = 9;
    } else if (unit !== 'hours' && tenValue < 0) {
      tenValue = 5;
    }
  }

  tenUnit.value = tenValue;
  singleUnit.value = singleValue;
  toggleButtons();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function startTimer() {
  if (isRunning || isTimerZero()) return;

  const tenHoursInput = document.getElementById('tenHours');
  const hoursInput = document.getElementById('hours');
  const tenMinutesInput = document.getElementById('tenMinutes');
  const minutesInput = document.getElementById('minutes');
  const tenSecondsInput = document.getElementById('tenSeconds');
  const secondsInput = document.getElementById('seconds');

  const hours = (parseInt(tenHoursInput.value) || 0) * 10 + (parseInt(hoursInput.value) || 0);
  const minutes = (parseInt(tenMinutesInput.value) || 0) * 10 + (parseInt(minutesInput.value) || 0);
  const seconds = (parseInt(tenSecondsInput.value) || 0) * 10 + (parseInt(secondsInput.value) || 0);

  let totalTime = hours * 3600 + minutes * 60 + seconds;

  if (totalTime <= 0) return;

  isRunning = true;

  toggleArrows(true);
  inputDisabled(true);
  arrowButtonsWrapperHide(true);
  toggleButtons();

  countdown = setInterval(() => {
    console.log(totalTime);
    if (totalTime <= 0) {
      clearInterval(countdown);
      isRunning = false;
      toggleArrows(false);
      inputDisabled(false);
      arrowButtonsWrapperHide(false);
      toggleButtons();
      return;
    }

    totalTime--;

    displayTime(totalTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(countdown);
  isRunning = false;
  toggleArrows(false);
  inputDisabled(false);
  arrowButtonsWrapperHide(false);
  toggleButtons();
}

function resetTimer() {
  clearInterval(countdown);

  isRunning = false;

  document.getElementById('tenHours').value = '0';
  document.getElementById('hours').value = '0';
  document.getElementById('tenMinutes').value = '0';
  document.getElementById('minutes').value = '0';
  document.getElementById('tenSeconds').value = '0';
  document.getElementById('seconds').value = '0';

  toggleArrows(false);
  inputDisabled(false);
  arrowButtonsWrapperHide(false);
  toggleButtons();
}

function displayTime(totalTime) {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  document.getElementById('tenHours').value = String(Math.floor(hours / 10));
  document.getElementById('hours').value = String(hours % 10);
  document.getElementById('tenMinutes').value = String(Math.floor(minutes / 10));
  document.getElementById('minutes').value = String(minutes % 10);
  document.getElementById('tenSeconds').value = String(Math.floor(seconds / 10));
  document.getElementById('seconds').value = String(seconds % 10);
}

function toggleArrows(disable) {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach((arrow) => {
    arrow.disabled = disable;
  });
}

function inputDisabled(readonly) {
  const inputs = document.querySelectorAll('.time-display');
  inputs.forEach((input) => {
    if (readonly) {
      input.setAttribute('readonly', 'readonly');
    } else {
      input.removeAttribute('readonly');
    }
  });
}

function arrowButtonsWrapperHide(hide) {
  const arrowButtonsWrapper = document.querySelectorAll('.arrow-buttons-wrraper');
  arrowButtonsWrapper.forEach((wrraper) => {
    if (hide) {
      wrraper.style.display = 'none';
    } else {
      wrraper.style.display = 'flex';
    }
  });
}

function isTimerZero() {
  const tenHours = parseInt(document.getElementById('tenHours').value);
  const hours = parseInt(document.getElementById('hours').value);
  const tenMinutes = parseInt(document.getElementById('tenMinutes').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const tenSeconds = parseInt(document.getElementById('tenSeconds').value);
  const seconds = parseInt(document.getElementById('seconds').value);

  return tenHours === 0 && hours === 0 && tenMinutes === 0 && minutes === 0 && tenSeconds === 0 && seconds === 0;
}

function toggleButtons() {
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  const resetButton = document.getElementById('reset-button');

  const isDisabled = isTimerZero();

  startButton.disabled = isDisabled || isRunning;
  stopButton.disabled = isDisabled || !isRunning;
  resetButton.disabled = isDisabled;
}

toggleButtons();

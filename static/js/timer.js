document.addEventListener('DOMContentLoaded', function () {

  var timer = parseInt(localStorage.getItem('timerValue')) || 0;
  var timerInterval; 
  var isRunning = false; 

  var numname = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  function updateTimer() {
    timer++;

    var hours = Math.floor(timer / 3600);
    var minutes = Math.floor((timer % 3600) / 60);
    var seconds = timer % 60;

    document.getElementById('hour-tens').className = 'digit ' + numname[Math.floor(hours / 10)];
    document.getElementById('hour-ones').className = 'digit ' + numname[hours % 10];
    document.getElementById('minute-tens').className = 'digit ' + numname[Math.floor(minutes / 10)];
    document.getElementById('minute-ones').className = 'digit ' + numname[minutes % 10];
    document.getElementById('second-tens').className = 'digit ' + numname[Math.floor(seconds / 10)];
    document.getElementById('second-ones').className = 'digit ' + numname[seconds % 10];
    
    localStorage.setItem('timerValue', timer.toString());
  }

  function toggleTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      startStopButton.textContent = 'Start';
    } else {
      timerInterval = setInterval(updateTimer, 1000);
      startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning; 
  }

  var startStopButton = document.getElementById('startStopButton');
  if (startStopButton) {
    startStopButton.addEventListener('click', toggleTimer);
  }

  function resetTimer() {
    timer = 0;

    document.getElementById('hour-tens').className = 'digit zero';
    document.getElementById('hour-ones').className = 'digit zero';
    document.getElementById('minute-tens').className = 'digit zero';
    document.getElementById('minute-ones').className = 'digit zero';
    document.getElementById('second-tens').className = 'digit zero';
    document.getElementById('second-ones').className = 'digit zero';
    
    localStorage.removeItem('timerValue');
  }

  var resetButton = document.getElementById('resetButton');
  if (resetButton) {
    resetButton.addEventListener('click', resetTimer);
  }

  if (isRunning) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});



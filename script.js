document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded and DOM ready.");

  const girl = document.querySelector(".girl-frame");
  const girlFrames = [
    "assets/movingobject/girl1.png",
    "assets/movingobject/girl2.png",
    "assets/movingobject/girl1.png"
  ];
  let girlIndex = 0;

  setInterval(() => {
    girl.src = girlFrames[girlIndex];
    girlIndex = (girlIndex + 1) % girlFrames.length;
  }, 380);


  const rabit = document.querySelector(".rabit");
  const rabitFrames = [
    "assets/movingobject/rabit1.png",
    "assets/movingobject/rabit2.png"
  ];
  let rabitIndex = 0;

  setInterval(() => {
    rabit.src = rabitFrames[rabitIndex];
    rabitIndex = (rabitIndex + 1) % rabitFrames.length;
  }, 400);

  const timeDisplay = document.getElementById("time");
  const modeDisplay = document.querySelector(".mode");
  const playBtn = document.getElementById("play-btn");
  const resetBtn = document.getElementById("reset-btn");

  const pomoPlus = document.querySelector(".pomo-plus");
  const pomoMinus = document.querySelector(".pomo-minus");
  const breakPlus = document.querySelector(".break-plus");
  const breakMinus = document.querySelector(".break-minus");
  const pomoValue = document.querySelector(".pomo-value");
  const breakValue = document.querySelector(".break-value");

  let focusTime = 25 * 60;
  let breakTime = 5 * 60;
  let timeLeft = focusTime;
  let isRunning = false;
  let isFocusMode = true;
  let timerInterval;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
    modeDisplay.textContent = isFocusMode ? "FOCUS" : "BREAK";
  }

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    playBtn.textContent = "▶";
    isRunning = false;
    return;
  }

  playBtn.textContent = "⏸";
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      
      const endSound = new Audio("assets/sounds/notify.mp3");
      endSound.play();

      const customMessage = document.getElementById("customMessage");
      const customMessageText = document.getElementById("customMessageText");
      const customOkButton = document.getElementById("customOkButton");
      const closeMessage = document.getElementById("closeMessage");

      
      customMessageText.textContent = isFocusMode
        ? "Great! Time for a break!"
        : "Break is over! Back to focus!";

      customMessage.style.display = "flex";

      
      const switchMode = () => {
        customMessage.style.display = "none";       
        isFocusMode = !isFocusMode;                 
        timeLeft = isFocusMode ? focusTime : breakTime; 
        updateDisplay();
        toggleTimer();                              
      };
      customOkButton.onclick = switchMode;
      closeMessage.onclick = switchMode;
    }
  }, 1000);

  isRunning = true;
}

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isFocusMode = true;
    timeLeft = focusTime;
    playBtn.textContent = "▶";
    updateDisplay();
  }

  pomoPlus.addEventListener("click", () => {
    focusTime += 60;
    pomoValue.textContent = focusTime / 60;
    if (isFocusMode && !isRunning) timeLeft = focusTime;
    updateDisplay();
  });

  pomoMinus.addEventListener("click", () => {
    if (focusTime > 60) {
      focusTime -= 60;
      pomoValue.textContent = focusTime / 60;
      if (isFocusMode && !isRunning) timeLeft = focusTime;
      updateDisplay();
    }
  });

  breakPlus.addEventListener("click", () => {
    breakTime += 60;
    breakValue.textContent = breakTime / 60;
    if (!isFocusMode && !isRunning) timeLeft = breakTime;
    updateDisplay();
  });

  breakMinus.addEventListener("click", () => {
    if (breakTime > 60) {
      breakTime -= 60;
      breakValue.textContent = breakTime / 60;
      if (!isFocusMode && !isRunning) timeLeft = breakTime;
      updateDisplay();
    }
  });

  playBtn.addEventListener("click", toggleTimer);
  resetBtn.addEventListener("click", resetTimer);
  updateDisplay();
});







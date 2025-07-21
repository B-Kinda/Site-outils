const navigation = document.querySelector("nav");
let timerInterval;
let elapsedTime = 0;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const chronoDisplay = document.getElementById("chronoDisplay");
// const miliseconds = Math.floor((ms / 10000) % 60);
// const seconds = Math.floor((ms / 1000) % 60);
// const minutes = Math.floor((ms / (1000 * 60)) % 60);
// const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    navigation.style.position = "fixed";
    navigation.style.top = "0";
    navigation.style.left = "0";
    navigation.style.right = "0";
  } else {
    navigation.style.top = "-50px";
  }
});
function formatTime(ms) {
  const miliseconds = Math.floor((ms / 1) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(
    2,
    "0"
  )}`;
}
startButton.addEventListener("click", () => {
  const startTime = Date.now() - elapsedTime;
  startButton.style.display = "none";
  stopButton.style.display = "block";
  resetButton.style.display = "block";
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    chronoDisplay.textContent = formatTime(elapsedTime);
  }, 1000);
});
stopButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  startButton.style.display = "block";
  stopButton.style.display = "none";
});
resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  chronoDisplay.textContent = "00:00:00";
  startButton.style.display = "block";
  stopButton.style.display = "none";
  resetButton.style.display = "none";
});

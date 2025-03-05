let timer;
let isRunning = false;
let isPaused = false;
let seconds = 0;

const display = document.getElementById("display");
const startStopBtn = document.querySelector(".start-stop");
const pauseResumeBtn = document.querySelector(".pause-resume");
const resetBtn = document.querySelector(".reset");
const taskInput = document.querySelector(".task-input");
const taskList = document.getElementById("task-list");

function updateDisplay() {
  let hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
  let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  let secs = (seconds % 60).toString().padStart(2, "0");
  display.textContent = `${hrs}:${mins}:${secs}`;
}

function startStopTimer() {
  if (!isRunning) {
    // **Mulai Timer**
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    
    isRunning = true;
    isPaused = false;

    // Perbarui tampilan tombol
    startStopBtn.innerHTML = '<i class="fas fa-stop"></i> Berhenti';
    pauseResumeBtn.disabled = false; // Aktifkan tombol "Pause"
    resetBtn.disabled = false; // Aktifkan tombol Reset
  } else {
    // **Berhenti Timer & Simpan ke Histori**
    clearInterval(timer);
    isRunning = false;
    isPaused = false;

    // Simpan ke histori jika ada input tugas
    if (taskInput.value.trim() !== "") {
      addTaskToHistory(taskInput.value, display.textContent);
      taskInput.value = ""; // Kosongkan input setelah disimpan
    }

    // Reset Timer
    resetTimer();
  }
}

function pauseResumeTimer() {
  if (isPaused) {
    // **Lanjutkan Timer**
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  } else {
    // **Pause Timer**
    clearInterval(timer);
    pauseResumeBtn.innerHTML = '<i class="fas fa-play"></i> Lanjut';
  }
  isPaused = !isPaused;
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  isRunning = false;
  isPaused = false;
  updateDisplay();

  // Kembalikan tampilan tombol
  startStopBtn.innerHTML = '<i class="fas fa-play"></i> Mulai';
  pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  pauseResumeBtn.disabled = true;
  resetBtn.disabled = true; // Matikan tombol Reset
}

// Fungsi menambahkan tugas ke histori
function addTaskToHistory(taskName, duration) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `
    <span>${taskName} - ${duration}</span>
    <div class="task-buttons">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </div>
  `;

  // Event untuk menghapus tugas
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  // Event untuk mengedit tugas
  li.querySelector(".edit-btn").addEventListener("click", () => {
    const newTaskName = prompt("Edit Nama Tugas:", taskName);
    if (newTaskName) {
      li.querySelector("span").textContent = `${newTaskName} - ${duration}`;
    }
  });

  taskList.appendChild(li);
}

// Event Listeners
startStopBtn.addEventListener("click", startStopTimer);
pauseResumeBtn.addEventListener("click", pauseResumeTimer);
resetBtn.addEventListener("click", resetTimer);

// Set tampilan awal
updateDisplay();
pauseResumeBtn.disabled = true;
resetBtn.disabled = true;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("Service Worker Failed", err));
}

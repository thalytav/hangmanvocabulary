// ========== VOCABULARY DATA (Embedded) ==========
const vocabularyData = {
  vocabulary: [
    { id: 1, category: "Rumah", indonesian: "Ruang Keluarga", english: "living room", difficulty: "beginner" },
    { id: 2, category: "Rumah", indonesian: "Kamar Tidur", english: "bedroom", difficulty: "beginner" },
    { id: 3, category: "Rumah", indonesian: "Dapur", english: "kitchen", difficulty: "beginner" },
    { id: 4, category: "Rumah", indonesian: "Kamar Mandi", english: "bathroom", difficulty: "beginner" },
    { id: 5, category: "Rumah", indonesian: "Ruang Makan", english: "dining room", difficulty: "intermediate" },
    { id: 6, category: "Rumah", indonesian: "Ruang Belajar", english: "study room", difficulty: "intermediate" },
    { id: 7, category: "Rumah", indonesian: "Garasi Mobil", english: "garage", difficulty: "beginner" },
    { id: 8, category: "Sekolah", indonesian: "Kelas", english: "classroom", difficulty: "beginner" },
    { id: 9, category: "Sekolah", indonesian: "Perpustakaan", english: "library", difficulty: "beginner" },
    { id: 10, category: "Sekolah", indonesian: "Kantin Sekolah", english: "school cafeteria", difficulty: "intermediate" },
    { id: 11, category: "Sekolah", indonesian: "Lapangan Olahraga", english: "sports field", difficulty: "intermediate" },
    { id: 12, category: "Sekolah", indonesian: "Laboratorium", english: "laboratory", difficulty: "advanced" },
    { id: 13, category: "Makanan", indonesian: "Apel", english: "apple", difficulty: "beginner" },
    { id: 14, category: "Makanan", indonesian: "Pisang", english: "banana", difficulty: "beginner" },
    { id: 15, category: "Makanan", indonesian: "Steak Daging", english: "steak", difficulty: "beginner" },
    { id: 16, category: "Makanan", indonesian: "Sup Ayam", english: "chicken soup", difficulty: "intermediate" },
    { id: 17, category: "Makanan", indonesian: "Kopi Panas", english: "hot coffee", difficulty: "intermediate" },
    { id: 18, category: "Makanan", indonesian: "Roti Tawar", english: "bread", difficulty: "beginner" },
    { id: 19, category: "Binatang", indonesian: "Kucing", english: "cat", difficulty: "beginner" },
    { id: 20, category: "Binatang", indonesian: "Anjing", english: "dog", difficulty: "beginner" },
    { id: 21, category: "Binatang", indonesian: "Burung Beo", english: "parrot", difficulty: "intermediate" },
    { id: 22, category: "Binatang", indonesian: "Ikan Mas", english: "goldfish", difficulty: "intermediate" },
    { id: 23, category: "Binatang", indonesian: "Gajah", english: "elephant", difficulty: "beginner" },
    { id: 24, category: "Pekerjaan", indonesian: "Dokter", english: "doctor", difficulty: "beginner" },
    { id: 25, category: "Pekerjaan", indonesian: "Guru Sekolah", english: "teacher", difficulty: "beginner" },
    { id: 26, category: "Pekerjaan", indonesian: "Insinyur", english: "engineer", difficulty: "intermediate" },
    { id: 27, category: "Pekerjaan", indonesian: "Desainer Grafis", english: "graphic designer", difficulty: "advanced" },
    { id: 28, category: "Pekerjaan", indonesian: "Programmer Komputer", english: "programmer", difficulty: "intermediate" },
    { id: 29, category: "Warna", indonesian: "Merah", english: "red", difficulty: "beginner" },
    { id: 30, category: "Warna", indonesian: "Biru", english: "blue", difficulty: "beginner" },
    { id: 31, category: "Warna", indonesian: "Kuning", english: "yellow", difficulty: "beginner" },
    { id: 32, category: "Warna", indonesian: "Hijau", english: "green", difficulty: "beginner" },
    { id: 33, category: "Warna", indonesian: "Ungu Tua", english: "purple", difficulty: "intermediate" }
  ]
};

// ========== GAME STATE ==========
let allVocabulary = [];
let currentWord = {};
let correctLetters = [];
let wrongLetters = [];
let playable = true;
let hintUsed = false;

// ========== DOM ELEMENTS ==========
const wordElement = document.getElementById("word");
const hintText = document.getElementById("hint-text");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const hintButton = document.getElementById("hint-button");
const skipButton = document.getElementById("skip-button");
const notification = document.getElementById("notification-container");
const notificationText = document.getElementById("notification-text");
const figureParts = document.querySelectorAll(".figure-part");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");
const answerText = document.getElementById("answer-text");
const keyboardContainer = document.getElementById("keyboard-container");
const correctCountSpan = document.getElementById("correct-count");
const wrongCountSpan = document.getElementById("wrong-count");
const categoryNameSpan = document.getElementById("category-name");
const difficultyBadge = document.getElementById("difficulty-badge");

// ========== INITIALIZE VOCABULARY ==========
function initializeVocabulary() {
  allVocabulary = vocabularyData.vocabulary;
  console.log(`Vocabulary loaded: ${allVocabulary.length} words`);
  initGame();
}

// ========== INITIALIZE GAME ==========
function initGame() {
  playable = true;
  correctLetters = [];
  wrongLetters = [];
  hintUsed = false;

  // Select random word
  currentWord = allVocabulary[Math.floor(Math.random() * allVocabulary.length)];
  const englishWord = currentWord.english.toLowerCase();

  console.log(`Word: ${englishWord}, Hint: ${currentWord.indonesian}`);

  // Create keyboard
  createKeyboard(englishWord);

  // Update UI
  hintText.innerText = currentWord.indonesian;
  categoryNameSpan.innerText = currentWord.category;
  difficultyBadge.innerText = currentWord.difficulty.charAt(0).toUpperCase() + currentWord.difficulty.slice(1);

  messageBox.style.display = "none";
  displayWord();
  updateWrongLettersElement();
  hintButton.disabled = false;
  skipButton.disabled = false;
}

// ========== CREATE DYNAMIC KEYBOARD ==========
function createKeyboard(word) {
  keyboardContainer.innerHTML = "";
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.innerText = letter.toUpperCase();
    button.classList.add("key-button");
    button.addEventListener("click", () => guessLetter(letter, button));
    keyboardContainer.appendChild(button);
  });
}

// ========== GUESS LETTER ==========
function guessLetter(letter, buttonElement) {
  if (!playable) return;

  const englishWord = currentWord.english.toLowerCase();

  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    showNotification("Huruf sudah digunakan sebelumnya!");
    return;
  }

  // Disable button
  buttonElement.disabled = true;

  if (englishWord.includes(letter)) {
    // Correct guess
    correctLetters.push(letter);
    buttonElement.style.background = "#1dd1a1";
    displayWord();
  } else {
    // Wrong guess
    wrongLetters.push(letter);
    buttonElement.style.background = "#e94560";
    updateWrongLettersElement();
  }

  checkGameStatus();
}

// ========== DISPLAY WORD ==========
function displayWord() {
  const englishWord = currentWord.english.toLowerCase();

  wordElement.innerHTML = englishWord
    .split("")
    .map((char) => {
      if (char === " ") {
        // Space is always visible
        return `<span class="letter" style="border: none; background: transparent;"> </span>`;
      } else if (correctLetters.includes(char)) {
        return `<span class="letter">${char}</span>`;
      } else {
        return `<span class="letter"></span>`;
      }
    })
    .join("");

  // Check win condition
  const uniqueLetters = [...new Set(englishWord.split("").filter((char) => char !== " "))];
  const visibleLetters = uniqueLetters.filter((char) => correctLetters.includes(char));

  if (visibleLetters.length === uniqueLetters.length) {
    wonGame();
  }
}

// ========== UPDATE WRONG LETTERS DISPLAY ==========
function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = wrongLetters.map((letter) => `<span>${letter}</span>`).join("");

  // Update figure
  figureParts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? "block" : "none";
  });

  wrongCountSpan.innerText = wrongLetters.length;

  // Check lose condition
  if (wrongLetters.length === figureParts.length) {
    lostGame();
  }
}

// ========== CHECK GAME STATUS ==========
function checkGameStatus() {
  if (playable) {
    const englishWord = currentWord.english.toLowerCase();
    const uniqueLetters = [...new Set(englishWord.split("").filter((char) => char !== " "))];
    const visibleLetters = uniqueLetters.filter((char) => correctLetters.includes(char));

    // Update correct count
    correctCountSpan.innerText = correctLetters.length;

    // Check win
    if (visibleLetters.length === uniqueLetters.length) {
      wonGame();
    }

    // Check lose
    if (wrongLetters.length === figureParts.length) {
      lostGame();
    }
  }
}

// ========== WON GAME ==========
function wonGame() {
  playable = false;
  messageBox.style.display = "block";
  messageText.innerText = "🎉 Selamat! Kamu Menang!";
  answerText.innerText = `Jawaban: ${currentWord.english.toUpperCase()}`;
  messageBox.style.background = "rgba(29, 209, 161, 0.3)";
  messageBox.style.borderColor = "#1dd1a1";
  messageText.style.color = "#1dd1a1";
  disableAllButtons();
}

// ========== LOST GAME ==========
function lostGame() {
  playable = false;
  messageBox.style.display = "block";
  messageText.innerText = "😞 Game Over!";
  answerText.innerText = `Jawaban: ${currentWord.english.toUpperCase()}`;
  messageBox.style.background = "rgba(233, 69, 96, 0.3)";
  messageBox.style.borderColor = "#e94560";
  messageText.style.color = "#e94560";
  disableAllButtons();
}

// ========== DISABLE ALL BUTTONS ==========
function disableAllButtons() {
  document.querySelectorAll(".key-button").forEach((btn) => {
    btn.disabled = true;
  });
}

// ========== SHOW NOTIFICATION ==========
function showNotification(message) {
  notificationText.innerText = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// ========== HINT BUTTON ==========
hintButton.addEventListener("click", () => {
  if (!playable) return;

  if (hintUsed) {
    showNotification("Kamu sudah menggunakan hint!");
    return;
  }

  // Get unused letters
  const englishWord = currentWord.english.toLowerCase();
  const unusedLetters = englishWord
    .split("")
    .filter((char) => char !== " " && !correctLetters.includes(char) && !wrongLetters.includes(char));

  if (unusedLetters.length === 0) {
    showNotification("Tidak ada hint lagi!");
    return;
  }

  // Auto-reveal a random unused letter
  const randomLetter = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
  correctLetters.push(randomLetter);
  hintUsed = true;

  // Disable the hint button after first use
  hintButton.disabled = true;
  hintButton.style.opacity = "0.5";

  // Update keyboard button color
  document.querySelectorAll(".key-button").forEach((btn) => {
    if (btn.innerText.toLowerCase() === randomLetter) {
      btn.disabled = true;
      btn.style.background = "#f39c12";
      btn.innerText += " (Hint)";
    }
  });

  displayWord();
  showNotification(`Hint: Huruf ${randomLetter.toUpperCase()} sudah dibuka!`);
  checkGameStatus();
});

// ========== SKIP BUTTON ==========
skipButton.addEventListener("click", () => {
  if (!playable) return;
  showNotification("Melanjutkan ke kata berikutnya...");
  setTimeout(() => {
    initGame();
  }, 1000);
});

// ========== PLAY AGAIN BUTTON ==========
playAgainButton.addEventListener("click", () => {
  initGame();
});

// ========== KEYBOARD EVENT LISTENER ==========
window.addEventListener("keypress", (e) => {
  if (!playable) return;

  const letter = e.key.toLowerCase();
  if (letter >= "a" && letter <= "z") {
    // Find and click the corresponding button
    const buttons = document.querySelectorAll(".key-button");
    buttons.forEach((btn) => {
      if (btn.innerText.toLowerCase() === letter && !btn.disabled) {
        btn.click();
      }
    });
  }
});

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  initializeVocabulary();
});

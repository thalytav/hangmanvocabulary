/* ============================================================
   Tebak Kata — Hangman Kosakata Indonesia/Inggris
   jQuery. Data: assets/data/data.js  (KATEGORI, KOSAKATA)
   ============================================================ */

$(function () {
  "use strict";

  // ---------- Konstanta ----------
  const MAX_WRONG = 6;        // jumlah bagian figur = 6
  const TIME_PER_WORD = 30;   // detik per kata
  const SESSION_WORDS = 10;   // jumlah kata per sesi

  // ---------- State ----------
  const state = {
    catId: "all",        // "all" atau id kategori
    pool: [],            // daftar kata untuk sesi
    queue: [],           // antrian kata tersisa
    current: null,       // { tampil, target, arahTebak, kategori }
    correct: [],         // huruf benar (lowercase)
    wrong: [],           // huruf salah (lowercase)
    score: 0,
    streak: 0,
    answered: 0,
    won: 0,
    playable: false,
    timer: null,
    timeLeft: TIME_PER_WORD,
  };

  // ---------- Cache elemen ----------
  const $screenStart = $("#screen-start");
  const $screenGame  = $("#screen-game");
  const $catGrid     = $("#cat-grid");
  const $word        = $("#word");
  const $wrong       = $("#wrong-letters");
  const $keyboard    = $("#keyboard");
  const $figureParts = $(".figure-part");
  const $lives       = $("#lives");

  // =========================================================
  //  LAYAR MULAI — kategori
  // =========================================================
  function buildCategories() {
    const buttons = [`<button class="cat-btn selected" data-id="all">🌟 Semua</button>`];
    const ikon = { 1: "🏠", 2: "🍔", 3: "🏫", 4: "🏢", 5: "🚦" };
    KATEGORI.forEach((c) => {
      buttons.push(`<button class="cat-btn" data-id="${c.id}">${ikon[c.id] || "📚"} ${c.nama}</button>`);
    });
    $catGrid.html(buttons.join(""));
  }

  $catGrid.on("click", ".cat-btn", function () {
    $(".cat-btn").removeClass("selected");
    $(this).addClass("selected");
    state.catId = $(this).data("id");
  });

  $("#btn-start").on("click", startSession);

  // =========================================================
  //  SESI
  // =========================================================
  function startSession() {
    // Bangun pool sesuai kategori
    let pool = (state.catId === "all")
      ? KOSAKATA.slice()
      : KOSAKATA.filter((k) => k.kategori_id === state.catId);

    pool = shuffle(pool).slice(0, SESSION_WORDS);

    state.pool = pool;
    state.queue = pool.slice();
    state.score = 0;
    state.streak = 0;
    state.answered = 0;
    state.won = 0;

    updateStats();
    $screenStart.removeClass("active");
    $screenGame.addClass("active");
    nextWord();
  }

  function nextWord() {
    closeOverlays();
    if (state.queue.length === 0) { endSession(); return; }

    const entry = state.queue.shift();

    // Arah acak: tampil ID -> tebak ENG, atau tampil ENG -> tebak ID
    const tebakInggris = Math.random() < 0.5;
    const tampil = tebakInggris ? entry.indonesia : entry.inggris;
    const target = tebakInggris ? entry.inggris   : entry.indonesia;

    state.current = {
      tampil,
      target,
      targetLower: target.toLowerCase(),
      kategori: entry.kategori,
      clueLang: tebakInggris ? "Bahasa Indonesia" : "Bahasa Inggris",
      askLang:  tebakInggris ? "Tebak kata Inggris-nya" : "Tebak kata Indonesia-nya",
    };
    state.correct = [];
    state.wrong = [];
    state.playable = true;

    // Render
    $("#chip-cat").text(state.current.kategori);
    $("#clue-lang").text(state.current.clueLang);
    $("#clue-text").text(state.current.tampil);
    $("#ask-lang").text(state.current.askLang);

    resetFigure();
    buildKeyboard();
    renderWord();
    renderWrong();
    startTimer();
  }

  function endSession() {
    stopTimer();
    $("#end-summary").html(
      `Kamu menjawab benar <b>${state.won}</b> dari <b>${state.answered}</b> kata.<br>` +
      `Total skor: <b>${state.score}</b> ★`
    );
    $("#overlay-end").addClass("show");
  }

  $("#btn-restart").on("click", function () {
    $("#overlay-end").removeClass("show");
    $screenGame.removeClass("active");
    $screenStart.addClass("active");
  });

  $("#btn-back").on("click", function () {
    stopTimer();
    state.playable = false;
    closeOverlays();
    $screenGame.removeClass("active");
    $screenStart.addClass("active");
  });

  // =========================================================
  //  RENDER KATA
  // =========================================================
  function renderWord(reveal) {
    const target = state.current.target;
    const html = target.split("").map((ch) => {
      if (ch === " ") return `<span class="letter space"></span>`;
      if (ch === "-") return `<span class="letter dash">-</span>`;
      const lower = ch.toLowerCase();
      const shown = state.correct.includes(lower);
      if (shown) return `<span class="letter filled">${ch}</span>`;
      if (reveal) return `<span class="letter reveal">${ch}</span>`;
      return `<span class="letter"></span>`;
    }).join("");
    $word.html(html);
  }

  function renderWrong() {
    $wrong.text(state.wrong.join(" "));
  }

  // huruf yang perlu ditebak (a-z saja), unik
  function neededLetters() {
    return [...new Set(
      state.current.targetLower.split("").filter((c) => c >= "a" && c <= "z")
    )];
  }

  function isWordComplete() {
    return neededLetters().every((l) => state.correct.includes(l));
  }

  // =========================================================
  //  KEYBOARD ON-SCREEN
  // =========================================================
  function buildKeyboard() {
    $keyboard.html(
      "qwertyuiopasdfghjklzxcvbnm".split("")
        .map((ch) => `<button class="key" data-letter="${ch}">${ch}</button>`)
        .join("")
    );
  }

  $keyboard.on("click", ".key", function () {
    const letter = $(this).data("letter");
    handleGuess(String(letter));
  });

  // Keyboard fisik tetap berfungsi
  $(document).on("keydown", function (e) {
    if (!state.playable) return;
    const k = (e.key || "").toLowerCase();
    if (k.length === 1 && k >= "a" && k <= "z") handleGuess(k);
  });

  // =========================================================
  //  LOGIKA TEBAKAN
  // =========================================================
  function handleGuess(letter) {
    if (!state.playable) return;

    // sudah dipakai?
    if (state.correct.includes(letter) || state.wrong.includes(letter)) {
      showToast("Huruf itu sudah kamu pilih");
      return;
    }

    const $key = $keyboard.find(`.key[data-letter="${letter}"]`);

    if (state.current.targetLower.includes(letter)) {
      state.correct.push(letter);
      $key.addClass("correct").prop("disabled", true);
      renderWord();
      if (isWordComplete()) winWord();
    } else {
      state.wrong.push(letter);
      $key.addClass("wrong").prop("disabled", true);
      renderWrong();
      showFigurePart(state.wrong.length);
      $(".figure-box").addClass("shake");
      setTimeout(() => $(".figure-box").removeClass("shake"), 400);
      if (state.wrong.length >= MAX_WRONG) loseWord();
    }
  }

  // =========================================================
  //  MENANG / KALAH / LEWAT
  // =========================================================
  function winWord() {
    state.playable = false;
    stopTimer();
    state.answered++;
    state.won++;
    state.streak++;

    // Skor: dasar 100 - (10 per salah) + bonus waktu + bonus streak
    const base = 100 - state.wrong.length * 10;
    const timeBonus = state.timeLeft * 2;
    const streakBonus = (state.streak - 1) * 20;
    const gain = Math.max(20, base + timeBonus + streakBonus);
    state.score += gain;
    updateStats();

    showResult("🎉", "Benar!",
      `<b>${state.current.target}</b> = ${otherSide()}`,
      `+${gain} ★${state.streak > 1 ? "  🔥×" + state.streak : ""}`);
  }

  function loseWord() {
    state.playable = false;
    stopTimer();
    state.answered++;
    state.streak = 0;
    updateStats();
    renderWord(true); // ungkap kata
    showResult("😕", "Belum tepat",
      `Jawabannya: <b>${state.current.target}</b> = ${otherSide()}`,
      "");
  }

  $("#btn-skip").on("click", function () {
    if (!state.playable) return;
    state.playable = false;
    stopTimer();
    state.answered++;
    state.streak = 0;
    updateStats();
    renderWord(true);
    showResult("⏭", "Dilewati",
      `Jawabannya: <b>${state.current.target}</b> = ${otherSide()}`,
      "");
  });

  // sisi terjemahan lawan (untuk ditampilkan saat hasil)
  function otherSide() {
    // current.tampil adalah petunjuk; target adalah jawaban => lawan dari target adalah tampil
    return state.current.tampil;
  }

  $("#btn-next").on("click", nextWord);

  function showResult(emoji, title, wordHtml, gainText) {
    $("#result-emoji").text(emoji);
    $("#result-title").text(title);
    $("#result-word").html(wordHtml);
    $("#result-gain").text(gainText);
    $("#overlay").addClass("show");
  }

  function closeOverlays() {
    $("#overlay").removeClass("show");
    $("#overlay-end").removeClass("show");
  }

  // =========================================================
  //  FIGUR HANGMAN
  // =========================================================
  function resetFigure() {
    $figureParts.removeClass("show");
    renderLives();
  }
  function showFigurePart(n) {
    $figureParts.eq(n - 1).addClass("show");
    renderLives();
  }
  function renderLives() {
    const left = MAX_WRONG - state.wrong.length;
    let s = "";
    for (let i = 0; i < MAX_WRONG; i++) s += i < left ? "❤️" : "🤍";
    $lives.html(s);
  }

  // =========================================================
  //  TIMER
  // =========================================================
  function startTimer() {
    stopTimer();
    state.timeLeft = TIME_PER_WORD;
    updateTimer();
    state.timer = setInterval(function () {
      state.timeLeft--;
      updateTimer();
      if (state.timeLeft <= 0) {
        stopTimer();
        if (state.playable) timeUp();
      }
    }, 1000);
  }
  function stopTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }
  function updateTimer() {
    $("#stat-timer").text(state.timeLeft);
    $("#chip-timer").toggleClass("warn", state.timeLeft <= 5);
  }
  function timeUp() {
    state.playable = false;
    state.answered++;
    state.streak = 0;
    updateStats();
    renderWord(true);
    showResult("⏰", "Waktu habis",
      `Jawabannya: <b>${state.current.target}</b> = ${otherSide()}`,
      "");
  }

  // =========================================================
  //  STATS & UTIL
  // =========================================================
  function updateStats() {
    $("#stat-score").text(state.score);
    $("#stat-streak").text(state.streak);
  }

  let toastTimer = null;
  function showToast(msg) {
    $("#toast-note").text(msg).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("#toast-note").removeClass("show"), 1600);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // =========================================================
  //  INIT
  // =========================================================
  buildCategories();
});

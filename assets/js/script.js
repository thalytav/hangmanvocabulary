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
    dirMode: "id-en",    // "id-en" = tampil ID→tebak ENG, "en-id" = tampil ENG→tebak ID
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
  const $stage       = $("#stage");
  const $confetti    = $("#confetti-container");

  // =========================================================
  //  FLOATING BACKGROUND PARTICLES
  // =========================================================
  function buildFloatingBg() {
    const $bg = $("#particles-bg");
    const colors = ["#ff6b6b", "#ffa552", "#4d8bff", "#2bb673", "#ffd166", "#c084fc"];
    for (let i = 0; i < 12; i++) {
      const size = 40 + Math.random() * 120;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = 10 + Math.random() * 14;
      const delay = Math.random() * -10;
      const color = colors[i % colors.length];
      const dx1 = -30 + Math.random() * 60;
      const dy1 = -30 + Math.random() * 60;
      const dx2 = -30 + Math.random() * 60;
      const dy2 = -30 + Math.random() * 60;
      const dx3 = -30 + Math.random() * 60;
      const dy3 = -30 + Math.random() * 60;
      const isSquare = Math.random() > 0.5;

      const $el = $("<div>").addClass("float-shape").css({
        width: size + "px",
        height: size + "px",
        left: x + "%",
        top: y + "%",
        background: color,
        borderRadius: isSquare ? "20%" : "50%",
        "--dur": dur + "s",
        "--delay": delay + "s",
        "--dx1": dx1 + "px",
        "--dy1": dy1 + "px",
        "--dx2": dx2 + "px",
        "--dy2": dy2 + "px",
        "--dx3": dx3 + "px",
        "--dy3": dy3 + "px",
      });
      $bg.append($el);
    }
  }

  // =========================================================
  //  CONFETTI
  // =========================================================
  function spawnConfetti(count) {
    count = count || 40;
    const colors = ["#ff6b6b", "#ffa552", "#4d8bff", "#2bb673", "#ffd166", "#c084fc", "#ff9ff3", "#54a0ff"];
    $confetti.empty();
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const sway = -60 + Math.random() * 120;
      const dur = 1.8 + Math.random() * 1.5;
      const delay = Math.random() * 0.5;
      const w = 6 + Math.random() * 8;
      const h = 8 + Math.random() * 10;

      const $piece = $("<div>").addClass("confetti-piece").css({
        left: left + "%",
        width: w + "px",
        height: h + "px",
        background: color,
        "--sway": sway + "px",
        "--fall-dur": dur + "s",
        "--fall-delay": delay + "s",
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      });
      $confetti.append($piece);
    }
    // Cleanup after animation
    setTimeout(() => $confetti.empty(), 3500);
  }

  // =========================================================
  //  LETTER PARTICLES
  // =========================================================
  function spawnLetterParticles($letterEl) {
    const colors = ["#2bb673", "#ffd166", "#4d8bff", "#ff6b6b"];
    const rect = $letterEl[0].getBoundingClientRect();
    const stageRect = $stage[0].getBoundingClientRect();
    const cx = rect.left - stageRect.left + rect.width / 2;
    const cy = rect.top - stageRect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const px = -30 + Math.random() * 60;
      const py = -40 + Math.random() * 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 4 + Math.random() * 5;

      const $p = $("<div>").addClass("letter-particle").css({
        left: cx + "px",
        top: cy + "px",
        width: size + "px",
        height: size + "px",
        background: color,
        "--px": px + "px",
        "--py": py + "px",
      });
      $stage.append($p);
      setTimeout(() => $p.remove(), 700);
    }
  }

  // =========================================================
  //  MUTE BUTTON
  // =========================================================
  $("#btn-mute").on("click", function () {
    SFX.unlock();
    const isMuted = SFX.toggleMute();
    $(this).text(isMuted ? "🔇" : "🔊");
  });

  // =========================================================
  //  CATEGORY BUTTON RIPPLE TRACKING
  // =========================================================
  $catGrid.on("mousemove", ".cat-btn", function (e) {
    const rect = this.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(0) + "%";
    const my = ((e.clientY - rect.top) / rect.height * 100).toFixed(0) + "%";
    this.style.setProperty("--mx", mx);
    this.style.setProperty("--my", my);
  });

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
    SFX.keyClick();
  });

  // =========================================================
  //  LAYAR MULAI — arah terjemahan
  // =========================================================
  $("#dir-grid").on("click", ".dir-btn", function () {
    if ($(this).hasClass("selected")) return;
    $(".dir-btn").removeClass("selected");
    $(this).addClass("selected");
    state.dirMode = $(this).data("dir");
    SFX.unlock();
    SFX.select();
  });

  $("#btn-start").on("click", function () {
    SFX.unlock();
    startSession();
  });

  // =========================================================
  //  SESI
  // =========================================================
  function startSession() {
    SFX.start();

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

    // Arah dipilih pemain di layar mulai: "id-en" = tebak Inggris, "en-id" = tebak Indonesia
    const tebakInggris = state.dirMode === "id-en";
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
    SFX.sessionEnd();
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
    const html = target.split("").map((ch, idx) => {
      if (ch === " ") return `<span class="letter space"></span>`;
      if (ch === "-") return `<span class="letter dash">-</span>`;
      const lower = ch.toLowerCase();
      const shown = state.correct.includes(lower);
      if (shown) return `<span class="letter filled" data-idx="${idx}">${ch}</span>`;
      if (reveal) return `<span class="letter reveal" style="animation-delay:${idx * 0.05}s">${ch}</span>`;
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
      SFX.duplicate();
      return;
    }

    const $key = $keyboard.find(`.key[data-letter="${letter}"]`);

    if (state.current.targetLower.includes(letter)) {
      state.correct.push(letter);
      $key.addClass("correct").prop("disabled", true);
      SFX.correct();
      renderWord();

      // Spawn particles on each newly revealed letter
      $word.find(".letter.filled").each(function () {
        const ch = $(this).text().toLowerCase();
        if (ch === letter) {
          spawnLetterParticles($(this));
        }
      });

      if (isWordComplete()) winWord();
    } else {
      state.wrong.push(letter);
      $key.addClass("wrong").prop("disabled", true);
      SFX.wrong();
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

    // Visual effects
    SFX.win();
    spawnConfetti(50);
    $stage.addClass("win-flash");
    setTimeout(() => $stage.removeClass("win-flash"), 600);

    // Score bump animation
    const $scoreEl = $("#stat-score");
    $scoreEl.addClass("score-bump");
    setTimeout(() => $scoreEl.removeClass("score-bump"), 400);

    // Streak fire animation
    if (state.streak > 1) {
      const $streakEl = $("#stat-streak").parent();
      $streakEl.addClass("streak-fire");
      setTimeout(() => $streakEl.removeClass("streak-fire"), 700);
    }

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

    SFX.lose();
    $stage.addClass("lose-flash");
    setTimeout(() => $stage.removeClass("lose-flash"), 600);

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

    SFX.skip();
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

      // Tick sound during warning
      if (state.timeLeft <= 5 && state.timeLeft > 0 && state.playable) {
        SFX.tick();
      }

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

    SFX.timeUp();
    $stage.addClass("lose-flash");
    setTimeout(() => $stage.removeClass("lose-flash"), 600);

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
  buildFloatingBg();
  initPhotoModal();
});

/* =========================================================
   PHOTO PREVIEW MODAL
   Dipasang di luar $(function(){}) agar tidak terikat state game
   ========================================================= */
function initPhotoModal() {
  const modal    = document.getElementById("photo-modal");
  const modalImg = document.getElementById("photo-modal-img");
  const modalName= document.getElementById("photo-modal-name");
  const backdrop = document.getElementById("photo-modal-backdrop");
  const closeBtn = document.getElementById("photo-modal-close");

  if (!modal) return;

  // Buka modal saat avatar diklik
  document.querySelectorAll(".author-ava[data-preview]").forEach(function(el) {
    el.addEventListener("click", function() {
      const src  = el.getAttribute("data-preview");
      const name = el.getAttribute("data-name") || "";
      modalImg.src = src;
      modalImg.alt = name;
      modalName.textContent = name;
      modal.classList.add("open");
      document.addEventListener("keydown", handleModalKey);
    });
  });

  // Tutup via backdrop
  backdrop.addEventListener("click", closeModal);

  // Tutup via tombol
  closeBtn.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.remove("open");
    document.removeEventListener("keydown", handleModalKey);
    // Beri jeda sebelum kosongkan src agar transisi selesai
    setTimeout(function() {
      modalImg.src = "";
    }, 300);
  }

  function handleModalKey(e) {
    if (e.key === "Escape") closeModal();
  }
}


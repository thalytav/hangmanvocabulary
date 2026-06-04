const { chromium } = require("playwright-chromium");
(async () => {
  const browser = await chromium.launch();
  const base = "file:///C:/Users/User/Downloads/html-css-javascript-games-main/html-css-javascript-games-main/12-Hangman-Game/index.html";

  // Desktop 16:9 — tekan beberapa huruf salah biar hangman muncul
  const d = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const dp = await d.newPage();
  await dp.goto(base); await dp.waitForTimeout(1000);
  for (const key of ['x','q','z','j','v']) {
    await dp.keyboard.press(key);
    await dp.waitForTimeout(200);
  }
  await dp.screenshot({ path: "C:/Users/User/Downloads/html-css-javascript-games-main/html-css-javascript-games-main/12-Hangman-Game/ss_desktop.png" });
  await d.close();

  // Mobile Samsung Galaxy A51/71 — tekan huruf salah juga
  const m = await browser.newContext({ viewport: { width: 412, height: 914 } });
  const mp = await m.newPage();
  await mp.goto(base); await mp.waitForTimeout(1000);
  for (const key of ['x','q','z','j','v','w']) {
    await mp.keyboard.press(key);
    await mp.waitForTimeout(200);
  }
  await mp.screenshot({ path: "C:/Users/User/Downloads/html-css-javascript-games-main/html-css-javascript-games-main/12-Hangman-Game/ss_mobile.png", fullPage: true });
  await m.close();

  await browser.close();
  console.log("done");
})();



const { chromium } = require("playwright");
const path = require("path");

(async () => {
  // Desktop screenshot
  const browser = await chromium.launch();
  
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto("file:///C:/Users/User/Downloads/html-css-javascript-games-main/html-css-javascript-games-main/12-Hangman-Game/index.html");
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({ path: "screenshot_desktop.png" });
  await desktopCtx.close();

  // Mobile 16:9 screenshot (360x640)
  const mobileCtx = await browser.newContext({ viewport: { width: 360, height: 640 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("file:///C:/Users/User/Downloads/html-css-javascript-games-main/html-css-javascript-games-main/12-Hangman-Game/index.html");
  await mobilePage.waitForTimeout(1200);
  await mobilePage.screenshot({ path: "screenshot_mobile.png", fullPage: true });
  await mobileCtx.close();

  await browser.close();
  console.log("done");
})();

const puppeteer = require("puppeteer");

let getPlayersFromWorld = async world => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://www.tibia.com/community/?subtopic=worlds&world=${world}`
  );
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let data = [];
    let countPlayer = document.querySelectorAll(
      "#worlds > div.Border_2 > div > div > div:nth-child(5) > table > tbody > tr > td > div > table > tbody > tr"
    ).length;

    for (var i = 2; i < countPlayer; i++) {
      let name = document.querySelector(
        `#worlds > div.Border_2 > div > div > div:nth-child(5) > table > tbody > tr > td > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
      ).innerText;
      let level = document.querySelector(
        `#worlds > div.Border_2 > div > div > div:nth-child(5) > table > tbody > tr > td > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      ).innerText;
      let vocation = document.querySelector(
        `#worlds > div.Border_2 > div > div > div:nth-child(5) > table > tbody > tr > td > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
      ).innerText;
      data.push({
        name: name,
        level: level,
        vocation: vocation
      });
    }

    return data;
  });

  browser.close();
  return result;
};

module.exports = getPlayersFromWorld;

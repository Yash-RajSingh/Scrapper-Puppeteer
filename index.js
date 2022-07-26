const puppeteer = require("puppeteer");

const querry = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://gamerant.com/gaming/");
  const getFreeGames = await page.evaluate(() => {
    const GameNews = [];
    const dataTable = document.querySelectorAll(".browse-clip");
    dataTable.forEach((element) => {
      var title = element.querySelector(".bc-title > .bc-title-link").innerText;
      var articleLink = element
        .querySelector(".bc-title > .bc-title-link")
        .getAttribute("href");
      var d = element.querySelector(".bc-excerpt");
      var description;
      if (d != null) {
        description = d.textContent;
      }
      var imgLink = element.querySelector("source").getAttribute("data-srcset");
      var a = element.querySelector("a.bc-author");
      var author;
      if (a != null) {
        author = a.innerText;
      }
      if (title && articleLink && description && imgLink && author) {
        GameNews.push({ title, articleLink, description, imgLink, author });
      }
      console.log(GameNews);
    });
    return GameNews;
  });
  getFreeGames;
  await browser.close();
};
querry();

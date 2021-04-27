const Scraper = require("./src/tools/Scraper");

const S = new Scraper("sanrioly", 5, 2);

S.on("scraping", console.log);
S.on("images", console.log);
S.on("finished", () => console.log("Finished"));

S.scrape();
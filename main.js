/**
 * @author Conner
 * @since 26/04/21
 */

// Utils
const Util = require("./src/Util");
const Logger = require("./src/Logger");
const Discord = require("./src/Discord");

// Tools
const Scraper = require("./src/tools/Scraper");

// Variables
const config = require("./data/config.json");
const { scrape } = config;

try {
  Util.parseConfig(config);

  if(config.mode === "scrape") {
    let S = new Scraper(
      scrape.user,
      scrape.page,
      scrape.pages,
      scrape.cookie
    ), total = 0, sent = 0;


    S.once("scraping", scraping => Logger.info("scraper", `Scraping ${scraping.user} | Pages -> ${scraping.page} to ${scraping.end}!`));

    S.on("images", async scraped => {
      let { images, page } = scraped;

      Logger.info("scraper", `Scraped ${images.length} ${images.length === 1 ? "image" : "images"}! (Page -> ${page})`);

      for(const chunk of Util.chunk(images)) {
        total += images.length;

        if(await Discord.post(scrape.webhook, chunk)) {
          sent += chunk.length;

          Logger.info("scraper", `Logged ${chunk.length} ${chunk.length === 0 ? "image" : "images"} to Discord!`);
        } else Logger.warn("scraper", `Unable to log ${chunk.length} ${chunk.length === 0 ? "image" : "images"} to Discord!`);
      }
    });

    S.on("error", error => Logger.error("scraper", error));

    S.once("finished", () => Logger.info("scraper", `Finished scraping ${scrape.user}! (${total}/${sent})`));

    S.scrape();
  } else {

  }
} catch(e) {
  Logger.error("main", e);
}
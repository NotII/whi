/**
 * @author Conner
 * @since 26/04/21
 */

// Utils
const Logger = require("./src/Logger");
const Util = require("./src/Util");
const Scraper = require("./src/tools/Scraper");
const Discord = require("./src/Discord");

// Variables
const config = require("./data/config.json");

try {
  Util.parseConfig(config);

  if(config.mode == "scrape") {
    let S = new Scraper(config.scrape.user, config.scrape.page, config.scrape.pages),
        w = 0, t = 0;

    S.once("scraping", s => {
      Logger.warn("scraper", `Scraping ${s.user} | Pages -> ${s.page} - ${s.end}`);
    });

    S.on("images", async i => {
      t += i.images.length;
      Logger.info("scraper", `Scraped ${i.images.length} ${i.images.length === 1 ? "image" : "images"} from page ${i.page} (Total -> ${t})`);

      for(const c of Util.chunk(i.images)) {
        if(w == config.scrape.webhook.length) w = 0;

        if(await Discord.post(config.scrape.webhook[w++], c)) {
          Logger.info("scraper", `Sent ${c.length} ${c.length === 1 ? "image" : "images"} to Discord!`);
        } else {
          Logger.warn("scraper", `Unable to log to Discord!`);
        }
      }
    });

    S.on("error", e => {
      Logger.error("scraper", e);
    });

    S.once("finished", () => {
      Logger.warn("scraper", "Finished!")
    });

    S.scrape();
  } else {
    Logger.error("checker", "Support soon!");
  }
} catch(e) {
  Logger.error("main", e);
}
/**
 * @author Conner
 * @since 27/04/21
 */

// Dependencies
const { EventEmitter } = require("events");

// Utils
const Image = require("../whi/Image");

// Scraper Class
class Scraper extends EventEmitter {
  /**
   * @param {String} user 
   * @param {String|Number} page 
   * @param {String|Number} pages 
   */
  constructor(user, page = 0, pages = 1000) {
    super();

    this.user = user;
    this.page = page;
    this.end = (page + pages) > 1000 ? 1000 : page + pages;

    this.scraping = false;
  }

  async stop() {
    this.scraping = false;

    this.emit("finished");
  }

  async scrape() {
    this.emit("scraping", {
      user: this.user,
      page: this.page,
      end: this.end
    });

    this.scraping = true;

    while(this.scraping) {
      this.emit("images", {
        images: await(Image.getImages(this.user, this.page)),
        page: this.page
      });

      if(this.page === this.end) {
        this.emit("finished");

        this.scraping = false;
      }

      this.page++;
    }
  }
}

module.exports = Scraper;

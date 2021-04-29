/**
 * @author Conner
 * @since 27/04/21
 */

// Dependencies
const { EventEmitter } = require("events");
const Util = require("../Util");

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
    /**
     * We call `super()` so we can access functions
     * from `EventEmitter`
     */
    super();

    /**
     * Setup variables from the constructor
     */
    this.user = user;
    this.page = page;
    this.end = (page + pages) > 1000 ? 1000 : page + pages;

    this.sleep = 1;

    /**
     * Set `this.scraping` to false by default.
     */
    this.scraping = false;
  }

  async stop() {
    /**
     * Set `this.scraping` to false so the while() in `scrape()`
     * stops running.
     */
    this.scraping = false;

    /**
     * Emit the `finished` event so the user knows we ended scraping!
     */
    this.emit("finished");
  }

  async scrape() {
    /**
     * Emit the `scraping` event with the variables
     * from the constructor so we can use in `main.js`
     */
    this.emit("scraping", {
      user: this.user,
      page: this.page,
      end: this.end
    });

    /**
     * Set `this.scraping` to true for the
     * while() loop!
     */
    this.scraping = true;

    /**
     * While `this.scraping` is true
     * we will run all code in the scope
     */
    while(this.scraping) {
      /**
       * Using modulus, we check if
       * `this.page` is a multiple of 10
       * if so, we set the sleep to 10000ms
       * 
       * else, we set it back to 1ms (basically, no sleep)
       */
      if((this.page % 10) === 0) this.setSleep(10000);
      else this.setSleep(1);

      /**
       * Call `try` here incase the `await`
       * throws an error!
       */
      try {
        /**
         * Emit `images` with an array containing
         * image URLs and the current page as `page`
         */
        this.emit("images", {
          images: await Image.getImages(this.user, this.page),
          page: this.page
        });
      } catch(e) {

        /**
         * If `Image.getImages()` throws
         * an error, we will emit it and
         * call `this.stop()`!
         */
        this.emit("error", e);
        // this.stop();
      }

      /**
       * If `this.page` is equal to `this.end`
       * we will emit `finished` and set
       * `this.scraping` to false to end the while
       */
      if(this.page === this.end) {
        this.emit("finished");

        this.scraping = false;
      }

      /**
       * Increment the current page every
       * time we emit some images!
       */
      this.page++;

      /**
       * Sleep for `this.sleep`ms
       * to prevent Discord
       * from ratelimiting us.
       * 
       * TODO: Make this optional / configurable :)
       */
      await Util.sleep(this.sleep);
    }
  }

  /**
   * @param {Number} ms 
   */
  setSleep(ms) {
    this.sleep = ms;
  }
}

module.exports = Scraper;

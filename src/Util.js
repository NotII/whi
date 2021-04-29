/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const crypto = require("crypto");

// Variables
const secret = "b5a67e9f6995bc89ca0d7257a30bfe08b4780250712e939d781662650d7c67ed";
const modes = [ "scrape", "check" ];

// Util Class
class Util {
  /**
   * @param {String} username 
   * @param {String} email
   * @returns {String} 
   */
  static generateSignature(username, email) {
    /**
     * Create an MD5 with `username` + `email` + `secret` and digest it
     * has hex and return.
     */
    return crypto.createHash("md5").update(username + email + secret).digest("hex");
  }

  /**
   * @returns {String}
   */
  static generateMail() {
    /**
     * Generate a random string and append `@foreskin.market` to the end
     */
    return this.generateString(12) + "@foreskin.market";
  }

  /**
   * @param {Number} len
   * @returns {String} 
   */
  static generateString(len) {
    /**
     * We create `charset` and `str`,
     * `charset` contains all possible chars
     * and `str` is an empty string
     */
    let charset = "abcdefghijklmnopqrstuvwxyz", str = "";

    /**
     * Loop `len` times and append a random string
     * from `charset` to `str`
     */
    for(let i = 0; i < len; i++) str += charset[Math.floor(Math.random() * charset.length)];

    /**
     * Return `str`
     */
    return str;
  }

  /**
   * @param {Object} config 
   */
  static parseConfig({ mode, scrape, check }) {
    /**
     * If `modes` does not contain `mode`, throw an error
     */
    if(modes.indexOf(mode.toLowerCase()) === -1) throw `Please provide a valid mode! (${modes.join(", ")})`;

    /**
     * If there is no `scrape.user` or `scrape.page`
     * is not a number, or `scrape.pages` is not a number
     * or `scrape.webhook` is undefined throw an error
     */
    if(!scrape.user 
      || isNaN(scrape.page)
      || isNaN(scrape.pages) 
      || !scrape.webhook
    ) throw `Invalid config! (type -> scrape)`;

    /**
     * If `check.register` is not true OR false,
     * or there is no wordlist or
     * there is no output, throw an error
     */
    if(typeof(check.register) !== "boolean"
      || !check.wordlist
      || !check.output
    ) throw `Invalid config! (type -> check)`; 
  }

  /**
   * 
   * @param {Object} array 
   * @param {Number} size 
   * @returns {Object}
   */
  static chunk(array = [ ], size = 10) {
    /**
     * We create an empty array called `arr`
     */
    let arr = [ ];
    
    /**
     * Headache to comment, it just chunks the array
     */
    for(let i = 0; i < array.length; i += size) arr.push(array.slice(i, i + size))

    /**
     * Return `arr`
     */
    return arr;
  }

  /**
   * @param {Number} ms
   * @returns {Promise} 
   */
  static sleep(ms = 1000) {
    return new Promise(resolve => {
      /**
       * Set a timeout for `ms` that resolves
       * the promise, usage: `await sleep(ms)`
       */
      setTimeout(resolve, ms);
    });
  }
}

module.exports = Util;
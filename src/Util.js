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
    return crypto.createHash("md5").update(username + email + secret).digest("hex");
  }

  /**
   * @returns {String}
   */
  static generateMail() {
    return this.generateString(12) + "@foreskin.market";
  }

  /**
   * @param {Number} len
   * @returns {String} 
   */
  static generateString(len) {
    let charset = "abcdefghijklmnopqrstuvwxyz", str = "";

    for(let i = 0; i < len; i++) str += charset[Math.floor(Math.random() * charset.length)];

    return str;
  }

  /**
   * @param {Object} config 
   */
  static parseConfig({ mode, scrape, check }) {
    if(modes.indexOf(mode.toLowerCase()) === -1) throw `Please provide a valid mode! (${modes.join(", ")})`;

    if(!scrape.user 
      || isNaN(scrape.page) 
      || typeof scrape.webhook == "undefined"
      || scrape.webhook.filter(url => url.indexOf("discord.com/api/webhooks") === -1).length > 0
    ) throw `Invalid config! (type -> scrape)`;

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
    let arr = [ ];
  
      for(let i = 0; i < array.length; i += size) arr.push(array.slice(i, i + size))
  
      return arr;
  }
}

module.exports = Util;
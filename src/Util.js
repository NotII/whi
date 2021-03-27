/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const p = require("phin");
const crypto = require("crypto");

// Variables
const secret = "b5a67e9f6995bc89ca0d7257a30bfe08b4780250712e939d781662650d7c67ed";

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
}

module.exports = Util;
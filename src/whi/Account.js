/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const p = require("phin");

// Utils
const Util = require("../Util");

// Variables
const BASE_URL = "https://api.weheartit.com";
const ENDPOINTS = {
  validate: "users/validate?user[username]=<username>",
  users: "api/v2/users"
}

// Account Class
class Account {
  /**
   * @param {String} username 
   * @returns {Promise<Boolean>}
   */
  static async isAvailable(username) {
    try {
      let body = JSON.parse(await(await p(`${BASE_URL}/${ENDPOINTS["validate"].replace("<username>", username)}`)).body.toString());

      if(!body.errors.username) return true;
      return false;
    } catch(e) {
      throw e;
    }
  }

  /**
   * 
   * @param {String} username 
   * @param {String} password 
   * @param {String} email 
   * @returns {Promise<>}
   */
  static async register(username, password, email) {
    try {
      let body = JSON.parse(await (await(p({
        method: "POST",
        url: `${BASE_URL}/${ENDPOINTS["users"]}`,
        headers: {
          "Content-Type": "application/json",
          // "User-Agent": "weheartit/12.1.1.2021031214 (iPhone; iOS 14.4.1; Scale/3.00)",
          // "X-WeHeartIt-Client": "iOS Efron;version=12.1.1.2021031214",
          // "X-WeHeartIt-Language": "en-GB"
        },
        data: JSON.stringify({
          client_id: Util.generateString(32),
          signature: Util.generateSignature(username, email),
          user: {
            age_verified: true,
            name: "Conner Jackson",
            username,
            password,
            email
          }
        })
      }))).body.toString());

      if(body.id) return true;
      return false;
    } catch(e) {
      throw e;
    }
  }
}

module.exports = Account;
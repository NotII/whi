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
    } catch {
      throw `Unable to check username! (${username})`;
    }
  }

  /**
   * @param {String} name
   * @param {String} username 
   * @param {String} password 
   * @param {String} email 
   * @returns {Promise<Object>}
   */
  static async register(name, username, password, email) {
    try {
      let body = JSON.parse(await (await(p({
        method: "POST",
        url: `${BASE_URL}/${ENDPOINTS["users"]}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          client_id: Util.generateString(32),
          signature: Util.generateSignature(username, email),
          user: {
            age_verified: true,
            name,
            username,
            password,
            email
          }
        })
      }))).body.toString());

      return {
        success: (body.id ? true : false),
        name,
        username,
        email,
        password
      };
    } catch {
      throw "Bad response";
    }
  }
}

module.exports = Account;
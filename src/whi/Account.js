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
    /**
     * Call `try` here incase
     * the request fails due to some
     * unknwon reason (we want to throw a custom error)
     */
    try {
      /**
       * Make a GET reques to `BASE_URL`/`ENDPOINTS["validate"]` and replace
       * the "<username>" string with the username argument, access `body` and
       * convert the buffer to a string!
       */
      let body = JSON.parse(await(await p(`${BASE_URL}/${ENDPOINTS["validate"].replace("<username>", username)}`)).body.toString());

      /**
       * If there is no `body.errors.username`
       * the username is available so we will return true
       * otherwise, we return false
       */
      if(!body.errors.username) return true;
      return false;
    } catch {
      /**
       * If there was an error, we will throw
       * our own custom error message!
       */
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
    /**
     * Call `try` here incase
     * the request fails due to some
     * unknwon reason (we want to throw a custom error)
     */
    try {
      /**
       * Makes a POST request to `BASE_URL`/`ENDPOINTS["users"]`
       * we're posting some JSON data as indicated by the Content-Type header,
       * we will POST a `client_id`, `signature` and `user` object!
       */
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

      /**
       * We return an Oject here which contains
       * `success`, `name`, `username`, `email` & `password`
       */
      return {
        success: (body.id ? true : false),
        name,
        username,
        email,
        password
      };
    } catch {
      /**
       * If there was an error, we will
       * throw our own custom error!
       */
      throw "Bad response";
    }
  }
}

module.exports = Account;
/**
 * @author Conner
 * @since 24/04/21
 */

// Dependencies
const p = require("phin");

// Variables
const BASE_URL = "https://weheartit.com";
const REGEX = /https:\/\/data.whicdn.com\/images\/.*\/superthumb.\w+/g;

// Image Class
class Image {
  /**
   * @param {String} username 
   * @param {Number|String} page 
   * @returns {Promise<Object>}
   */
  static async getImages(username, page = 0, cookie = null) {
    /**
     * Make a GET request to `BASE_URL`/`username`?page=`page`
     * and store the body in a variable called `body`
     */
    let req = await(await p({url:
      `${BASE_URL}/${username}?page=${page}`,
      headers: {
        "Cookie": (cookie ? `login_token=${cookie}` : null)
      }
    })), body = req.body.toString();

    /**
     * If the Status is 302: Found Redirect, this means
     * that we hit the max pages allowed by WHI and we
     * will throw an error
     */
    if(req.statusCode === 302) throw `Unable to fetch page! (Page -> ${page})`;
    
    /**
     * If the body contains `superthumb`,
     * we execute code inside the scope.
     * 
     * If `superthumb` isn't found, we will
     * throw a custom error!
     */
    if(body.indexOf("superthumb") !== -1) {
      /**
       * Makes a variable called `matched` and stores
       * an array of things matched from `REGEX` on body
       */
      let matched = body.match(REGEX);  
      
      /**
       * If matched AND matched has more than 0 items,
       * we will return an array of unique items
       * else, return false
       */
      if(matched && matched.length > 0) return Array.from(new Set(matched));
      return false;
    } else throw "Unable to fetch images!";
  }
}

module.exports = Image;
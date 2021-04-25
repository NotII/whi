/**
 * @author Conner
 * @since 24/04/21
 */

// Dependencies
const p = require("phin");

// Variables
const BASE_URL = "https://weheartit.com";
const regex = /https:\/\/data.whicdn.com\/images\/.*\/superthumb.\w+/g;

// Image Class
class Image {
  /**
   * @param {String} username 
   * @param {Number|String} page 
   * @returns {Promise<Object>}
   */
  static async getImages(username, page = 0) {
    let req = await(await p(`${BASE_URL}/${username}?page=${page}`)),
        body = req.body.toString();

    if(req.statusCode === 302) throw `Unable to fetch page! (Page -> ${page})`;
    
    if(body.indexOf("superthumb") !== -1) {
      let matched = body.match(regex);
      
      if(matched && matched.length > 0) return matched;
      return false;
    } else throw "Unable to fetch images!";
  }
}

module.exports = Image;
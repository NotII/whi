/**
 * @author Conner
 * @since 28/04/21
 */

// Dependencies
const p = require("phin");

// Discord Class
class Discord {
  /**
   * @param {String} webhook 
   * @param {String} image
   * @returns {Boolean} 
   */
  static async post(webhook, images) {
    /**
     * Make a POST requeest to the `webhook` variable
     * we're POSTing data as indicated by the Content-Type header
     */
    let body = await(await p({
      method: "POST",
      url: webhook,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        embeds: images.map(i => i = {
          color: 3553599, // TODO: Make this configurable
          image: {
            url: i
          },
          footer: {
            text: "Scraper by cnr ❤️ (@connuh on GitHub)"
          }
        })
      })
    })).body.toString();

    /**
     * If the size of the body is 0 bytes
     * that means the webhook sent succesfully
     * and we can return true, otherwise return false
     */
    if(body.length === 0) return true;
    return false;
  }
}

module.exports = Discord;
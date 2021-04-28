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
    let body = await(await p({
      method: "POST",
      url: webhook,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        embeds: images.map(i => i = {
          color: 11962342,
          image: {
            url: i
          },
          footer: {
            text: "Scraper by cnr ❤️ (@connuh on GitHub)"
          }
        })
      })
    })).body.toString();

    if(body.length === 0) return true;
    return false;
  }
}

module.exports = Discord;
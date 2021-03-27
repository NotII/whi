/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const p = require("phin");

// Variables
const PROXY_URL = "https://api.proxies.gg/v1/request?action=getproxies&timeout=10000&level=all&ssl=all&country=all&proxytype=91c36df2-7187-49c0-8fb2-5e21bcd9ca86";

// Proxy Class
class Proxy {
  /**
   * @returns {Object}
   */
   static async getProxies() {
    try {
      let body = await(await p(PROXY_URL)).body.toString();

      return body.replace(/\r/g, "").split("\n").filter(p => p.length > 0);
    } catch(e) {
      throw e;
    }
  }
}

module.exports = Proxy;
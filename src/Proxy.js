/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const p = require("phin");

// Variables
const PROXY_URL = "https://api.proxies.gg/v1/request?action=getproxies&timeout=10000&level=all&ssl=all&country=all&proxytype=91c36df2-7187-49c0-8fb2-5e21bcd9ca86";
let proxies = [ ];

// Proxy Class
class Proxy {
  /**
   * @returns {Object}
   */
   static async loadProxies() {
    try {
      let body = await(await p(PROXY_URL)).body.toString();

      proxies = body.replace(/\r/g, "").split("\n").filter(p => p.length > 0);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 
   * @param {String} proxy 
   * @param {String|Number} time 
   * @returns 
   */
  static setBanned(proxy, time = 30000) {
    if(proxies.indexOf(proxy) === -1) return false;

    proxies = proxies.filter(p => p !== proxy);

    setTimeout(() => {
      if(proxies.indexOf(proxy) === -1) proxies.push(proxy);
    }, parseInt(time));

    return true;
  }

  /**
   * @returns {String}
   */
  static getProxy() {
    return proxies[Math.floor(Math.random() * proxies.length)];
  }

  /**
   * @returns {Object<Array>}
   */
  static get() {
    return proxies;
  }
}

module.exports = Proxy;
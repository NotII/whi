/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const fs = require("fs");

// File Class
class File {
  /**
   * @param {String} path 
   * @returns {Promise<String>}
   */
  static load(path) {
    return new Promise((resolve, reject) => {
      /**
       * We create two variables named `data` and `stream`
       * data is an empty string and `stream` is a read stream
       * from the `path` variable.
       */
      let data = "", stream = fs.createReadStream(path);

      /**
       * When the stream receives some data, we
       * will append it to the `data` variable
       */
      stream.on("data", d => data += d.toString());
  
      /**
       * When the stream ends, we will resolve the promise
       * with `data` stripped and filtered
       */
      stream.on("end", () => {
        return resolve(data.replace(/\r/g, "").split("\n").filter(p => p.length > 0));
      });
  
      /**
       * If there is an error, we will reject the promise.
       */
      stream.on("error", e => {
        return reject(e);
      });
    });
  }

  /**
   * @param {String} path 
   * @param {String} data 
   * @returns {Boolean}
   */
  static save(path, data) {
    try {
      /**
       * Append `data` + "\n" to `path`
       * and return true
       */
      fs.appendFileSync(path, `${data}\n`);
      return true;
    } catch {
      /**
       * If there is an error, we will return false
       */
      return false;
    }
  }
}

module.exports = File;
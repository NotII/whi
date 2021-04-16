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
   */
  static load(path) {
    return new Promise((resolve, reject) => {
      let data = "", stream = fs.createReadStream(path);

      stream.on("data", d => data += d.toString());
  
      stream.on("end", () => {
        return resolve(data.replace(/\r/g, "").split("\n").filter(p => p.length > 0));
      });
  
      stream.on("error", e => {
        return reject(e);
      });
    });
  }

  /**
   * @param {String} path 
   * @param {String} data 
   */
  static save(path, data) {
    try {
      fs.appendFileSync(path, `${data}\n`);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = File;
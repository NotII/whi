/**
 * @author Conner
 * @since 27/03/21
 */

// Dependencies
const fs = require("fs");

// File Class
class File {
  /**
   * @param {String} dir 
   */
  static load(dir) {
    return new Promise((resolve, reject) => {
      let data = "", stream = fs.createReadStream(dir);

      stream.on("data", d => data += d.toString());
  
      stream.on("end", () => {
        return resolve(data.replace(/\r/g, "").split("\n").filter(p => p.length > 0));
      });
  
      stream.on("error", e => {
        return reject(e);
      });
    });
  }
}

module.exports = File;
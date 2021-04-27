/**
 * @author Conner
 * @since 26/04/21
 */

// Utils
const Util = require("./src/Util");

// Variables
const config = require("./data/config.json");

try {
  Util.parseConfig(config);

  if(config.mode == "scrape") {
    
  } else {
    
  }
} catch(e) {
  console.log(e)
}
/**
 * @author Conner
 * @since 28/04/21
 */

// Logger Class
class Logger {
  // If you think I am adding JSDoc for some strings, you're mistaken.
  static info = (prefix, string) => console.log(`\x1b[94m[${prefix} | info]\x1b[37m ${string}`);
  static warn = (prefix, string) => console.log(`\x1b[93m[${prefix} | warn]\x1b[37m ${string}`);
  static error = (prefix, string) => console.log(`\x1b[91m[${prefix} | error]\x1b[37m ${string}`);
}

module.exports = Logger;
/**
 * @author Conner
 * @since 28/04/21
 */

// Logger Class
class Logger {
  // If you think I am adding JSDoc for some strings, you're mistaken.
  static info = string => console.log(`[info] ${string}`);
  static warn = string => console.log(`[warn] ${string}`);
  static error = string => console.log(`[error] ${string}`);
}

module.exports = Logger;
/**
 * @author Conner
 * @since 27/03/21
 */

// Utils
const File = require("./src/File");
const Account = require("./src/whi/Account");
const Util = require("./src/Util");

// Variables
let registered = [ ];

File.load("./data/wordlist.txt").then(content => {
  content = content.filter(l => l.length > 2 && l.split(" ").length === 1).map(u => u.toLowerCase());
  
  console.log(`[whi] Loaded ${content.length} ${content.length === 1 ? "username": "usernames"}`);

  for(const i in content) {
    let username = content[i];

    setTimeout(async () => {
      let available = await Account.isAvailable(username);

      if(available && registered.indexOf(username) === -1) {
        registered.push(username);
        let account = await Account.register("Conner Jackson", username, Util.generateString(32), Util.generateMail());

        console.log(`[whi] ${username} is available - registering!`);

        if(account.success) {
          console.log(`[whi] Registered ${username} | E-Mail -> ${account.email} | Password -> ${account.password}`);
          File.save("./data/out.txt", `${username}:${account.password}:${account.email}`);
        } else {
          console.log(`[whi] Failed to register ${username}!`);
        }
      }
    }, i * 10);
  }
}).catch(() => {
  console.log(`[whi] Unable to load wordlist!`);
});
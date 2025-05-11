## **Chapter 6: Advanced Concepts**

---

### **6.1 Error Handling**

Every bot can run into errors! Proper error handling ensures your bot continues running instead of crashing.

#### **Using `try/catch`**

```javascript
client.on('messageCreate', async (message) => {
  try {
    // Code that might throw (e.g., calling an API)
    await someRiskyOperation();
  } catch (error) {
    console.error('An error occurred:', error);
    message.reply('⚠️ An error occurred! Please try again later.');
  }
});
```

#### **Logging Errors to a File**

* Append errors to a log file for later review:

  ```javascript
  const fs = require('fs');
  fs.appendFileSync('errors.log', `${new Date().toISOString()}: ${error.stack}\n`);
  ```

---

### **6.2 Slash Commands**

Slash commands (`/command`) offer a better user experience and don’t require a prefix.

#### **Registering Slash Commands**

1. **Define the command in code**:

   ```javascript
   const { SlashCommandBuilder } = require('discord.js');

   module.exports = {
     data: new SlashCommandBuilder()
       .setName('ping')
       .setDescription('Check the bot’s ping'),
     async execute(interaction) {
       await interaction.reply('🏓 Pong!');
     }
   };
   ```
2. **Register commands with Discord**:

   * **Guild-specific** (faster updates):

     ```javascript
     const rest = new REST().setToken(process.env.TOKEN);
     const commands = [pingCommand.data.toJSON()];
     await rest.put(
       Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
       { body: commands }
     );
     ```
   * **Global** (available in all servers):

     ```javascript
     await rest.put(
       Routes.applicationCommands(CLIENT_ID),
       { body: commands }
     );
     ```

---

### **6.3 Working with a Database**

To store persistent data (like user XP), you’ll need a database.

#### **Using a JSON File (Simple Approach)**

```javascript
const fs = require('fs');

// Load database
let db = JSON.parse(fs.readFileSync('database.json'));

// Update user XP
db[message.author.id] = { xp: 100, level: 2 };

// Save back to file
fs.writeFileSync('database.json', JSON.stringify(db));
```

#### **Using SQLite (More Advanced)**

1. **Install the package**:

   ```bash
   npm install better-sqlite3
   ```
2. **Connect and set up**:

   ```javascript
   const Database = require('better-sqlite3');
   const db = new Database('database.sqlite');

   // Create table if it doesn’t exist
   db.prepare(`
     CREATE TABLE IF NOT EXISTS users (
       id TEXT PRIMARY KEY,
       xp INTEGER DEFAULT 0,
       level INTEGER DEFAULT 1
     )
   `).run();
   ```
3. **Insert data**:

   ```javascript
   const insert = db.prepare('INSERT OR IGNORE INTO users (id, xp) VALUES (?, ?)');
   insert.run(message.author.id, 100);
   ```

---

### **6.4 XP Leveling System**

**Practical JSON example:**

```javascript
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const userId = message.author.id;
  db[userId] = db[userId] || { xp: 0, level: 1 };
  db[userId].xp += 10; // Award 10 XP per message

  // Level up check
  if (db[userId].xp >= db[userId].level * 100) {
    db[userId].level += 1;
    message.channel.send(
      `🎉 ${message.author} reached level ${db[userId].level}!`
    );
  }

  fs.writeFileSync('database.json', JSON.stringify(db));
});
```

---

### **Hands-On Exercise for Chapter 6**

1. Create a slash command `/time` that replies with the current time.
2. Use SQLite to create a table for polls and store vote data.
3. Design a system that randomly awards a prize to a user each time they send a message.

---

### **Common Issues & Solutions**

* **Slash commands not showing up**:

  * Wait 24–48 hours for global commands to propagate.
  * Verify you’re using correct `CLIENT_ID` and `GUILD_ID`.
* **Database permission errors**:

  * Ensure your JSON/SQLite file is writable.
  * Use relative paths (e.g., `./database.json`).

---

### **Key Tips**

* For production, consider robust databases like **PostgreSQL** or **MongoDB**.
* Always **validate** user input before interacting with your database to prevent injection attacks.
* Store sensitive info (token, DB credentials) in a **.env** file (covered in Chapter 7).

---

In the next chapter, you’ll learn how to **deploy your bot** to a server and cover essential **security practices**! 🚀
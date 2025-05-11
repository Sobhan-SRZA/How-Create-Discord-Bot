## **Chapter 4: Getting Started with discord.js**

---

### **4.1 Introduction to the discord.js Library**

`discord.js` is a powerful and flexible library for building Discord bots with JavaScript/Node.js.

#### **Why discord.js?**

* **Beginner-Friendly:** Easier to learn compared to other libraries (like `Eris`).
* **Secure & Up-to-Date:** Regularly maintained and compatible with the latest Discord API changes.
* **Excellent Documentation:** The [official docs](https://discord.js.org) are comprehensive and include examples.

---

### **4.2 Core Structure of a Bot**

Every Discord bot using `discord.js` has three main parts:

1. **Client:** Connects your bot to Discord.
2. **Events:** Handles events (like receiving a message).
3. **Commands:** Executes user commands.

---

### **4.3 Connecting Your Bot to Discord**

#### **Initial Setup Steps**

1. **Create a `Client`:**

   ```javascript
   const { Client, GatewayIntentBits } = require('discord.js');
   const client = new Client({
     intents: [
       GatewayIntentBits.Guilds,           // Access to guild information
       GatewayIntentBits.GuildMessages,    // Receive message events
       GatewayIntentBits.MessageContent    // Read message content
     ]
   });
   ```

2. **Log In with Your Token:**

   ```javascript
   client.login('YOUR_BOT_TOKEN');
   ```

3. **Handle the `ready` Event:**

   ```javascript
   client.on('ready', () => {
     console.log(`✅ ${client.user.tag} is now online!`);
   });
   ```

---

### **4.4 Responding to User Messages**

Use the `messageCreate` event to listen for and respond to messages:

```javascript
client.on('messageCreate', (message) => {
  // Ignore messages from other bots
  if (message.author.bot) return;

  // Reply to "hi"
  if (message.content === 'hi') {
    message.reply('Hello! How are you? 😊');
  }
});
```

---

### **4.5 Creating Your First Command (Ping–Pong)**

```javascript
client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    const start = Date.now();
    message.reply('Calculating ping...').then((sentMessage) => {
      const latency = Date.now() - start;
      sentMessage.edit(`🏓 Pong! Latency: ${latency}ms`);
    });
  }
});
```

---

### **4.6 Working with Message Properties**

Every `message` object contains useful information:

* **Content:** `message.content`
* **Author:** `message.author.tag`
* **Channel:** `message.channel.name`
* **Guild:** `message.guild.name`

**Example:**

```javascript
client.on('messageCreate', (message) => {
  console.log(
    `Message from ${message.author.tag} in #${message.channel.name}: ${message.content}`
  );
});
```

---

### **Hands-On Exercise for Chapter 4**

1. Create a command `!time` that replies with the current time.
2. Make a `!user` command that returns the author’s username and tag.
3. (Optional) Implement `!purge` to delete a specified number of messages.

**Example for Exercise 1:**

```javascript
if (message.content === '!time') {
  const time = new Date().toLocaleTimeString('en-US');
  message.reply(`Current time: ${time}`);
}
```

---

### **Common Issues & Solutions**

* **Bot Won’t Go Online:**

  * Verify your token is correct.
  * Check your internet connection.
  * Ensure the required intents are enabled in the Developer Portal ([Enabling Intents Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)).

* **Bot Doesn’t Respond to Messages:**

  * Add the `MessageContent` intent.
  * Confirm the bot is invited to your server.

---

### **Key Tips**

* Enable **Gateway Intents** in the [Discord Developer Portal](https://discord.com/developers/applications).
* **Never** commit your bot token to public code—use a `.env` file (covered in Chapter 7).
* For more advanced commands, switch to **Slash Commands** (covered in Chapter 6).

---

In the next chapter, you’ll learn **how to build more advanced commands** and work with **Embeds**! 🚀
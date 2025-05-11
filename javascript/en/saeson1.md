## **Chapter 1: Introduction and Setting Up Your Environment**

---

### **1.1 What Is Programming?**

Programming means writing instructions that a computer executes to produce a specific output or behavior.

* **Why Discord and Node.js?**

  * Discord is a popular platform for building online communities, and bots can add features like automated moderation, mini-games, or smart interactions to your servers.
  * **Node.js** is a JavaScript runtime that lets you run your code outside the browser (for example, on a server). It’s ideal for creating Discord bots with the `discord.js` library.

---

### **1.2 Required Tools**

Before you begin, make sure you have the following tools installed and ready:

#### **1.2.1 Installing Node.js and npm**

1. Go to the [Node.js website](https://nodejs.org).
2. Download and install the **LTS** (Long-Term Support) version.
3. After installation, open your terminal (or Command Prompt) and run:

   ```bash
   node -v    # This should print your Node.js version (e.g., v18.12.1)
   npm -v     # This should print your npm version (e.g., 8.19.2)
   ```

#### **1.2.2 Code Editor: VS Code**

* VS Code is a free, popular code editor. Download and install it from [here](https://code.visualstudio.com).

#### **1.2.3 Creating Your Bot on Discord**

1. Visit the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and choose a name for your bot.
3. In the left sidebar, select **Bot**, then click **Add Bot**.
4. Copy the bot’s **Token** and keep it somewhere safe—it’s like your bot’s password!

![Image: Steps to Create a Discord Bot](https://example.com/discord-bot-creation-steps.png)

---

### **1.3 Starting Your First Project**

1. Create a new folder for your project (for example, `my-first-bot`).
2. Open that folder in VS Code.
3. In the VS Code terminal, initialize a new Node.js project:

   ```bash
   npm init -y
   ```
4. Install the `discord.js` library:

   ```bash
   npm install discord.js
   ```

---

### **1.4 Testing Your Bot’s Connection to Discord**

Create a file named `index.js` and paste in the following code:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Bot logged in successfully! Name: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === 'سلام') {
    message.reply('سلام! چطوری؟');
  }
});

client.login('YOUR_TOKEN_HERE');
```

* Replace `'YOUR_TOKEN_HERE'` with your actual bot token.
* Run the bot in your terminal:

  ```bash
  node index.js
  ```
* If everything is set up correctly, your bot will come online in Discord and reply to “سلام” with “سلام! چطوری؟”.

---

### **1.5 Hands-On Exercise for Chapter 1**

1. Create a new Discord bot and obtain its token.
2. Write the `index.js` file as shown above and run the bot.
3. In your Discord server, send the bot the message “سلام” and verify its reply.

---

### **Key Tips**

* **Never** share your bot token with anyone!
* If your bot doesn’t go online:

  * Double-check that you pasted the token correctly.
  * Ensure your internet connection is active.
  * Make sure you’ve invited your bot to your server (use the **OAuth2** link in the Developer Portal).

In the next chapter, we’ll dive into the fundamental concepts of JavaScript! 🚀
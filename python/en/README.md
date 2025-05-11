### [**Chapter 1: Introduction and Environment Setup**](./saeson1.md)

1. **What Is Programming?**

   * Why Discord and Python?
   * Use cases for Discord bots.
2. **Required Tools**

   * Installing Python and pip.
   * Choosing a code editor (e.g., VS Code or PyCharm).
   * Creating your bot in the Discord Developer Portal.
   * Obtaining your bot token.

---

### [**Chapter 2: Python Fundamentals**](./saeson2.md)

1. **Variables and Data Types**

   * Strings, numbers, booleans, lists, dictionaries.
2. **Operators and Control Flow**

   * Arithmetic, comparison, and logical operators.
   * Conditional statements (`if` / `elif` / `else`).
   * Loops (`for`, `while`).
3. **Functions and Modules**

   * Defining functions.
   * Function inputs and outputs.
   * Using `import` and creating custom modules.

---

### [**Chapter 3: Getting Started with discord.py**](./saeson3.md)

1. **Installation and Setup**

   * Installing the library with `pip install discord.py`.
   * Differences between `discord.py` and `nextcord`.
2. **Bot Structure**

   * The `Bot` class and `Intents`.
   * Core events (`on_ready`, `on_message`).

---

### [**Chapter 4: Building Your First Bot**](./saeson4.md)

1. **Connecting to Discord**

   * Using the token and running the bot.
2. **Responding to Messages**

   * Handling user messages with `on_message`.
   * Ignoring other bots.
3. **Creating Simple Commands**

   * Using a prefix (e.g., `!ping`).

---

### [**Chapter 5: Working with Embeds and Files**](./saeson5.md)

1. **Creating Rich Embeds**

   * Using the `Embed` class.
   * Adding fields, images, and footers.
2. **Sending and Receiving Files**

   * Uploading attachments to Discord.
   * Downloading files from messages.

---

### [**Chapter 6: Advanced Commands (Cogs and Commands)**](./saeson6.md)

1. **Defining Commands with `@commands.command`**

   * Creating prefixed commands.
   * Error handling with `@commands.errors`.
2. **Organizing Code with Cogs**

   * Building Cog classes.
   * Adding Cogs to your bot.

---

### [**Chapter 7: Slash Commands**](./saeson7.md)

1. **Registering Slash Commands**

   * Using `@slash_command`.
   * Syncing commands with Discord.
2. **Command Parameters**

   * Accepting user input (text, numbers, users).

---

### [**Chapter 8: Database Integration**](./saeson8.md)

1. **Storing Data in JSON**

   * Reading from and writing to JSON files.
2. **Using SQLite**

   * Connecting to the database and running queries.
3. **XP Leveling System**

   * Tracking user activity and storing progress.

---

### [**Chapter 9: Server and User Management**](./saeson9.md)

1. **Moderation Commands**

   * Ban, mute, bulk delete.
2. **Working with Roles**

   * Creating, editing, and assigning roles.

---

### [**Chapter 10: Deployment**](./saeson10.md)

1. **Deploying to Cloud Platforms**

   * Using Replit, Heroku, or Railway.
2. **Running on a Linux Server**

   * Managing with PM2 or systemd.
3. **Security and Maintenance**

   * Hiding tokens with `.env`.
   * Keeping libraries up to date.

---

### [**Chapter 11: Practical Projects**](./saeson11.md)

1. **Poll Bot**

   * Reactions-based voting and result analysis.
2. **Music Bot**

   * Joining a voice channel and playing audio.
3. **Mini-Games Bot**

   * Simple games like coin flip, random quiz, and rewards.

---

### **Appendices & Further Resources**

* Official [discord.py Documentation](https://discordpy.readthedocs.io/)
* GitHub repo with example code snippets.
* Support communities (Discord servers, Stack Overflow).

---

### **Key Teaching Guidelines**

* Introduce each chapter with concise, example-driven explanations.
* Use diagrams and screenshots to clarify complex concepts.
* Provide hands-on exercises at the end of each lesson.
* Emphasize debugging techniques and troubleshooting common errors.
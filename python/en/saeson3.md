## Chapter 3: Getting to Know the `discord.py` Library

---

### 3.1 Installing and Setting Up the Library

#### Installing `discord.py`

Open your terminal or CMD and run:

```bash
pip install discord.py
```

> ⚠️ **Note:** If you encounter permission errors, try:
>
> ```bash
> pip install discord.py --user
> ```
>
> or on Linux/macOS:
>
> ```bash
> sudo pip install discord.py
> ```

---

### 3.2 Core Structure of a Python Discord Bot

#### Key Concepts

* **`Bot`**: The core class that manages your bot’s behavior and commands.
* **`Intents`**: Specify which events your bot can receive from Discord (e.g., message events).
* **`commands`**: The module that lets you define prefixed commands (like `!ping`).

---

### 3.3 Writing the Initial Code

#### Step 1: Create `bot.py`

```python
import discord
from discord.ext import commands

# Enable access to message content
intents = discord.Intents.default()
intents.message_content = True

# Create the bot instance with the ! prefix
bot = commands.Bot(command_prefix='!', intents=intents)

# Event: Bot is ready
@bot.event
async def on_ready():
    print(f'✅ Bot {bot.user.name} is now online!')

# Simple ping command
@bot.command()
async def ping(ctx):
    latency = round(bot.latency * 1000)
    await ctx.send(f'🏓 Pong! Latency: {latency}ms')

# Run the bot with your token
bot.run('YOUR_TOKEN_HERE')
```

#### Step 2: Insert Your Token

Replace `'YOUR_TOKEN_HERE'` with the token you copied from the [Discord Developer Portal](https://discord.com/developers/applications).

---

### 3.4 Enabling Intents in the Developer Portal

1. Go to the Discord Developer Portal and select your application.
2. Navigate to **Bot** in the left sidebar.
3. Under **Privileged Gateway Intents**, enable:

   * **Presence Intent** (optional)
   * **Server Members Intent** (optional)
   * **Message Content Intent** (required to read message contents)

---

### 3.5 Running and Testing Your Bot

1. Run your bot:

   ```bash
   python bot.py
   ```
2. In Discord, type `!ping`.
3. If everything is set up correctly, the bot will reply with its latency measurement.

---

### 3.6 Adding More Commands

#### `!hello` Command

```python
@bot.command()
async def hello(ctx):
    await ctx.send(f'Hello {ctx.author.mention}! 😊')
```

#### `!time` Command

```python
from datetime import datetime

@bot.command()
async def time(ctx):
    now = datetime.now().strftime("%H:%M:%S")
    await ctx.send(f'⏰ Current time: {now}')
```

---

### Common Issues & Solutions

* **Bot doesn’t respond to messages**

  * Ensure `intents.message_content = True` in your code and that the Intent is enabled in the portal.
* **`Missing Privileged Intents` error**

  * Double-check you’ve enabled the required Intents in the Developer Portal.
* **Bot won’t go online**

  * Verify your token is correct and your internet connection is active.

---

### Hands-On Exercises for Chapter 3

1. Create a `!user` command that displays the author’s name and ID:

   ```python
   @bot.command()
   async def user(ctx):
       user = ctx.author
       await ctx.send(f'👤 Name: {user.name}\n🆔 ID: {user.id}')
   ```
2. Create a `!coin` command that randomly returns heads or tails:

   ```python
   import random

   @bot.command()
   async def coin(ctx):
       result = random.choice(['Heads', 'Tails'])
       await ctx.send(f'🪙 You got **{result}**!')
   ```

---

### Key Points

* **`ctx` (Context):** Provides details about the command’s invocation (author, channel, guild).
* **Modularize commands** so you can later organize them into Cogs.
* **Keep your token secure**—we’ll use a `.env` file to hide it in Chapter 7.

---

Up next, in Chapter 4 you’ll learn **advanced command handling** and how to work with **Embeds**! 🚀
## Chapter 1: Introduction and Setting Up Your Environment

---

### 1.1 What Is Programming?

Programming means writing instructions that a computer can execute to produce a specific output or behavior.

* **Why Discord and Python?**

  * **Discord** is a popular platform for online communities and supports creating automated bots.
  * **Python** is a simple yet powerful language with excellent libraries—like `discord.py`—for building Discord bots.

---

### 1.2 Required Tools

To get started, you’ll need the following:

#### 1.2.1 Installing Python and pip

1. Visit [Python.org](https://www.python.org).
2. Download and install **Python 3.10 or newer**.
3. During installation, enable **Add Python to PATH**.
4. After installation, open your terminal (or CMD) and verify:

   ```bash
   python --version   # e.g., Python 3.10.6
   pip --version      # e.g., pip 23.1.2
   ```

#### 1.2.2 Code Editor: VS Code

* Download and install VS Code from [here](https://code.visualstudio.com).
* In VS Code’s Extensions panel, install the **Python** extension.

#### 1.2.3 Creating Your Bot on Discord

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, give it a name, and create it.
3. In the left menu, select **Bot** and click **Add Bot**.
4. Copy your bot’s **Token** and keep it somewhere safe (e.g., a temporary text file).

![Bot Creation Steps](https://i.imgur.com/3Q6vz9L.png)

---

### 1.3 Installing `discord.py`

In your terminal or CMD, run:

```bash
pip install discord.py
```

#### Difference Between `discord.py` and `nextcord`

* `nextcord` is a more up-to-date fork of `discord.py` that fixes many issues. To install it instead, run:

  ```bash
  pip install nextcord
  ```

---

### 1.4 Building Your First Bot

Create a file named `bot.py` and paste in this code:

```python
import discord
from discord.ext import commands

# Basic settings
intents = discord.Intents.default()
intents.message_content = True  # Enable reading message content

bot = commands.Bot(command_prefix='!', intents=intents)

# Event: bot is ready
@bot.event
async def on_ready():
    print(f'✅ Bot {bot.user.name} is now online!')

# Simple ping command
@bot.command()
async def ping(ctx):
    await ctx.reply(f'🏓 Pong! Latency: {round(bot.latency * 1000)}ms')

# Run the bot
bot.run('YOUR_TOKEN_HERE')
```

---

### 1.5 Testing Your Bot

1. Replace `'YOUR_TOKEN_HERE'` with your actual token.
2. Run the bot:

   ```bash
   python bot.py
   ```
3. If everything is correct, you’ll see the “online” message in your console.
4. In Discord, type `!ping` in any server channel to see the bot respond.

---

### Hands-On Exercise for Chapter 1

1. Create your own Discord bot and obtain its token.
2. Run the code above and verify it replies to `!ping`.
3. Add a new command—e.g., `!hello`—that sends a greeting back to the user.

---

### Common Issues

* **Bot Doesn’t Go Online**

  * Verify your token is correct.
  * Check your internet connection.
  * Ensure `discord.py` is properly installed.
* **Bot Doesn’t Respond to Messages**

  * Enable `Intents.message_content`.
  * Confirm the bot has been invited to your server.

---

### Key Tips

* **Never** expose your bot token publicly. (We’ll cover using `.env` files in later chapters.)
* For more advanced commands and organization, use the `discord.ext.commands` module.

---

**Next Chapter:** Python Basics—variables, conditionals, loops, and functions! 🐍
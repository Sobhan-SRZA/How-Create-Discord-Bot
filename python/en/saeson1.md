## **Chapter 1: Introduction and Environment Setup**

---

### **1.1 Programming and Discord Bots**

* **Programming** is simply writing instructions that a computer executes.
* **Discord bots** are programs that can operate in Discord servers: managing messages, responding to users, and automating tasks.
* **Why Python?**

  * It’s clear and readable for beginners.
  * The powerful `discord.py` library makes bot development straightforward.

---

### **1.2 Required Tools**

#### **1.2.1 Installing Python and pip**

1. Visit [python.org](https://www.python.org) and download the latest Python release.
2. During installation, check **Add Python to PATH**.
3. After installation, open your terminal or Command Prompt and run:

   ```bash
   python --version    # Should print something like Python 3.11.4
   pip --version       # Should show the pip version
   ```

#### **1.2.2 Installing `discord.py`**

In your terminal, run:

```bash
pip install discord.py
```

#### **1.2.3 Code Editor**

* Recommended: **VS Code** ([Download here](https://code.visualstudio.com)).
* Useful extensions: **Python Extension Pack**, **Pylance**.

---

### **1.3 Creating Your Bot in the Discord Developer Portal**

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, enter a name for your bot.
3. In the left menu select **Bot**, then click **Add Bot**.
4. Copy your bot’s **Token** and keep it private (**never share it!**).
5. Under **OAuth2 → URL Generator**, select the **bot** scope and the permissions your bot needs (e.g., **Send Messages**).
6. Open the generated URL in your browser to invite the bot to your server.

---

### **1.4 Writing Your First Bot**

#### **Step 1: Create the Python File**

Create a file named `bot.py` and paste:

```python
import discord
from discord.ext import commands

# Initial setup
intents = discord.Intents.default()
intents.message_content = True  # Allow reading message content

bot = commands.Bot(command_prefix='!', intents=intents)

# Event: bot is ready
@bot.event
async def on_ready():
    print(f'✅ Bot {bot.user.name} is now online!')

# Simple ping-pong command
@bot.command()
async def ping(ctx):
    await ctx.send('🏓 Pong!')

# Run the bot with your token
bot.run('YOUR_TOKEN_HERE')
```

#### **Step 2: Insert Your Token**

Replace `'YOUR_TOKEN_HERE'` with the token you copied from the Developer Portal.

#### **Step 3: Run the Bot**

In the terminal, execute:

```bash
python bot.py
```

---

### **1.5 Testing Your Bot**

1. Go to the Discord server where you added the bot.
2. Type `!ping` in a text channel.
3. If everything is correct, the bot will reply with `🏓 Pong!`.

---

### **Common Issues**

* **Bot doesn’t go online:**

  * Check your token.
  * Ensure you have an internet connection.
  * Make sure Intents are enabled in the Developer Portal ([Intents Guide](https://discordpy.readthedocs.io/en/stable/intents.html)).
* **`ImportError`:**

  * Verify you installed `discord.py` with pip.

---

### **Hands-On Exercise for Chapter 1**

1. Create a `!hello` command that replies to the user.
2. Add a `!time` command that sends the current time.

**Exercise Example:**

```python
@bot.command()
async def سلام(ctx):
    await ctx.send(f'Hello {ctx.author.mention}! How are you?')
```

---

### **Key Notes**

* **Never** hard-code your token in public code (we’ll secure it with `.env` in later chapters).
* For more advanced commands, leverage the `commands` module from `discord.ext`.

---

Ready for Chapter 2? Next, we’ll cover Python basics! 🐍
## Chapter 3: Getting to Know the `discord.py` Library

---

### 3.1 Introduction to `discord.py`

`discord.py` is a powerful, flexible Python library for building Discord bots. It provides simple tools to interact with the Discord API.

#### Why `discord.py`?

* **Beginner-Friendly:** Clean, readable syntax.
* **Fully Asynchronous:** Efficient handling of concurrent tasks.
* **Excellent Documentation:** The [official docs](https://discordpy.readthedocs.io/) include practical examples.

---

### 3.2 Installation and Setup

#### Installing the Library

In your terminal or CMD, run:

```bash
pip install discord.py
```

#### Alternative Forks

* **nextcord:** A more up-to-date fork of `discord.py` with regular maintenance.

  ```bash
  pip install nextcord
  ```

---

### 3.3 Core Bot Structure

#### 1. Importing Modules

```python
import discord
from discord.ext import commands
```

#### 2. Configuring Intents

Intents determine which Discord events your bot can receive.

```python
intents = discord.Intents.default()
intents.message_content = True  # Grants access to message content
```

#### 3. Creating the Bot Instance

```python
bot = commands.Bot(
    command_prefix='!',  # Command prefix (e.g., !ping)
    intents=intents
)
```

---

### 3.4 Events

Events let your bot react to things like going online or receiving messages.

#### The `on_ready` Event

Fires when the bot has successfully connected to Discord.

```python
@bot.event
async def on_ready():
    print(f'✅ {bot.user.name} is now online!')
```

#### The `on_message` Event

Triggers each time a message is sent in any channel the bot can see.

```python
@bot.event
async def on_message(message):
    if message.author == bot.user:  # Ignore the bot’s own messages
        return

    if message.content == 'hello':
        await message.channel.send('Hello! How are you? 😊')
    
    await bot.process_commands(message)  # Allows command processing
```

---

### 3.5 Simple Commands

Use the `@commands.command()` decorator to define custom commands.

#### The `ping` Command

```python
@bot.command()
async def ping(ctx):
    latency = round(bot.latency * 1000)  # Latency in ms
    await ctx.reply(f'🏓 Pong! Latency: {latency}ms')
```

#### Commands with Parameters

```python
@bot.command()
async def say(ctx, *, text):
    await ctx.send(text)  # Usage: !say Hello World
```

---

### 3.6 Working with Embeds

Embeds are richly formatted message blocks perfect for displaying information.

#### Sending an Embed

```python
@bot.command()
async def info(ctx):
    embed = discord.Embed(
        title="Embed Title",
        description="General description",
        color=discord.Color.blue()
    )
    embed.add_field(name="Field 1", value="Value 1", inline=False)
    embed.set_thumbnail(url=ctx.author.avatar.url)
    
    await ctx.send(embed=embed)
```

---

### Complete Example Bot

```python
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'✅ {bot.user} is now online!')

@bot.command()
async def ping(ctx):
    await ctx.reply(f'🏓 Pong! Latency: {round(bot.latency * 1000)}ms')

bot.run('YOUR_TOKEN_HERE')
```

---

### Hands-On Exercises for Chapter 3

1. Create a command `!time` that sends back the current time.
2. Design an embed that displays the user’s name, ID, and join date.
3. Build a command `!add 5 10` that calculates the sum of two numbers.

---

### Common Issues

* **Bot Doesn’t Respond to Messages:**

  * Ensure `intents.message_content = True`.
  * Use the correct command prefix (`!`).
* **`Missing Intents` Error:**

  * In the [Discord Developer Portal](https://discord.com/developers/applications), enable the required intents.

---

### Key Tips

* **Never** expose your bot token in public code (we’ll cover `.env` in later chapters).
* For more complex bots, organize commands using Cogs (see Chapter 6).
* Keep your library up to date before running:

  ```bash
  pip install --upgrade discord.py
  ```

---

**Next Chapter:** Building your first advanced bot commands! 🚀
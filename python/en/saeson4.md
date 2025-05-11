## Chapter 4: Building Your First Bot

---

### 4.1 Initial Bot Setup

#### 1. Create `main.py`

```python
import discord
from discord.ext import commands
import datetime

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(
    command_prefix="!", 
    intents=intents,
    help_command=None  # Disable the default help command
)
```

#### 2. Add the `on_ready` Event

```python
@bot.event
async def on_ready():
    print(f"✅ {bot.user.name} is now online!")
    print(f"Connected to {len(bot.guilds)} servers")
    print(f"Startup time: {datetime.datetime.now()}")
```

---

### 4.2 Basic Commands

#### 1. The `!hello` Command

```python
@bot.command()
async def سلام(ctx):
    await ctx.reply(f"Hello, {ctx.author.mention}! 😊")
```

#### 2. The `!time` Command

```python
@bot.command()
async def time(ctx):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    await ctx.send(f"🕒 Current time: **{now}**")
```

#### 3. The `!add` Command with Arguments

```python
@bot.command()
async def add(ctx, num1: int, num2: int):
    result = num1 + num2
    await ctx.send(f"Result: `{num1} + {num2} = {result}`")
```

---

### 4.3 Advanced Embeds

#### The `!user` Command

```python
@bot.command()
async def user(ctx, member: discord.Member = None):
    member = member or ctx.author  # Default to the author if no member is mentioned
    
    embed = discord.Embed(
        title=f"ℹ️ Information for {member.name}",
        color=discord.Color.green()
    )
    embed.set_thumbnail(url=member.avatar.url)
    embed.add_field(name="Tag", value=member.mention)
    embed.add_field(name="ID", value=member.id)
    embed.add_field(name="Joined At", value=member.joined_at.strftime("%Y/%m/%d"))
    
    await ctx.send(embed=embed)
```

---

### 4.4 Error Handling

#### Missing Permissions

```python
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ You do not have the required permissions!")
```

#### Missing Required Argument

```python
@add.error
async def add_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("⚠️ Please provide two numbers!\nExample: `!add 5 10`")
```

---

### 4.5 Custom Help Command

```python
@bot.command()
async def help(ctx):
    embed = discord.Embed(
        title="📚 Command List",
        description="Command prefix: `!`",
        color=discord.Color.blue()
    )
    embed.add_field(
        name="General", 
        value="`hello` `time` `user [@mention]`",
        inline=False
    )
    embed.add_field(
        name="Math", 
        value="`add <num1> <num2>`",
        inline=False
    )
    
    await ctx.send(embed=embed)
```

---

### 4.6 Running the Bot

```python
# In Chapter 7 we'll cover using a .env file
TOKEN = "YOUR_TOKEN_HERE"

if __name__ == "__main__":
    bot.run(TOKEN)
```

---

### Hands-On Exercises for Chapter 4

1. Create a `!coin` command that flips a coin and returns heads or tails.
2. Implement a `!purge` command that deletes a specified number of messages (requires Manage Messages permission).
3. Set up a welcome message event so the bot greets new members when they join:

   ```python
   @bot.event
   async def on_member_join(member):
       channel = member.guild.system_channel
       await channel.send(f"🎉 Welcome to the server, {member.mention}!")
   ```

---

### Common Issues & Solutions

* **Commands Aren’t Running**

  * Ensure `intents.message_content = True` is set.
  * Restart the bot after changes (`Ctrl+C` and `python main.py`).
* **Bot Can’t Mention Members**

  * In the Developer Portal, enable the **Server Members Intent** for your bot.

---

### Key Tips

* Use `ctx.reply()` instead of `ctx.send()` when you want to mention the user.
* Accept `discord.Member` parameters to automatically convert mentions into Member objects.
* Handle errors with `@bot.event` and `on_command_error` for better user feedback.

---

**Next Chapter:** Working with Embeds, file attachments, and more! 🚀
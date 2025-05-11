## Chapter 7: Slash Commands

---

### 7.1 Introduction to Slash Commands

Slash commands (prefixed with `/`) provide a modern, user-friendly interface for interacting with Discord bots.

* **Benefits:**

  * No need for a text prefix (`!`, `?`, etc.).
  * Built-in UI with command suggestions and auto-complete.
  * Structured parameters (text, numbers, users, channels, etc.).

---

### 7.2 Initial Setup

#### Enabling Slash Commands

1. In the Discord Developer Portal, under your application’s **Bot** settings, enable the following privileged gateway intents:

   * **Server Members Intent**
   * **Message Content Intent**
2. In your code, import the app\_commands module:

   ```python
   from discord import app_commands
   ```

---

### 7.3 Creating Your First Slash Command

#### The `/ping` Command

```python
@bot.tree.command(name="ping", description="Check the bot’s latency")
async def ping(interaction: discord.Interaction):
    latency = round(bot.latency * 1000)
    await interaction.response.send_message(f"🏓 Pong! Latency: {latency}ms")
```

---

### 7.4 Registering and Syncing Commands

Slash commands must be synced with Discord before they appear.

#### 1. Sync commands to a specific guild (fast updates):

```python
@bot.command()
@commands.is_owner()
async def sync(interaction: discord.Interaction):
    await bot.tree.sync(guild=discord.Object(id=GUILD_ID))  # replace GUILD_ID
    await interaction.response.send_message("✅ Commands synced to this server!")
```

#### 2. Sync globally (available in all guilds):

```python
@bot.command()
@commands.is_owner()
async def sync_global(interaction: discord.Interaction):
    await bot.tree.sync()
    await interaction.response.send_message("✅ Global commands synced!")
```

---

### 7.5 Advanced Parameters

#### 1. Taking User Input

```python
@bot.tree.command(name="add", description="Add two numbers")
@app_commands.describe(a="First number", b="Second number")
async def add(interaction: discord.Interaction, a: int, b: int):
    await interaction.response.send_message(f"Result: {a + b}")
```

#### 2. Auto-Complete Suggestions

```python
@bot.tree.command(name="color", description="Choose a color")
@app_commands.describe(color="Select a color")
@app_commands.autocomplete(color=autocomplete_color)
async def color(interaction: discord.Interaction, color: str):
    await interaction.response.send_message(f"Selected color: {color}")

async def autocomplete_color(interaction: discord.Interaction, current: str) -> list[app_commands.Choice[str]]:
    options = ["Red", "Blue", "Green", "Yellow"]
    return [
        app_commands.Choice(name=opt, value=opt)
        for opt in options if current.lower() in opt.lower()
    ]
```

---

### 7.6 Hybrid Commands

Commands that work both as slash commands and with a prefix:

```python
from discord.ext import commands

@commands.hybrid_command(name="ban", description="Ban a member")
@app_commands.describe(member="The member to ban")
@commands.has_permissions(ban_members=True)
async def ban(ctx: commands.Context, member: discord.Member):
    await member.ban()
    await ctx.send(f"✅ {member.mention} has been banned!")
```

---

### 7.7 Error Handling

#### Missing Permissions Error

```python
@ban.error
async def ban_error(ctx: commands.Context, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ You don’t have permission to ban members!")
```

---

### Hands-On Exercises for Chapter 7

1. Create a `/time` command that displays the current time.
2. Build a `/poll [question]` command that posts a reaction-based poll.
3. Implement an auto-complete command for `/weather [city]` with suggestions like “Tehran,” “Isfahan,” “Shiraz.”

---

### Common Issues

* **Slash commands not appearing:**

  * Ensure you call `await bot.tree.sync()` after logging in.
  * Wait up to 24 hours for global commands to propagate.
* **Bot doesn’t respond to commands:**

  * Make sure you have an `on_ready` event to sync commands.
  * Double-check your intents in the Developer Portal.

---

### Key Tips

* During development, sync commands to a test server for instant updates.
* Always use `interaction.response.send_message()` instead of `channel.send()`.
* Define parameters with types (`discord.Member`, `int`, etc.) for built-in validation.

---

**Next Chapter:** Database integration and persistent user data! 🗄️
## Chapter 4: Advanced Commands and Working with Embeds

---

### 4.1 Creating Professional Embeds

Embeds let you send richly formatted, structured messages. You build them with the `Embed` class:

```python
from discord import Embed

@bot.command()
async def info(ctx):
    user = ctx.author
    embed = Embed(
        title="📊 User Information",
        description=f"Hello, {user.mention}!",
        color=0x00ff00  # HEX color code
    )
    embed.add_field(
        name="Date Joined",
        value=user.joined_at.strftime("%Y-%m-%d"),
        inline=True
    )
    embed.add_field(
        name="User ID",
        value=user.id,
        inline=True
    )
    embed.set_thumbnail(url=user.avatar.url)

    await ctx.send(embed=embed)
```

* **Title & Description:** Give your embed a clear heading and a greeting.
* **Fields:** Use `add_field` (or `add_fields`) to display key–value pairs; `inline=True` shows them side by side.
* **Thumbnail:** Display the user's avatar with `set_thumbnail`.
* **Color:** Choose a HEX color for the side strip.

---

### 4.2 Sending and Receiving Files

#### Uploading Attachments from Users

```python
@bot.command()
async def upload(ctx):
    if ctx.message.attachments:
        # Save the first attachment to disk
        await ctx.message.attachments[0].save("file.png")
        await ctx.send("✅ File saved successfully!")
    else:
        await ctx.send("❌ Please attach a file!")
```

#### Sending Files from the Bot

```python
@bot.command()
async def download(ctx):
    with open("file.png", "rb") as f:
        file = discord.File(f)
        await ctx.send(file=file)
```

* **Attachments list:** `ctx.message.attachments` holds any files the user attached.
* **discord.File:** Wrap a file object to send it back to the channel.

---

### 4.3 Organizing Your Code with Cogs

Cogs let you split your bot’s features into modular, reusable components.

#### Steps to Create a Cog

1. **Create `cogs/my_cog.py`:**

   ```python
   from discord.ext import commands

   class MyCog(commands.Cog):
       def __init__(self, bot):
           self.bot = bot

       @commands.command()
       async def test(self, ctx):
           await ctx.send("This is a test command!")

   async def setup(bot):
       await bot.add_cog(MyCog(bot))
   ```

2. **Load the Cog in `bot.py`:**

   ```python
   import asyncio

   async def main():
       await bot.load_extension("cogs.my_cog")
       await bot.start("YOUR_TOKEN_HERE")

   asyncio.run(main())
   ```

* **Separation of concerns:** Each Cog handles related commands and events.
* **Dynamic loading:** You can load or unload Cogs at runtime.

---

### 4.4 Error Handling

#### Permission Checks

```python
@bot.command()
async def purge(ctx, amount: int):
    if not ctx.author.guild_permissions.manage_messages:
        await ctx.send("❌ You don’t have permission to manage messages!")
        return
    await ctx.channel.purge(limit=amount + 1)
```

#### Global Command Error Handler

```python
from discord.ext import commands

@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("⚠️ You’re missing a required argument!")
    else:
        # Log or handle other errors
        raise error
```

* **Check permissions:** Use `ctx.author.guild_permissions` or decorators like `@commands.has_permissions()`.
* **Centralized errors:** `on_command_error` catches exceptions so your bot won’t crash.

---

### Hands-On Exercises for Chapter 4

1. **`!level` Command:**
   Create an embed that visually displays the user’s level (e.g., progress bar or icon).
2. **`!avatar` Command:**
   Show a larger version of the user’s avatar inside an embed.
3. **Modularize with Cogs:**
   Move all your commands into a new Cog file and load it dynamically.

---

### Common Pitfalls

* **Embed not showing:** Be sure to call `ctx.send(embed=embed)`, not `ctx.send(embed)`.
* **File Not Found:** Double-check your file paths when opening or saving files.
* **Cog fails to load:** Verify the dotted path in `load_extension()` matches your folder structure.

---

### Pro Tips

* **Use HEX for colors:** e.g., `0x3498db` for a nice blue.
* **Control layout:** `inline=False` forces fields onto separate lines.
* **Restrict commands:** Decorators like `@commands.has_permissions(kick_members=True)` help enforce security.

---

Up next in Chapter 5: **Slash Commands** and **Database Integration**! 🚀
## Chapter 6: Advanced Commands (Cogs and Command Decorators)

---

### 6.1 Introducing Cogs (Modular Code Organization)

Cogs are classes that group commands, events, and configuration into modules, making your code cleaner and easier to maintain.

#### Benefits of Using Cogs

* Cleaner, more maintainable code
* Ability to load/unload commands without restarting the bot
* Separate error handling per module

---

### 6.2 Creating Your First Cog

#### 1. Create `cogs/moderate.py`

```python
from discord.ext import commands

class Moderate(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Purge messages command
    @commands.command()
    @commands.has_permissions(manage_messages=True)
    async def purge(self, ctx, limit: int = 10):
        await ctx.channel.purge(limit=limit + 1)  # +1 to delete the command message
        msg = await ctx.send(f"✅ Deleted {limit} messages!", delete_after=5)

    # Error handler for missing permissions
    @purge.error
    async def purge_error(self, ctx, error):
        if isinstance(error, commands.MissingPermissions):
            await ctx.send("⛔ You don’t have permission to manage messages!")
            
async def setup(bot):
    await bot.add_cog(Moderate(bot))
```

#### 2. Load the Cog in `main.py`

```python
async def main():
    await bot.load_extension("cogs.moderate")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
    bot.run(TOKEN)
```

---

### 6.3 Advanced Command Decorators

#### 1. User and Permission Checks

```python
@commands.has_role("Admin")                # Requires a specific role
@commands.has_permissions(kick_members=True)  # Requires specific permission
@commands.is_owner()                      # Only the bot owner can use
```

#### 2. Command Cooldowns

```python
@commands.cooldown(rate=1, per=30, type=commands.BucketType.user)  # 30-second cooldown per user
async def claim_reward(ctx):
    await ctx.send("🎉 You received 100 coins!")
```

#### 3. Hybrid Commands (Slash + Prefix)

```python
from discord import app_commands

@commands.hybrid_command(name="ban", description="Ban a user")
@app_commands.describe(user="The member to ban")
async def ban(ctx, user: discord.Member):
    await user.ban()
    await ctx.send(f"✅ {user.mention} has been banned!")
```

---

### 6.4 Global Error Handling in Cogs

```python
class Moderate(commands.Cog):
    # ...

    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandNotFound):
            await ctx.send("❌ Command not found!")
```

---

### 6.5 Building a Custom Help Command

```python
class Help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="help")
    async def help(self, ctx):
        embed = discord.Embed(title="📚 Help Menu")
        for cog_name, cog in self.bot.cogs.items():
            command_list = [f"`{cmd.name}`" for cmd in cog.get_commands()]
            embed.add_field(name=cog_name, value=" ".join(command_list) or "No commands", inline=False)
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Help(bot))
```

---

### 6.6 Hands-On Exercises

1. Create a new Cog named `Fun` and move commands like `coin` and `number` into it.
2. Convert the `!ban` command into a slash-only command.
3. Build a `!claim` command with a per-user cooldown of 3 uses per hour.

---

### Common Issues

* **Cog fails to load**:

  * Verify the file path (`cogs/moderate.py`) is correct.
  * Confirm you’re calling `await bot.load_extension("cogs.moderate")`.
* **Commands don’t appear**:

  * Ensure each command method is decorated with `@commands.command()` or `@commands.hybrid_command()`.

---

### Pro Tips

* Keep each Cog in its own file for clarity.
* Pick a consistent language (English or another) for command names.
* Use `@commands.check()` for custom validation logic.

---

**Next Chapter:** Slash Commands and Modern Interactions! ✨
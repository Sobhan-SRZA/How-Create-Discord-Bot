## Chapter 9: Server and User Management

---

### 9.1 Required Permissions

To manage servers and members, your bot needs the appropriate permissions. You can configure these in code or in the Discord Developer Portal.

#### Enabling Intents

* **Server Members Intent**: Access to the member list.
* **Moderation Intents**: For muting or banning users.

#### Setting Permissions in Code

```python
intents = discord.Intents.default()
intents.members = True           # Access to guild members
intents.moderation = True        # Access to moderation actions

bot = commands.Bot(
    command_prefix="!",
    intents=intents
)
```

---

### 9.2 Member Management Commands

#### 1. Ban Command

```python
@bot.command()
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, reason: str = "No reason provided"):
    await member.ban(reason=reason)
    await ctx.send(f"✅ {member.mention} was banned!\nReason: **{reason}**")

@ban.error
async def ban_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ You don’t have permission to ban members!")
```

#### 2. Unban Command

```python
@bot.command()
@commands.has_permissions(ban_members=True)
async def unban(ctx, user_id: int):
    user = await bot.fetch_user(user_id)
    await ctx.guild.unban(user)
    await ctx.send(f"✅ {user.mention} was unbanned!")
```

#### 3. Mute Command

```python
@bot.command()
@commands.has_permissions(moderate_members=True)
async def mute(ctx, member: discord.Member, minutes: int = 10):
    duration = datetime.timedelta(minutes=minutes)
    await member.timeout(duration)
    await ctx.send(f"⏳ {member.mention} has been muted for **{minutes} minutes**!")
```

---

### 9.3 Message Management

#### 1. Purge Command

```python
@bot.command()
@commands.has_permissions(manage_messages=True)
async def purge(ctx, limit: int = 10):
    await ctx.channel.purge(limit=limit + 1)  # +1 to include the command message
    msg = await ctx.send(f"✅ Deleted {limit} messages!", delete_after=5)

@purge.error
async def purge_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ You don’t have permission to manage messages!")
```

#### 2. Report Message Command

```python
@bot.command()
async def report(ctx, message_id: int):
    message = await ctx.channel.fetch_message(message_id)
    embed = discord.Embed(
        title="⚠️ Message Report",
        description=message.content,
        color=discord.Color.red()
    )
    embed.set_author(name=message.author.name, icon_url=message.author.avatar.url)
    admin_channel = bot.get_channel(ADMIN_CHANNEL_ID)  # replace with your admin channel ID
    await admin_channel.send(embed=embed)
```

---

### 9.4 Role Management

#### 1. Add Role to a Member

```python
@bot.command()
@commands.has_permissions(manage_roles=True)
async def add_role(ctx, member: discord.Member, role: discord.Role):
    await member.add_roles(role)
    await ctx.send(f"✅ Role {role.mention} added to {member.mention}!")
```

#### 2. Create a New Role

```python
@bot.command()
@commands.has_permissions(manage_roles=True)
async def create_role(ctx, name: str, color: str = "FFFFFF"):
    color_int = int(color, 16)  # Convert HEX to int
    await ctx.guild.create_role(name=name, color=discord.Color(color_int))
    await ctx.send(f"✅ Role **{name}** has been created!")
```

---

### 9.5 Ticket System

#### 1. Create a Ticket Channel

```python
@bot.command()
@commands.has_permissions(manage_channels=True)
async def ticket(ctx, reason: str):
    overwrites = {
        ctx.guild.default_role: discord.PermissionOverwrite(read_messages=False),
        ctx.author: discord.PermissionOverwrite(read_messages=True)
    }
    channel = await ctx.guild.create_text_channel(
        name=f"ticket-{ctx.author.name}",
        overwrites=overwrites
    )
    await channel.send(f"📩 Your ticket was created for reason: **{reason}**")
```

#### 2. Close a Ticket

```python
@bot.command()
async def close(ctx):
    if "ticket-" in ctx.channel.name:
        await ctx.channel.delete()
```

---

### Hands-On Exercises for Chapter 9

1. **Activity Leaderboard:** Create a command that ranks members by message count.
2. **Mute Logging:** When muting a member, log the reason in a designated channel.
3. **Create Channel Command:** Build `!create_channel [name]` to create a new text channel.

---

### Common Issues

* **Bot Can’t Ban/Mute Members:**

  * Ensure the bot’s role is higher than the target member’s role in the server hierarchy.
  * Verify the bot has the necessary permissions in the server settings.
* **Missing Permissions Error:**

  * Use the `@commands.has_permissions()` decorator on your command.

---

### Security Best Practices

* Avoid granting **Administrator** permissions to your bot unless absolutely necessary.
* For sensitive commands, consider implementing a two-factor verification system for moderators.
* Log all moderation actions to a secure, private channel for audit purposes.

---

**Next Chapter:** Professional Deployment and Maintenance! 🚀
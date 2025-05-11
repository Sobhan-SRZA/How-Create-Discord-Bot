## Chapter 5: Working with Embeds and Files

---

### 5.1 Creating Professional Embeds

Embeds are richly formatted messages that display information in an organized, visually appealing way.

#### Building a Simple Embed

```python
from discord import Embed

@bot.command()
async def announcement(ctx):
    embed = Embed(
        title="📢 Important Announcement",
        description="Welcome to our server!",
        color=0x00FF00  # HEX color code (green)
    )
    embed.set_author(name=ctx.author.display_name, icon_url=ctx.author.avatar.url)
    await ctx.send(embed=embed)
```

#### Adding Fields and an Image

```python
@bot.command()
async def profile(ctx, member: discord.Member = None):
    member = member or ctx.author
    
    embed = Embed(
        title=f"📁 {member.name}'s Profile",
        color=discord.Color.blurple()
    )
    embed.set_thumbnail(url=member.avatar.url)
    embed.add_field(
        name="Joined On", 
        value=member.joined_at.strftime("%Y/%m/%d"), 
        inline=False
    )
    embed.add_field(
        name="Role Count", 
        value=len(member.roles), 
        inline=True
    )
    embed.set_image(url="https://example.com/banner.png")  # Banner at bottom
    
    await ctx.send(embed=embed)
```

---

### 5.2 Sending and Receiving Files

#### 1. Sending a Local File

```python
@bot.command()
async def send_image(ctx):
    file = discord.File("path/to/image.jpg", filename="image.jpg")
    await ctx.send(file=file)
```

#### 2. Downloading and Sending a Remote File

```python
import aiohttp
from io import BytesIO

@bot.command()
async def download(ctx, url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status == 200:
                data = await resp.read()
                file = discord.File(BytesIO(data), filename="download.png")
                await ctx.send(file=file)
```

#### 3. Saving User-Uploaded Attachments

```python
@bot.event
async def on_message(message):
    if message.attachments:
        attachment = message.attachments[0]
        await attachment.save(f"downloads/{attachment.filename}")
        await message.channel.send("✅ File saved!")
    await bot.process_commands(message)
```

---

### 5.3 Combining Embeds with Attachments

You can send an embed and a file together:

```python
@bot.command()
async def card(ctx):
    embed = Embed(title="🎴 Special Card", color=0xFFD700)
    embed.set_image(url="attachment://card.png")  # Reference the attached file
    
    file = discord.File("images/card.png", filename="card.png")
    await ctx.send(embed=embed, file=file)
```

---

### 5.4 Dynamic Embeds with Live Data

#### Example: Displaying Server Info

```python
@bot.command()
async def server(ctx):
    guild = ctx.guild
    embed = Embed(title=guild.name, description=guild.description or "No description")
    embed.add_field(name="Member Count", value=guild.member_count)
    embed.add_field(name="Owner", value=guild.owner.mention)
    if guild.icon:
        embed.set_thumbnail(url=guild.icon.url)
    
    await ctx.send(embed=embed)
```

---

### Hands-On Exercises for Chapter 5

1. **Meme Generator**: Create a `!meme [text]` command that downloads a base image and overlays the user’s text on it using the Pillow library.
2. **Attachment Preview**: Automatically display any user-uploaded image inside an embed when they send it.
3. **Stats Command**: Build a `!stats` command that shows the user’s message count in an embed.

---

### Common Issues

* **File Doesn’t Send**:

  * Verify the file path is correct.
  * Ensure you specify the file extension (e.g., `.jpg`) in `filename`.
* **Embed Image Not Showing**:

  * Use `attachment://filename.extension` in `set_image`.
  * Make sure the file is attached to the same message as the embed.

---

### Key Tips

* You can specify embed colors using HEX codes or Discord’s built-in color helpers (e.g., `discord.Color.red()`).
* Discord limits attachment size to **8 MB** on free accounts.
* For image processing, install Pillow:

  ```bash
  pip install pillow
  ```

---

**Next Chapter:** Organizing your code with Cogs and creating more advanced commands! 🛠️
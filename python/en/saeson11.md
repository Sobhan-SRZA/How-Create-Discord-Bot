## Chapter 11: Practical Projects to Solidify Your Skills

---

### Project 1: Poll Bot

**Goal:** Build a bot that, with the `/poll` command, creates a customizable poll and processes the results.

#### Implementation Steps:

1. **Register the Slash Command**

   ```python
   @bot.tree.command(name="poll", description="Create a poll")
   @app_commands.describe(question="The poll question", options="Comma-separated choices")
   async def poll(interaction: discord.Interaction, question: str, options: str):
       choices = [opt.strip() for opt in options.split(",")]
   ```
2. **Build the Embed & Add Reactions**

   ```python
   embed = discord.Embed(title=question, color=0x5865F2)
   for idx, choice in enumerate(choices, start=1):
       embed.add_field(name=f"Option {idx}", value=choice, inline=False)

   poll_msg = await interaction.channel.send(embed=embed)
   for emoji in ["1️⃣", "2️⃣", "3️⃣", "4️⃣"][:len(choices)]:
       await poll_msg.add_reaction(emoji)
   ```

---

### Project 2: Music Bot

**Goal:** Create a bot that joins a voice channel and plays music from YouTube.

#### Implementation Steps:

1. **Install Required Libraries**

   ```bash
   pip install yt-dlp discord.py[voice]
   ```
2. **Connect to Voice Channel & Play Audio**

   ```python
   @bot.command()
   async def play(ctx, url: str):
       if not ctx.author.voice:
           return await ctx.send("Please join a voice channel first!")
       channel = ctx.author.voice.channel
       voice_client = await channel.connect()

       ydl_opts = {"format": "bestaudio"}
       with yt_dlp.YoutubeDL(ydl_opts) as ydl:
           info = ydl.extract_info(url, download=False)
           audio_url = info["url"]

       voice_client.play(discord.FFmpegPCMAudio(audio_url))
       await ctx.send(f"🎶 Now playing: **{info['title']}**")
   ```

---

### Project 3: XP Leveling System

**Goal:** Track user activity and award levels based on XP.

#### Implementation Steps:

1. **Update XP in SQLite**

   ```python
   async def update_xp(user_id: int):
       async with aiosqlite.connect("xp.db") as db:
           await db.execute("""
               INSERT INTO users (user_id, xp)
               VALUES (?, 10)
               ON CONFLICT(user_id) DO UPDATE
               SET xp = xp + 10
           """, (user_id,))
           await db.commit()
   ```
2. **Check for Level Up**

   ```python
   @bot.event
   async def on_message(message):
       if message.author.bot:
           return
       await update_xp(message.author.id)
       user_xp = await get_xp(message.author.id)
       if user_xp >= 100:
           await message.channel.send(f"🎉 {message.author.mention} reached a new level!")
       await bot.process_commands(message)
   ```

---

### Project 4: Ticket System

**Goal:** Let users create private support tickets with `/ticket`.

#### Implementation Steps:

1. **Create the Ticket Channel**

   ```python
   @bot.tree.command(name="ticket", description="Open a support ticket")
   async def ticket(interaction: discord.Interaction):
       overwrites = {
           interaction.guild.default_role: discord.PermissionOverwrite(read_messages=False),
           interaction.user: discord.PermissionOverwrite(read_messages=True)
       }
       ticket_chan = await interaction.guild.create_text_channel(
           name=f"ticket-{interaction.user.name}",
           overwrites=overwrites
       )
       await ticket_chan.send(f"📩 {interaction.user.mention}, your ticket has been created!")
   ```

---

### Project 5: Mini-Games Bot

**Goal:** Implement simple interactive games.

#### Suggested Commands:

1. **Coin Flip**

   ```python
   @bot.command()
   async def coin(ctx):
       result = random.choice(["Heads", "Tails"])
       await ctx.send(f"🪙 Result: **{result}**")
   ```
2. **Random Number**

   ```python
   @bot.command()
   async def number(ctx, minimum: int, maximum: int):
       num = random.randint(minimum, maximum)
       await ctx.send(f"🎲 Your random number is **{num}**")
   ```

---

### Additional Challenges

1. **Weather Bot**

   * `/weather [city]` fetches and displays weather data from an API.
2. **Dictionary Bot**

   * `/define [word]` retrieves definitions from an online dictionary API.
3. **Virtual Economy Bot**

   * Use `!work` and `!buy` commands to earn and spend virtual currency on items.

---

### Common Issues & Solutions

* **Poll Bot Doesn’t Handle Reactions:**

  * Implement `on_raw_reaction_add` to catch reactions across messages.
  * Enable the `Intents.reactions` if required.
* **Music Bot Audio Errors:**

  * Ensure FFmpeg is installed (`sudo apt install ffmpeg`).
  * Validate usage of `discord.FFmpegPCMAudio`.

---

### Final Tips

* Organize projects modularly—each command in its own file.
* Use GitHub for version control and team collaboration.
* For more ideas, see [Awesome Discord Bots Best Practices](https://github.com/meew0/discord-bot-best-practices).

---

**Good luck!** 🚀
Completing these projects makes you a professional Discord bot developer. Join the community, share your ideas, and bring them to life!
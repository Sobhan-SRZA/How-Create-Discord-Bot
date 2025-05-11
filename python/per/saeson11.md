    **فصل ۱۱: پروژههای عملی برای تثبیت مهارتها**  

    ---

    ### **پروژه ۱: ربات نظرسنجی (Poll Bot)**  
    **هدف**: ساخت رباتی که با دستور `/نظرسنجی` یک نظرسنجی با گزینههای دلخواه ایجاد کند و نتایج را تحلیل کند.  

    #### **مراحل پیادهسازی**:  
    ۱. **ثبت دستور اسلشی**:  
    ```python
    @bot.tree.command(name="نظرسنجی", description="ایجاد نظرسنجی")
    @app_commands.describe(سوال="متن سوال", گزینه_ها="گزینهها (با ویرگول جدا کنید)")
    async def نظرسنجی(interaction: discord.Interaction, سوال: str, گزینه_ها: str):
        options = [opt.strip() for opt in گزینه_ها.split(",")]
    ```  

    ۲. **ساخت Embed و افزودن Reactions**:  
    ```python
    embed = discord.Embed(title=سوال, color=0x5865F2)
    for i, option in enumerate(options):
        embed.add_field(name=f"گزینه {i+1}", value=option, inline=False)
    
    poll_msg = await interaction.channel.send(embed=embed)
    for emoji in ["1️⃣", "2️⃣", "3️⃣", "4️⃣"]:
        await poll_msg.add_reaction(emoji)
    ```  

    ---

    ### **پروژه ۲: ربات موزیک (Music Bot)**  
    **هدف**: ساخت رباتی که به کانال صوتی متصل شود و آهنگ از یوتیوب پخش کند.  

    #### **مراحل پیادهسازی**:  
    ۱. **نصب کتابخانههای مورد نیاز**:  
    ```bash
    pip install yt-dlp discord.py[voice]
    ```  

    ۲. **اتصال به کانال صوتی و پخش آهنگ**:  
    ```python
    @bot.command()
    async def پخش(ctx, url: str):
        voice_channel = ctx.author.voice.channel
        voice_client = await voice_channel.connect()
        
        ydl_opts = {"format": "bestaudio"}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            audio_url = info["url"]
            
        voice_client.play(discord.FFmpegPCMAudio(audio_url))
        await ctx.send(f"🎶 در حال پخش: **{info['title']}**")
    ```  

    ---

    ### **پروژه ۳: سیستم سطحبندی (XP System)**  
    **هدف**: ساخت سیستمی که فعالیت کاربران را ردیابی کند و بر اساس XP به آنها سطح اختصاص دهد.  

    #### **مراحل پیادهسازی**:  
    ۱. **ذخیره دادهها در SQLite**:  
    ```python
    async def update_xp(user_id: int):
        async with aiosqlite.connect("xp.db") as db:
            await db.execute("""
                INSERT INTO users (user_id, xp) 
                VALUES (?, 10)
                ON CONFLICT(user_id) DO UPDATE SET xp = xp + 10
            """, (user_id,))
            await db.commit()
    ```  

    ۲. **بررسی ارتقا سطح**:  
    ```python
    @bot.event
    async def on_message(message):
        if message.author.bot:
            return
        await update_xp(message.author.id)
        user_xp = await get_xp(message.author.id)
        if user_xp >= 100:
            await message.channel.send(f"🎉 {message.author.mention} به سطح جدید رسید!")
    ```  

    ---

    ### **پروژه ۴: سیستم تیکت (Ticket System)**  
    **هدف**: ساخت سیستمی که کاربران با دستور `/تیکت` یک کانال خصوصی برای پشتیبانی ایجاد کنند.  

    #### **مراحل پیادهسازی**:  
    ۱. **ساخت کانال تیکت**:  
    ```python
    @bot.tree.command(name="تیکت", description="ایجاد تیکت پشتیبانی")
    async def تیکت(interaction: discord.Interaction):
        overwrites = {
            interaction.guild.default_role: discord.PermissionOverwrite(read_messages=False),
            interaction.user: discord.PermissionOverwrite(read_messages=True)
        }
        ticket_channel = await interaction.guild.create_text_channel(
            name=f"تیکت-{interaction.user.name}",
            overwrites=overwrites
        )
        await ticket_channel.send(f"📩 {interaction.user.mention} تیکت شما ایجاد شد!")
    ```  

    ---

    ### **پروژه ۵: ربات مینیگیم (سکه، شانس، جوایز)**  
    **هدف**: ساخت بازیهای ساده برای تعامل با کاربران.  

    #### **دستورات پیشنهادی**:  
    ۱. **سکه**:  
    ```python
    @bot.command()
    async def سکه(ctx):
        result = random.choice(["رو", "پشت"])
        await ctx.send(f"🪙 نتیجه: **{result}**")
    ```  

    ۲. **شماره تصادفی**:  
    ```python
    @bot.command()
    async def شماره(ctx, حداقل: int, حداکثر: int):
        num = random.randint(حداقل, حداکثر)
        await ctx.send(f"🎲 شماره تصادفی: **{num}**")
    ```  

    ---

    ### **تمرینهای تکمیلی**:  
    ۱. **ربات آبوهوا**:  
    - با دستور `/آبوهوا [شهر]` اطلاعات آبوهوا را از API دریافت و نمایش دهید.  

    ۲. **ربات واژهیاب**:  
    - با دستور `/معنی [کلمه]` معنی کلمه را از فرهنگنامه آنلاین استخراج کنید.  

    ۳. **ربات اقتصاد مجازی**:  
    - کاربران با دستورات `!کار` و `!خرید` سکه مجازی جمعآوری کنند و آیتم بخرند.  

    ---

    ### **مشکلات رایج و راهحلها**:  
    - **ربات به Reactions پاسخ نمیدهد**:  
    - مطمئن شوید `on_raw_reaction_add` را پیادهسازی کردهاید.  
    - Intentهای لازم (مثلاً `Intents.reactions`) را فعال کنید.  
    - **خطای صدا در ربات موزیک**:  
    - FFmpeg را نصب کنید (`sudo apt install ffmpeg`).  
    - از `discord.FFmpegPCMAudio` بهدرستی استفاده کنید.  

    ---

    ### **نکات پایانی**:  
    - پروژهها را بهصورت **ماژولار** و در فایلهای جداگانه سازماندهی کنید.  
    - از **GitHub** برای مدیریت نسخهها و همکاری تیمی استفاده کنید.  
    - برای ایدههای بیشتر، به [Awesome Discord Bots](https://github.com/meew0/discord-bot-best-practices) مراجعه کنید.  

    --- 

    **موفق باشید!** 🚀  
    با تکمیل این پروژهها، شما حالا یک توسعهدهنده حرفهای رباتهای دیسکورد هستید. به جامعه توسعهدهندگان بپیوندید و ایدههای خود را به واقعیت تبدیل کنید!
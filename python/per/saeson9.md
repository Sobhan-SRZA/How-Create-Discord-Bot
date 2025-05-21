**فصل ۹: مدیریت سرور و کاربران**  

---

### **۹.۱ دسترسی های مورد نیاز (Permissions)**  
برای مدیریت سرور و کاربران، ربات باید **دسترسی های لازم** را داشته باشد. این دسترسی ها را میتوان در کد یا پنل توسعه دهندگان دیسکورد تنظیم کرد.  

#### **فعال سازی اینتنت ها**:  
- **Server Members Intent**: برای دسترسی به لیست اعضا.  
- **Moderate Members**: برای میوت یا بن کردن کاربران.  

#### **تعیین دسترسی ها در کد**:  

```python
intents = discord.Intents.default()
intents.members = True  # دسترسی به اعضا
intents.moderation = True  # دسترسی به مدیریت کاربران

bot = commands.Bot(
    command_prefix="!",
    intents=intents
)
```

---

### **۹.۲ دستورات مدیریت کاربران**  
#### **۱. بن کردن (Ban)**:  

```python
@bot.command()
@commands.has_permissions(ban_members=True)
async def بن(ctx, member: discord.Member, reason: str = "دلیل مشخص نشده"):
    await member.ban(reason=reason)
    await ctx.send(f"✅ {member.mention} با موفقیت بن شد!\nدلیل: **{reason}**")

@بن.error
async def بن_خطا(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ شما دسترسی بن کردن کاربران را ندارید!")
```

#### **۲. آنبن کردن (Unban)**:  

```python
@bot.command()
@commands.has_permissions(ban_members=True)
async def آنبن(ctx, user_id: int):
    user = await bot.fetch_user(user_id)
    await ctx.guild.unban(user)
    await ctx.send(f"✅ {user.mention} آنبن شد!")
```

#### **۳. میوت کردن (Mute)**:  

```python
@bot.command()
@commands.has_permissions(moderate_members=True)
async def میوت(ctx, member: discord.Member, minutes: int = 10):
    duration = datetime.timedelta(minutes=minutes)
    await member.timeout(duration)
    await ctx.send(f"⏳ {member.mention} به مدت **{minutes} دقیقه** میوت شد!")
```

---

### **۹.۳ مدیریت پیام ها**  
#### **۱. پاک کردن پیام ها (Purge)**:  

```python
@bot.command()
@commands.has_permissions(manage_messages=True)
async def پاککن(ctx, limit: int = 10):
    await ctx.channel.purge(limit=limit + 1)  # +1 برای حذف دستور
    msg = await ctx.send(f"✅ {limit} پیام پاک شد!", delete_after=5)

@پاککن.error
async def پاککن_خطا(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ شما دسترسی مدیریت پیام ها را ندارید!")
```

#### **۲. گزارش پیام (Report)**:  

```python
@bot.command()
async def گزارش(ctx, message_id: str):
    message = await ctx.channel.fetch_message(int(message_id))
    embed = discord.Embed(
        title="⚠️ گزارش پیام",
        description=message.content,
        color=discord.Color.red()
    )
    embed.set_author(name=message.author.name, icon_url=message.author.avatar.url)
    admin_channel = bot.get_channel(ADMIN_CHANNEL_ID)  # جایگزین با آیدی کانال ادمین ها
    await admin_channel.send(embed=embed)
```

---

### **۹.۴ مدیریت نقش ها (Roles)**  
#### **۱. افزودن نقش به کاربر**:  

```python
@bot.command()
@commands.has_permissions(manage_roles=True)
async def افزودن_نقش(ctx, member: discord.Member, role: discord.Role):
    await member.add_roles(role)
    await ctx.send(f"✅ نقش {role.mention} به {member.mention} داده شد!")
```

#### **۲. ساخت نقش جدید**:  
```python
@bot.command()
@commands.has_permissions(manage_roles=True)
async def ساخت_نقش(ctx, name: str, color: str = "FFFFFF"):
    color = int(color, 16)  # تبدیل کد HEX به عدد
    await ctx.guild.create_role(name=name, color=discord.Color(color))
    await ctx.send(f"✅ نقش **{name}** ساخته شد!")
```

---

### **۹.۵ سیستم تیکت (Ticket System)**  
#### **۱. ساخت کانال تیکت**:  

```python
@bot.command()
@commands.has_permissions(manage_channels=True)
async def تیکت(ctx, reason: str):
    overwrites = {
        ctx.guild.default_role: discord.PermissionOverwrite(read_messages=False),
        ctx.author: discord.PermissionOverwrite(read_messages=True)
    }
    channel = await ctx.guild.create_text_channel(
        name=f"تیکت-{ctx.author.name}",
        overwrites=overwrites
    )
    await channel.send(f"📩 تیکت شما با دلیل **{reason}** ایجاد شد!")
```

#### **۲. بستن تیکت**:  

```python
@bot.command()
async def بستن(ctx):
    if "تیکت" in ctx.channel.name:
        await ctx.channel.delete()
```

---

### **تمرین عملی فصل ۹**  
۱. دستوری بسازید که کاربران را بر اساس فعالیت (تعداد پیام ها) رتبه بندی کند.  
۲. سیستمی طراحی کنید که هنگام میوت کردن کاربر، دلیل را در لاگ ذخیره کند.  
۳. دستوری ایجاد کنید که با `!ایجاد_کانال [نام]` یک کانال جدید بسازد.  

---

### **مشکلات رایج**  
- **ربات نمی تواند کاربر را بن/میوت کند**:  
  - مطمئن شوید ربات **بالاتر از نقش کاربر** در سلسله مراتب سرور است.  
  - دسترسی های ربات را در سرور بررسی کنید.  
- **خطای Missing Permissions**:  
  - از دکوراتور `@commands.has_permissions()` استفاده کنید.  

---

### **نکات امنیتی**  
- هرگز به ربات دسترسی **Administrator** ندهید مگر در موارد ضروری.  
- برای دستورات حساس، از احراز هویت دو مرحله ای (2FA) در سرور استفاده کنید.  
- لاگ تمام عملیات های مدیریتی را در یک کانال خصوصی ذخیره کنید.  

---

**فصل بعدی**: استقرار ربات (Deploy) و نگه داری حرفه ای! 🚀
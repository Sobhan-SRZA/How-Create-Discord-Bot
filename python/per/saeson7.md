**فصل ۷: دستورات اسلشی (Slash Commands)**

---

### **۷.۱ معرفی Slash Commands**  
دستورات اسلشی (با پیشوند `/`) یک روش مدرن و کاربرپسند برای تعامل کاربران با رباتهای دیسکورد هستند.  
- **مزایا**:  
  - بدون نیاز به پیشوند (! یا ?).  
  - رابط کاربری جذاب با پیشنهاد خودکار (Auto-Complete).  
  - پشتیبانی از پارامترهای ساختاریافته (متن، عدد، کاربر، کانال و...).  

---

### **۷.۲ تنظیمات اولیه**  
#### **فعالسازی Slash Commands**:  
۱. در پنل توسعهدهندگان دیسکورد، **Privileged Gateway Intents** را فعال کنید:  
   - **Server Members Intent**  
   - **Message Content Intent**  

۲. در کد، از `discord.app_commands` استفاده کنید:  
```python
from discord import app_commands
```

---

### **۷.۳ ساخت اولین Slash Command**  
#### **دستور `/پینگ`**:  
```python
@bot.tree.command(name="پینگ", description="بررسی پینگ ربات")
async def ping(interaction: discord.Interaction):
    latency = round(bot.latency * 1000)
    await interaction.response.send_message(f"🏓 پونگ! تاخیر: {latency}ms")
```

---

### **۷.۴ ثبت و همگامسازی دستورات**  
دستورات اسلشی باید با سرورهای دیسکورد **همگام (Sync)** شوند تا نمایش داده شوند.  

#### **۱. همگامسازی دستورات در یک سرور خاص**:  
```python
@bot.command()
@commands.is_owner()
async def سینک(interaction: discord.Interaction):
    await bot.tree.sync(guild=discord.Object(id=GUILD_ID))  # جایگزین GUILD_ID با آیدی سرور
    await interaction.response.send_message("✅ دستورات همگام شدند!")
```

#### **۲. همگامسازی جهانی (تمام سرورها)**:  
```python
@bot.command()
@commands.is_owner()
async def سینک_گلوبال(interaction: discord.Interaction):
    await bot.tree.sync()
    await interaction.response.send_message("✅ دستورات جهانی همگام شدند!")
```

---

### **۷.۵ پارامترهای پیشرفته**  
#### **۱. دریافت ورودی از کاربر**:  
```python
@bot.tree.command(name="جمع", description="جمع دو عدد")
@app_commands.describe(عدد1="عدد اول", عدد2="عدد دوم")
async def جمع(interaction: discord.Interaction, عدد1: int, عدد2: int):
    await interaction.response.send_message(f"نتیجه: {عدد1 + عدد2}")
```

#### **۲. پیشنهاد خودکار (Auto-Complete)**:  
```python
@bot.tree.command(name="رنگ", description="انتخاب رنگ")
@app_commands.describe(رنگ="انتخاب کنید")
@app_commands.autocomplete(رنگ=autocomplete_رنگ)
async def رنگ(interaction: discord.Interaction, رنگ: str):
    await interaction.response.send_message(f"رنگ انتخابی: {رنگ}")

# تابع Auto-Complete
async def autocomplete_رنگ(
    interaction: discord.Interaction,
    current: str
) -> list[app_commands.Choice[str]]:
    colors = ["قرمز", "آبی", "سبز", "زرد"]
    return [
        app_commands.Choice(name=color, value=color)
        for color in colors if current.lower() in color.lower()
    ]
```

---

### **۷.۶ دستورات ترکیبی (Hybrid Commands)**  
دستوراتی که هم بهصورت اسلشی و هم با پیشوند (!) کار میکنند:  
```python
from discord.ext import commands

@commands.hybrid_command(name="بن", description="بن کردن کاربر")
@app_commands.describe(کاربر="کاربر مورد نظر")
@commands.has_permissions(ban_members=True)
async def بن(ctx: commands.Context, کاربر: discord.Member):
    await کاربر.ban()
    await ctx.send(f"✅ {کاربر.mention} بن شد!")
```

---

### **۷.۷ مدیریت خطاها**  
#### **خطای Missing Permissions**:  
```python
@بن.error
async def بن_خطا(ctx: commands.Context, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ شما دسترسی بن کردن ندارید!")
```

---

### **تمرین عملی فصل ۷**  
۱. دستور `/ساعت` بسازید که زمان فعلی را نمایش دهد.  
۲. دستوری ایجاد کنید که با `/سوال [متن]` یک نظرسنجی با Reactions ایجاد کند.  
۳. دستوری با Auto-Complete برای انتخاب شهر (مثلاً تهران، اصفهان، شیراز) طراحی کنید.  

---

### **مشکلات رایج**  
- **دستورات اسلشی نمایش داده نمیشوند**:  
  - از `await bot.tree.sync()` استفاده کنید.  
  - ۲۴ ساعت منتظر بمانید (برای دستورات گلوبال).  
- **ربات به دستورات پاسخ نمیدهد**:  
  - مطمئن شوید `@bot.event` با `on_ready` دارید.  
  - Intentها را در پنل توسعهدهندگان فعال کنید.  

---

### **نکات کلیدی**  
- برای سرعت بیشتر، دستورات را ابتدا در یک سرور تستی سینک کنید.  
- از `interaction.response.send_message` به جای `channel.send` استفاده کنید.  
- برای پارامترها از انواع داده مثل `discord.Member` یا `int` استفاده کنید.  

---

**فصل بعدی**: کار با دیتابیس و ذخیره اطلاعات کاربران! 🗄️
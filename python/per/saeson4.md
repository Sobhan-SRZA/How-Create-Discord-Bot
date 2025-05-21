**فصل ۴: ساخت اولین ربات**  

---

### **۴.۱ تنظیمات اولیه ربات**  
#### **۱. ایجاد فایل `main.py`**:  

```python
import discord
from discord.ext import commands
import datetime

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(
    command_prefix="!", 
    intents=intents,
    help_command=None  # غیرفعال کردن دستور help پیشفرض
)
```

#### **۲. افزودن رویداد `on_ready`**:  

```python
@bot.event
async def on_ready():
    print(f"✅ {bot.user.name} با موفقیت آنلاین شد!")
    print(f"تعداد سرور ها: {len(bot.guilds)}")
    print(f"زمان آنلاین شدن: {datetime.datetime.now()}")
```

---

### **۴.۲ ساخت دستورات پایه**  
#### **۱. دستور `!سلام`**:  

```python
@bot.command()
async def سلام(ctx):
    await ctx.reply(f"سلام {ctx.author.mention}! 😊")
```

#### **۲. دستور `!ساعت`**:  

```python
@bot.command()
async def ساعت(ctx):
    now = datetime.datetime.now().strftime("%H:%M:%S")
    await ctx.send(f"🕒 ساعت فعلی: **{now}**")
```

#### **۳. دستور `!جمع` با پارامتر**:  

```python
@bot.command()
async def جمع(ctx, num1: int, num2: int):
    result = num1 + num2
    await ctx.send(f"نتیجه: `{num1} + {num2} = {result}`")
```

---

### **۴.۳ ارسال Embed های پیشرفته**  
#### **دستور `!کاربر`**:  

```python
@bot.command()
async def کاربر(ctx, member: discord.Member = None):
    member = member or ctx.author  # اگر کاربری منشن نشد، خود فرستنده در نظر گرفته می شود
    
    embed = discord.Embed(
        title=f"ℹ️ اطلاعات {member.name}",
        color=discord.Color.green()
    )
    embed.set_thumbnail(url=member.avatar.url)
    embed.add_field(name="تگ", value=member.mention)
    embed.add_field(name="آیدی", value=member.id)
    embed.add_field(name="تاریخ عضویت", value=member.joined_at.strftime("%Y/%m/%d"))
    
    await ctx.send(embed=embed)
```

---

### **۴.۴ مدیریت خطا ها**  
#### **خطای Missing Permissions**:  

```python
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("⛔ شما دسترسی لازم را ندارید!")
```

#### **خطای Missing Required Argument**:  

```python
@جمع.error
async def جمع_خطا(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("⚠️ لطفاً دو عدد وارد کنید!\nمثال: `!جمع 5 10`")
```

---

### **۴.۵ افزودن سیستم Help سفارشی**  

```python
@bot.command()
async def کمک(ctx):
    embed = discord.Embed(
        title="📚 لیست دستورات",
        description="پیشوند دستورات: `!`",
        color=discord.Color.blue()
    )
    embed.add_field(
        name="عمومی", 
        value="`سلام` `ساعت` `کاربر [@منشن]`",
        inline=False
    )
    embed.add_field(
        name="محاسباتی", 
        value="`جمع <عدد1> <عدد2>`",
        inline=False
    )
    
    await ctx.send(embed=embed)
```

---

### **۴.۶ اجرای ربات**  

```python
# توکن را از فایل .env بخوانید (در فصل ۷ آموزش داده می شود)
TOKEN = "TOKEN_خود_را_اینجا_قرار_دهید"

if __name__ == "__main__":
    bot.run(TOKEN)
```

---

### **تمرین عملی فصل ۴**  
۱. دستوری بسازید که با `!سکه` تصادفی رو یا پشت برگرداند.  
۲. دستور `!پاککن` ایجاد کنید که تعداد مشخصی پیام پاک کند (نیاز به دسترسی مدیریت پیام ها).  
۳. سیستمی طراحی کنید که هنگام جوین دادن کاربر به سرور، پیام خوش آمد گویی ارسال شود.  

**مثال تمرین ۳**:  

```python
@bot.event
async def on_member_join(member):
    channel = member.guild.system_channel
    await channel.send(f"🎉 {member.mention} به سرور ما خوش آمدی!")
```

---

### **مشکلات رایج و راه حل ها**  
- **دستورات اجرا نمی شوند**:  
  - مطمئن شوید `intents.message_content = True` است.  
  - ربات را دوباره راه اندازی کنید (`Ctrl+C` و `python main.py`).  
- **ربات نمی تواند کاربران را منشن کند**:  
  - در پنل توسعه دهندگان دیسکورد، **Server Members Intent** را فعال کنید.  

---

### **نکات کلیدی**  
- همیشه از `ctx.reply()` به جای `ctx.send()` برای اشاره به کاربر استفاده کنید.  
- برای دریافت اطلاعات کاربران، از `discord.Member` به عنوان پارامتر استفاده کنید.  
- خطا ها را با `@bot.event` و `on_command_error` مدیریت کنید.  

---

**فصل بعدی**: کار با Embed ها، فایل ها و Attachment ها! 🚀
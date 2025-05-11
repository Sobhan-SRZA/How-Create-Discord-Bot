**فصل ۳: آشنایی با کتابخانه `discord.py`**  
---

### **۳.۱ نصب و راهاندازی کتابخانه**  
#### **نصب `discord.py`**  
در ترمینال/CMD دستور زیر را اجرا کنید:  
```bash
pip install discord.py
```
> ⚠️ **توجه**: اگر خطای دسترسی دارید، از `pip install discord.py --user` استفاده کنید یا دستور را با `sudo` اجرا کنید (لینوکس/مک).

---

### **۳.۲ ساختار اصلی ربات دیسکورد در پایتون**  
#### **مفاهیم کلیدی**:  
- **`Bot`**: کلاس اصلی برای مدیریت ربات.  
- **`Intents`**: دسترسیهای ربات به رویدادهای دیسکورد (مثلاً دریافت پیامها).  
- **`commands`**: ماژول برای ساخت دستورات با پیشوند (مثلاً `!پینگ`).  

---

### **۳.۳ کدنویسی اولیه**  
#### **مرحله ۱: ساخت فایل `bot.py`**  
```python
import discord
from discord.ext import commands

# فعال کردن دسترسی به محتوای پیامها
intents = discord.Intents.default()
intents.message_content = True

# ساخت نمونه ربات با پیشوند !
bot = commands.Bot(command_prefix='!', intents=intents)

# رویداد آماده شدن ربات
@bot.event
async def on_ready():
    print(f'✅ ربات {bot.user.name} آنلاین شد!')

# دستور ساده پینگ
@bot.command()
async def ping(ctx):
    latency = round(bot.latency * 1000)
    await ctx.send(f'🏓 پونگ! تاخیر: {latency}ms')

# اجرای ربات با توکن
bot.run('TOKEN_خود_را_اینجا_قرار_دهید')
```

#### **مرحله ۲: جایگزینی توکن**:  
- توکن ربات را از [پنل توسعهدهندگان دیسکورد](https://discord.com/developers/applications) دریافت و جایگزین کنید.

---

### **۳.۴ فعالسازی Intents در دیسکورد**  
1. به پنل توسعهدهندگان دیسکورد بروید.  
2. به بخش **Bot** رفته و در قسمت **Privileged Gateway Intents**، گزینههای زیر را فعال کنید:  
   - **Presence Intent** (اختیاری)  
   - **Server Members Intent** (اختیاری)  
   - **Message Content Intent** (الزامی برای خواندن محتوای پیامها)  

---

### **۳.۵ اجرا و تست ربات**  
1. ربات را اجرا کنید:  
   ```bash
   python bot.py
   ```
2. در دیسکورد دستور `!پینگ` را ارسال کنید.  
3. اگر همه چیز درست باشد، ربات تاخیر شبکه را پاسخ میدهد.  

---

### **۳.۶ افزودن دستورات بیشتر**  
#### **دستور !سلام**:  
```python
@bot.command()
async def سلام(ctx):
    await ctx.send(f'سلام {ctx.author.mention}! 😊')
```

#### **دستور !ساعت**:  
```python
from datetime import datetime

@bot.command()
async def ساعت(ctx):
    now = datetime.now().strftime("%H:%M:%S")
    await ctx.send(f'⏰ ساعت فعلی: {now}')
```

---

### **مشکلات رایج و راهحلها**  
- **ربات به پیامها پاسخ نمیدهد**:  
  - مطمئن شوید `Intents.message_content` را فعال کردهاید.  
  - در کد و پنل دیسکورد بررسی کنید.  
- **خطای `Missing Privileged Intents`**:  
  - Intents لازم را در پنل توسعهدهندگان فعال کنید.  
- **ربات آنلاین نمیشود**:  
  - توکن را بررسی کنید.  
  - اینترنت وصل است؟  

---

### **تمرین عملی فصل ۳**  
۱. دستور `!کاربر` بسازید که نام و آیدی کاربر را نمایش دهد.  
   ```python
   @bot.command()
   async def کاربر(ctx):
       user = ctx.author
       await ctx.send(f'👤 نام: {user.name}\n🆔 آیدی: {user.id}')
   ```

۲. دستور `!سکه` ایجاد کنید که تصادفی رو یا پشت برگرداند.  
   ```python
   import random

   @bot.command()
   async def سکه(ctx):
       result = random.choice(['رو', 'پشت'])
       await ctx.send(f'🪙 نتیجه: **{result}**')
   ```

---

### **نکات کلیدی**  
- **`ctx` (Context)**: شامل اطلاعات مربوط به دستور (مثل کاربر، کانال، سرور).  
- **دستورات را ماژولار بسازید**: بعداً با **Cog** سازماندهی خواهیم کرد.  
- **توکن را امن نگه دارید**: در فصلهای بعدی از `.env` استفاده میکنیم.  

---

**فصل بعدی**: در فصل ۴، **ساخت دستورات پیشرفتهتر** و کار با **Embedها** را یاد خواهیم گرفت! 🚀
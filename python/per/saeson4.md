**فصل ۴: ساخت دستورات پیشرفتهتر و کار با Embedها**  
---

### **۴.۱ ساخت Embedهای حرفهای**  
Embedها پیامهای ساختاریافته و زیبا هستند. برای ایجاد آنها از کلاس `Embed` استفاده میکنیم:  

```python
from discord import Embed

@bot.command()
async def اطلاعات(ctx):
    user = ctx.author
    embed = Embed(
        title="📊 اطلاعات کاربر",
        description=f"سلام {user.mention}!",
        color=0x00ff00  # کد HEX رنگ
    )
    embed.add_field(name="تاریخ عضویت", value=user.joined_at.strftime("%Y-%m-%d"), inline=True)
    embed.add_field(name="آیدی", value=user.id, inline=True)
    embed.set_thumbnail(url=user.avatar.url)
    
    await ctx.send(embed=embed)
```

---

### **۴.۲ ارسال و دریافت فایل**  
#### **ارسال فایل به سرور**:  
```python
@bot.command()
async def آپلود(ctx):
    if ctx.message.attachments:
        file = await ctx.message.attachments[0].save("file.png")
        await ctx.send("فایل با موفقیت ذخیره شد!")
```

#### **ارسال فایل از ربات**:  
```python
@bot.command()
async def دانلود(ctx):
    with open("file.png", "rb") as f:
        file = discord.File(f)
        await ctx.send(file=file)
```

---

### **۴.۳ سازماندهی کد با Cogها**  
Cogها کمک میکنند کد ربات را ماژولار و تمیز نگه دارید.  

#### **مراحل ساخت Cog**:  
۱. **ساخت فایل `cogs/my_cog.py`**:  
```python
from discord.ext import commands

class MyCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async test(self, ctx):
        await ctx.send("این یک دستور تست است!")

async def setup(bot):
    await bot.add_cog(MyCog(bot))
```

۲. **اضافه کردن Cog به ربات**:  
در فایل اصلی `bot.py`:  
```python
async def main():
    await bot.load_extension("cogs.my_cog")
    await bot.start("TOKEN")

bot.run("TOKEN")
```

---

### **۴.۴ مدیریت خطاها**  
#### **خطای دسترسی**:  
```python
@bot.command()
async def پاککن(ctx, amount: int):
    if not ctx.author.guild_permissions.manage_messages:
        await ctx.send("❌ شما دسترسی لازم را ندارید!")
        return
    await ctx.channel.purge(limit=amount + 1)
```

#### **خطای عمومی**:  
```python
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("⚠️ لطفاً همه پارامترها را وارد کنید!")
```

---

### **تمرین عملی فصل ۴**  
۱. **دستور !سطح**:  
   یک Embed بسازید که سطح کاربر را با گرافیک نشان دهد.  
۲. **دستور !آواتار**:  
   آواتار کاربر را در Embed نمایش دهید.  
۳. **ساخت Cog**:  
   تمام دستورات را در یک Cog جداگانه سازماندهی کنید.  

---

### **مشکلات رایج**  
- **Embed نمایش داده نمیشود**:  
  - مطمئن شوید از `embed=` در `ctx.send()` استفاده کردهاید.  
- **خطای `File Not Found`**:  
  - مسیر فایل را دقیق بررسی کنید.  
- **Cog لود نمیشود**:  
  - مسیر فایل Cog را در `load_extension()` چک کنید.  

---

### **نکات حرفهای**  
- برای رنگ Embed از **کدهای HEX** استفاده کنید (مثلاً `0x3498db` برای آبی).  
- از `inline=False` برای نمایش فیلدها در خطوط جداگانه استفاده کنید.  
- با `@commands.has_permissions()` دسترسی کاربران را محدود کنید.  

---

**فصل بعدی**: در فصل ۵، **دستورات اسلشی (Slash Commands)** و **کار با دیتابیس** را یاد میگیریم! 🚀
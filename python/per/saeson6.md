**فصل ۶: دستورات پیشرفته (Cog و Command)**  

---

### **۶.۱ معرفی Cog (ماژول های سازماندهی کد)**  
Cog ها کلاس هایی هستند که دستورات، رویداد ها و تنظیمات ربات را **مدولار** می کنند و مدیریت کد را آسانتر می کنند.  

#### **مزایای استفاده از Cog**:  
- کد تمیز و قابل نگه داری  
- امکان بارگذاری/لغو بارگذاری دستورات بدون ری استارت ربات  
- مدیریت خطا ها به صورت جداگانه  

---

### **۶.۲ ساخت اولین Cog**  
#### **۱. ساخت فایل `cogs/moderate.py`**:  

```python
from discord.ext import commands

class Moderate(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # دستور پاک کردن پیام ها
    @commands.command()
    @commands.has_permissions(manage_messages=True)
    async def پاککن(self, ctx, limit: int = 10):
        await ctx.channel.purge(limit=limit + 1) # +1 برای حذف خود دستور
        msg = await ctx.send(f"✅ {limit} پیام پاک شد!", delete_after=5)

    # خطای دسترسی
    @پاککن.error
    async def پاککن_خطا(self, ctx, error):
        if isinstance(error, commands.MissingPermissions):
            await ctx.send("⛔ شما دسترسی مدیریت پیام ها را ندارید!")

# تابع ضروری برای لود Cog
async def setup(bot):
    await bot.add_cog(Moderate(bot))
```

#### **۲. لود کردن Cog در فایل اصلی**:  

```python
# در main.py
async def main():
    await bot.load_extension("cogs.moderate")

if __name__ == "__main__":
    bot.run(TOKEN)
```

---

### **۶.۳ دستورات پیشرفته با Decoratorها**  
#### **۱. دسترسی های کاربر (Permissions)**:  

```python
@commands.has_role("Admin")  # نیاز به نقش خاص
@commands.has_permissions(kick_members=True)  # نیاز به دسترسی
@commands.is_owner()  # فقط مالک ربات
```

#### **۲. محدودیت استفاده از دستورات**:  

```python
@commands.cooldown(rate=1, per=30, type=commands.BucketType.user)  # 30 ثانیه کولدان
async def جوایز(ctx):
    await ctx.send("🎉 شما 100 سکه دریافت کردید!")
```

#### **۳. دستورات هیبریدی (Slash + Prefix)**:  

```python
from discord import app_commands

@commands.hybrid_command(name="بن", description="بن کردن کاربر")
@app_commands.describe(user="کاربری که میخواهید بن کنید")
async def بن(ctx, user: discord.Member):
    await user.ban()
    await ctx.send(f"✅ {user.mention} بن شد!")
```

---

### **۶.۴ مدیریت خطا های سراسری**  
#### **خطا های عمومی در Cog**:  
```python
class Moderate(commands.Cog):
    #...

    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandNotFound):
            await ctx.send("❌ دستور نامعتبر است!")
```

---

### **۶.۵ ساخت Help Command سفارشی** 

```python
class Help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="کمک")
    async def کمک(self, ctx):
        embed = discord.Embed(title="📚 راهنما")
        for cog in self.bot.cogs:
            commands_list = [f"`{cmd.name}`" for cmd in self.bot.get_cog(cog).get_commands()]
            embed.add_field(name=cog, value=" ".join(commands_list), inline=False)
        await ctx.send(embed=embed)
```

---

### **۶.۶ تمرین عملی**  
۱. Cog جدیدی به نام `Fun` بسازید و دستوراتی مثل `سکه` و `شماره` را به آن منتقل کنید.  
۲. دستور `!بن` را به یک Slash Command تبدیل کنید.  
۳. سیستمی بسازید که کاربران فقط ۳ بار در ساعت از دستور `جوایز` استفاده کنند.  

---

### **مشکلات رایج**  
- **Cog لود نمی شود**:  
  - مطمئن شوید مسیر فایل (`cogs/moderate.py`) صحیح است.  
  - از `await bot.load_extension()` استفاده کنید.  
- **دستورات نمایش داده نمی شوند**:  
  - دکوراتور `@commands.command()` را فراموش نکنید.  

---

### **نکات طلایی**  
- هر Cog را در یک فایل جداگانه ذخیره کنید.  
- برای نامگذاری دستورات از **فارسی** یا **انگلیسی یکدست** استفاده کنید.  
- از `@commands.check()` برای اعتبارسنجی های پیچیده استفاده کنید.  

---

**فصل بعدی**: دستورات اسلاشی (Slash Commands) و تعاملات مدرن! ✨
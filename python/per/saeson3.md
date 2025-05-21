**فصل ۳: آشنایی با کتابخانه `discord.py`**  

---

### **۳.۱ معرفی کتابخانه `discord.py`**  
`discord.py` یک کتابخانه قدرتمند و انعطاف پذیر پایتون برای ساخت ربات های دیسکورد است. این کتابخانه با ارائه ابزارهای ساده، امکان تعامل با API دیسکورد را فراهم می کند.  

#### **چرا `discord.py`؟**  
- **ساده و مبتدی پسند**: نحو (Syntax) تمیز و قابل فهم.  
- **کاملاً غیر همزمان (Async)**: عملکرد بهینه برای پردازش چند کاره.  
- **مستندات عالی**: [مستندات رسمی](https://discordpy.readthedocs.io/) با مثال های کاربردی.  

---

### **۳.۲ نصب و راه اندازی**  
#### **نصب کتابخانه**:  
در ترمینال/CMD دستور زیر را اجرا کنید:  
```bash
pip install discord.py
```

#### **نسخه های جایگزین**:  
- **nextcord**: فورکی از `discord.py` با پشتیبانی بهتر و آپدیت های منظم.  
  ```bash
  pip install nextcord
  ```

---

### **۳.۳ ساختار اصلی یک ربات**  
#### **۱. ایمپورت ماژول ها**:  
```python
import discord
from discord.ext import commands
```

#### **۲. تنظیم Intents**:  
اینت ها دسترسی های ربات به رویدادهای دیسکورد را مشخص می کنند.  

```python
intents = discord.Intents.default()
intents.message_content = True  # دسترسی به محتوای پیام ها
```

#### **۳. ایجاد نمونه ربات**:  
```python
bot = commands.Bot(
    command_prefix='!',  # پیشوند دستورات (مثلاً !ping)
    intents=intents
)
```

---

### **۳.۴ رویدادها (Events)**  
رویدادها برای پاسخ به اتفاقاتی مانند آنلاین شدن ربات یا دریافت پیام استفاده می شوند.  

#### **رویداد `on_ready`**:  
وقتی ربات با موفقیت به دیسکورد متصل شود.  
```python
@bot.event
async def on_ready():
    print(f'✅ {bot.user.name} آنلاین شد!')
```

#### **رویداد `on_message`**:  
هر بار که پیامی در سرور ارسال می شود.  

```python
@bot.event
async def on_message(message):
    if message.author == bot.user:  # جلوگیری از پاسخ به خود ربات
        return

    if message.content == 'سلام':
        await message.channel.send('سلام! چطوری؟ 😊')
    
    await bot.process_commands(message)  # پردازش دستورات
```

---

### **۳.۵ دستورات ساده (Commands)**  
با استفاده از `@commands.command()` می توانید دستورات سفارشی ایجاد کنید.  

#### **دستور `ping`**:  

```python
@bot.command()
async def ping(ctx):
    latency = round(bot.latency * 1000)  # تاخیر ربات به میلی ثانیه
    await ctx.reply(f'🏓 پونگ! تاخیر: {latency}ms')
```

#### **پارامترهای دستور**:  

```python
@bot.command()
async def say(ctx, *, text):
    await ctx.send(text)  # دستور !say Hello World
```

---

### **۳.۶ کار با Embed ها**  
Embed ها پیام های ساختار یافته و زیبا برای نمایش اطلاعات هستند.  

#### **ارسال Embed**:  

```python
@bot.command()
async def info(ctx):
    embed = discord.Embed(
        title="عنوان Embed",
        description="توضیحات کلی",
        color=discord.Color.blue()
    )
    embed.add_field(name="فیلد ۱", value="مقدار ۱", inline=False)
    embed.set_thumbnail(url=ctx.author.avatar.url)
    
    await ctx.send(embed=embed)
```

---

### **مثال کامل ربات**:  

```python
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'✅ {bot.user} آنلاین شد!')

@bot.command()
async def ping(ctx):
    await ctx.reply(f'🏓 پونگ! تاخیر: {round(bot.latency * 1000)}ms')

bot.run('TOKEN_خود_را_اینجا_قرار_دهید')
```

---

### **تمرین عملی فصل ۳**  
۱. رباتی بسازید که با دستور `!ساعت` زمان فعلی را ارسال کند.  
۲. Embed ی طراحی کنید که اطلاعات کاربر (نام، آیدی، تاریخ عضویت) را نمایش دهد.  
۳. دستوری بسازید که با `!جمع 5 10` مجموع دو عدد را محاسبه کند.  

---

### **مشکلات رایج**  
- **ربات به پیام ها پاسخ نمی دهد**:  
  - مطمئن شوید `intents.message_content = True` است.  
  - دستورات را با پیشوند صحیح (!) ارسال کنید.  
- **خطای `Missing Intents`**:  
  - در [پنل توسعه دهندگان دیسکورد](https://discord.com/developers/applications)، اینت های لازم را فعال کنید.  

---

### **نکات کلیدی**  
- **توکن ربات را در کد عمومی قرار ندهید** (در فصل های بعدی از `.env` استفاده می کنیم).  
- برای دستورات پیچیده تر از `Cog` استفاده کنید (فصل ۶).  
- همیشه قبل از اجرای ربات، کتابخانه ها را آپدیت کنید:  
  ```bash
  pip install --upgrade discord.py
  ```

---

**فصل بعدی**: ساخت اولین ربات دیسکورد با دستورات پیشرفته تر! 🚀
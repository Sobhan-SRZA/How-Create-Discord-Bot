**فصل ۵: کار با Embed ها و فایل ها**  

---

### **۵.۱ ساخت Embed های حرفه ای**  
Embed ها پیام های ساختار یافته ای هستند که اطلاعات را به شکل زیبا و سازماندهی شده نمایش می دهند.  

#### **ساخت یک Embed ساده**:  

```python
from discord import Embed

@bot.command()
async def اطلاع(ctx):
    embed = Embed(
        title="📢 اطلاعیه مهم",
        description="به سرور ما خوش آمدید!",
        color=0x00FF00  # کد HEX رنگ (سبز)
    )
    embed.set_author(name=ctx.author.display_name, icon_url=ctx.author.avatar.url)
    await ctx.send(embed=embed)
```

#### **افزودن فیلد ها و تصویر**:  

```python
@bot.command()
async def پروفایل(ctx, member: discord.Member = None):
    member = member or ctx.author
    
    embed = Embed(
        title=f"📁 پروفایل {member.name}",
        color=discord.Color.blurple()
    )
    embed.set_thumbnail(url=member.avatar.url)
    embed.add_field(name="تاریخ عضویت", value=member.joined_at.strftime("%Y/%m/%d"), inline=False)
    embed.add_field(name="تعداد نقش ها", value=len(member.roles), inline=True)
    embed.set_image(url="https://example.com/banner.png")  # بنر پایین Embed
    
    await ctx.send(embed=embed)
```

---

### **۵.۲ ارسال و دریافت فایل**  
#### **۱. ارسال فایل از کامپیوتر**:  

```python
@bot.command()
async def عکس(ctx):
    file = discord.File("path/to/image.jpg", filename="image.jpg")
    await ctx.send(file=file)
```

#### **۲. ارسال فایل از اینترنت**:  

```python
import aiohttp

@bot.command()
async دانلود(ctx, url: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status == 200:
                data = await resp.read()
                file = discord.File(BytesIO(data), filename="download.png")
                await ctx.send(file=file)
```

#### **۳. ذخیره فایل های ارسالی کاربران**:  

```python
@bot.event
async def on_message(message):
    if message.attachments:
        attachment = message.attachments[0]
        await attachment.save(f"downloads/{attachment.filename}")
        await message.channel.send("✅ فایل ذخیره شد!")
```

---

### **۵.۳ ترکیب Embed و فایل**  
می توانید همزمان Embed و فایل ارسال کنید: 

```python
@bot.command()
async def کارت(ctx):
    embed = Embed(title="🎴 کارت ویژه", color=0xFFD700)
    embed.set_image(url="attachment://card.png")  # اشاره به فایل آپلود شده
    
    file = discord.File("images/card.png", filename="card.png")
    await ctx.send(embed=embed, file=file)
```

---

### **۵.۴ Embed های پویا با دینامیک داده**  
#### **مثال: نمایش اطلاعات سرور**:  

```python
@bot.command()
async def سرور(ctx):
    guild = ctx.guild
    embed = Embed(title=guild.name, description=guild.description)
    embed.add_field(name="اعضا", value=guild.member_count)
    embed.add_field(name="مالک", value=guild.owner.mention)
    embed.set_thumbnail(url=guild.icon.url)
    
    await ctx.send(embed=embed)
```

---

### **تمرین عملی فصل ۵**  
۱. دستوری بسازید که با `!میم [متن]` یک تصویر پیشفرض را دانلود و متن کاربر را روی آن بنویسد (با کتابخانه `PIL`).  
۲. سیستمی طراحی کنید که هنگام ارسال عکس توسط کاربر، آن را در Embed نمایش دهد.  
۳. دستور `!آمار` ایجاد کنید که تعداد پیام های کاربر را در Embed نمایش دهد.  

---

### **مشکلات رایج**  
- **فایل ارسال نمی شود**:  
  - مطمئن شوید مسیر فایل صحیح است.  
  - از پسوند فایل (مثلاً `.jpg`) در `filename` استفاده کنید.  
- **تصویر در Embed نمایش داده نمی شود**:  
  - از `attachment://filename.extension` در `set_image` استفاده کنید.  
  - فایل را حتماً به پیام ضمیمه کنید.  

---

### **نکات کلیدی**  
- برای رنگ Embedها می توانید از کد HEX یا رنگ های پیشفرض (`discord.Color.red()`) استفاده کنید.  
- حداکثر اندازه فایل آپلودی در دیسکورد **۸ مگابایت** است.  
- برای پردازش تصاویر، از کتابخانه `pillow` استفاده کنید:  
  ```bash
  pip install pillow
  ```

---

**فصل بعدی**: سازماندهی کد با Cog و ساخت دستورات پیشرفته تر! 🛠️
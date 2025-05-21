**فصل ۸: کار با دیتابیس**  

---

### **۸.۱ چرا به دیتابیس نیاز داریم؟**  
ربات های دیسکورد برای ذخیره داده های پایدار (مثل XP کاربران، تنظیمات سرور، لاگ ها و ...) نیاز به دیتابیس دارند.  
- **دیتابیس های رایج**:  
  - **SQLite**: ساده، بدون نیاز به سرور، مناسب پروژه های کوچک.  
  - **PostgreSQL/MySQL**: قدرتمند، مناسب برنامه های بزرگ.  
  - **MongoDB**: انعطاف پذیر، مبتنی بر سند (NoSQL).  

---

### **۸.۲ استفاده از SQLite (ساده ترین گزینه)**  
#### **۱. نصب کتابخانه `aiosqlite` (برای کار Async)**:  
```bash
pip install aiosqlite
```

#### **۲. ایجاد اتصال به دیتابیس**:  
```python
import aiosqlite

async def create_db():
    async with aiosqlite.connect("database.db") as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                xp INTEGER DEFAULT 0,
                level INTEGER DEFAULT 1
            )
        """)
        await db.commit()
```

#### **۳. افزودن داده**:  
```python
async def add_user(user_id: int):
    async with aiosqlite.connect("database.db") as db:
        await db.execute("INSERT OR IGNORE INTO users (user_id) VALUES (?)", (user_id,))
        await db.commit()
```

#### **۴. خواندن داده**:  
```python
async def get_user(user_id: int):
    async with aiosqlite.connect("database.db") as db:
        cursor = await db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
        result = await cursor.fetchone()
        return result  # (user_id, xp, level)
```

---

### **۸.۳ سیستم XP با SQLite**  
#### **افزایش XP کاربر هنگام ارسال پیام**:  

```python
@bot.event
async def on_message(message):
    if message.author.bot:
        return

    user_id = message.author.id
    await add_user(user_id)  # اطمینان از وجود کاربر در دیتابیس

    async with aiosqlite.connect("database.db") as db:
        await db.execute("UPDATE users SET xp = xp + ? WHERE user_id = ?", (10, user_id))
        await db.commit()
```

#### **دستور !سطح**:  

```python
@bot.command()
async def سطح(ctx):
    user_data = await get_user(ctx.author.id)
    if not user_data:
        return await ctx.send("خطا: کاربر یافت نشد!")
    
    embed = discord.Embed(title=f"سطح {ctx.author.name}", color=0x00FF00)
    embed.add_field(name="XP", value=user_data[1])
    embed.add_field(name="سطح", value=user_data[2])
    await ctx.send(embed=embed)
```

---

### **۸.۴ استفاده از PostgreSQL (پیشرفته)**  
#### **۱. نصب `asyncpg`**:  
```bash
pip install asyncpg
```

#### **۲. اتصال به PostgreSQL**:  
```python
import asyncpg

async def create_pool():
    return await asyncpg.create_pool(
        user="postgres",
        password="password",
        database="mydb",
        host="localhost"
    )
```

#### **۳. اجرای کوئری**:  
```python
pool = await create_pool()

async def get_user(user_id: int):
    async with pool.acquire() as conn:
        return await conn.fetchrow("SELECT * FROM users WHERE user_id = $1", user_id)
```

---

### **۸.۵ ذخیره داده در JSON (برای پروژه های کوچک)**  
#### **۱. ذخیره داده**:  
```python
import json

def save_data(data):
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)

def load_data():
    try:
        with open("data.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
```

#### **۲. مثال استفاده**:  
```python
data = load_data()
data[str(user_id)] = {"xp": 100, "level": 2}
save_data(data)
```

---

### **۸.۶ امنیت دیتابیس**  
- **پارامتر های امن**:  
  همیشه از پارامترها در کوئری ها استفاده کنید تا از **تزریق SQL** جلوگیری شود.  
  ```python
  # ❌ خطرناک
  await db.execute(f"SELECT * FROM users WHERE user_id = {user_id}")

  # ✅ ایمن
  await db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
  ```

- **استفاده از `.env`**:  
  اطلاعات حساس (مثل رمز دیتابیس) را در فایل `.env` ذخیره کنید.  
  ```env
  DB_PASSWORD = "your_password"
  ```

---

### **تمرین عملی فصل ۸**  
۱. سیستمی بسازید که با هر پیام کاربر، ۵ XP اضافه کند و پس از رسیدن به ۱۰۰ XP، سطح کاربر افزایش یابد.  
۲. دستور `!لیدربورد` ایجاد کنید که ۱۰ کاربر برتر را نمایش دهد.  
۳. داده های تنظیمات سرور (مثل پیشوند دستورات) را در دیتابیس ذخیره کنید.  

---

### **مشکلات رایج**  
- **خطای اتصال به دیتابیس**:  
  - مطمئن شوید دیتابیس در حال اجراست (مثلاً PostgreSQL).  
  - اطلاعات اتصال (مثل رمز عبور) را بررسی کنید.  
- **داده ها ذخیره نمی شوند**:  
  - فراموش نکنید بعد از کوئری های تغییردهنده (`INSERT`, `UPDATE`) از `commit()` استفاده کنید.  

---

### **نکات کلیدی**  
- برای پروژه های بزرگ، از **ORM**هایی مثل `SQLAlchemy` استفاده کنید.  
- برای عملکرد بهتر در ربات های بزرگ، از **Connection Pooling** استفاده کنید.  
- همیشه قبل از اجرای ربات، ساختار دیتابیس را بررسی کنید (مثلاً با اسکریپت های `CREATE TABLE`).  

---

**فصل بعدی**: مدیریت سرور و کاربران! ⚙
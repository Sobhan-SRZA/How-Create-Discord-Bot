## Chapter 8: Working with Databases

---

### 8.1 Why Use a Database?

Discord bots often need to store persistent data—such as user XP, server settings, logs, and more—in a database.

* **Common Database Options:**

  * **SQLite:** Lightweight, serverless, ideal for small projects.
  * **PostgreSQL/MySQL:** Powerful SQL databases for larger applications.
  * **MongoDB:** Flexible, document-based NoSQL database.

---

### 8.2 Using SQLite (Simplest Option)

#### 1. Install the Async Library

```bash
pip install aiosqlite
```

#### 2. Create and Initialize the Database

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

#### 3. Adding a User Record

```python
async def add_user(user_id: int):
    async with aiosqlite.connect("database.db") as db:
        await db.execute(
            "INSERT OR IGNORE INTO users (user_id) VALUES (?)",
            (user_id,)
        )
        await db.commit()
```

#### 4. Retrieving a User Record

```python
async def get_user(user_id: int):
    async with aiosqlite.connect("database.db") as db:
        cursor = await db.execute(
            "SELECT * FROM users WHERE user_id = ?",
            (user_id,)
        )
        return await cursor.fetchone()  # Returns (user_id, xp, level)
```

---

### 8.3 XP System with SQLite

#### Awarding XP on Message

```python
@bot.event
async def on_message(message):
    if message.author.bot:
        return

    user_id = message.author.id
    await add_user(user_id)  # Ensure the user exists

    async with aiosqlite.connect("database.db") as db:
        await db.execute(
            "UPDATE users SET xp = xp + ? WHERE user_id = ?",
            (10, user_id)
        )
        await db.commit()

    await bot.process_commands(message)
```

#### The `!level` Command

```python
@bot.command()
async def level(ctx):
    user_data = await get_user(ctx.author.id)
    if not user_data:
        return await ctx.send("Error: User not found!")

    embed = discord.Embed(
        title=f"{ctx.author.name}'s Level",
        color=0x00FF00
    )
    embed.add_field(name="XP", value=user_data[1])
    embed.add_field(name="Level", value=user_data[2])
    await ctx.send(embed=embed)
```

---

### 8.4 Using PostgreSQL (Advanced)

#### 1. Install `asyncpg`

```bash
pip install asyncpg
```

#### 2. Create a Connection Pool

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

#### 3. Querying the Database

```python
pool = await create_pool()

async def get_user_pg(user_id: int):
    async with pool.acquire() as conn:
        return await conn.fetchrow(
            "SELECT * FROM users WHERE user_id = $1",
            user_id
        )
```

---

### 8.5 Storing Data in JSON (For Very Small Projects)

#### 1. Save and Load Functions

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

#### 2. Example Usage

```python
data = load_data()
data[str(user_id)] = {"xp": 100, "level": 2}
save_data(data)
```

---

### 8.6 Database Security Best Practices

* **Use Parameterized Queries** to prevent SQL injection:

  ```python
  # ❌ Vulnerable
  await db.execute(f"SELECT * FROM users WHERE user_id = {user_id}")

  # ✅ Safe
  await db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
  ```
* **Store Credentials in `.env`:**

  ```env
  DB_PASSWORD="your_password"
  ```

---

### Hands-On Exercises for Chapter 8

1. Build a system that awards 5 XP per message and levels users up every 100 XP.
2. Create a `!leaderboard` command showing the top 10 users by XP.
3. Store and retrieve server-specific settings (like command prefix) in your database.

---

### Common Issues

* **Database Connection Errors:**

  * Ensure the DB server is running (for PostgreSQL/MySQL).
  * Double-check connection credentials.
* **Data Not Persisting:**

  * Remember to call `commit()` after `INSERT` or `UPDATE` queries.

---

### Key Tips

* For larger projects, consider using an ORM such as SQLAlchemy.
* In high-traffic bots, leverage connection pooling for performance.
* Always verify your database schema on startup (e.g., by running your `CREATE TABLE` scripts).

---

**Next Chapter:** Server and User Management! ⚙️
**فصل ۶: مفاهیم پیشرفتهتر**  
---

### **۶.۱ مدیریت خطاها (Error Handling)**  
هر ربات ممکن است با خطا مواجه شود! مدیریت خطا باعث میشود ربات شما به جای کرش کردن، به کار خود ادامه دهد.  

#### **استفاده از `try/catch`**  
```javascript
client.on('messageCreate', async (message) => {
  try {
    // کدی که ممکن است خطا دهد (مثلاً دسترسی به API)
    await someRiskyOperation();
  } catch (error) {
    console.error('خطا رخ داد:', error);
    message.reply('⚠️ خطایی رخ داد! لطفاً بعداً تلاش کنید.');
  }
});
```

#### **لاگگیری از خطاها**  
- خطاها را در فایل ذخیره کنید:  
  ```javascript
  const fs = require('fs');
  fs.appendFileSync('errors.log', `${new Date().toISOString()}: ${error.stack}\n`);
  ```

---

### **۶.۲ دستورات اسلشی (Slash Commands)**  
دستورات اسلشی (/command) تجربه کاربری بهتری دارند و نیاز به پیشوند (!) ندارند.  

#### **ثبت دستورات اسلشی**  
۱. **تعریف دستور در کد**:  
   ```javascript
   const { SlashCommandBuilder } = require('discord.js');

   module.exports = {
     data: new SlashCommandBuilder()
       .setName('پینگ')
       .setDescription('پینگ ربات را بررسی کنید'),
     async execute(interaction) {
       await interaction.reply('🏓 پونگ!');
     }
   };
   ```

۲. **ثبت دستورات در دیسکورد**:  
   - برای **یک سرور خاص** (سریعتر):  
     ```javascript
     const rest = new REST().setToken(process.env.TOKEN);
     const commands = [پینگCommand.data.toJSON()];
     await rest.put(
       Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
       { body: commands }
     );
     ```
   - برای **همه سرورها** (Global):  
     ```javascript
     await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
     ```

---

### **۶.۳ کار با دیتابیس**  
برای ذخیره دادههای پایدار (مثل XP کاربران) نیاز به دیتابیس دارید.  

#### **استفاده از JSON فایل (ساده)**  
```javascript
const fs = require('fs');

// خواندن دیتابیس
let db = JSON.parse(fs.readFileSync('database.json'));

// ذخیره XP کاربر
db[message.author.id] = { xp: 100, level: 2 };

// آپدیت فایل
fs.writeFileSync('database.json', JSON.stringify(db));
```

#### **استفاده از SQLite (پیشرفتهتر)**  
۱. نصب پکیج:  
   ```bash
   npm install better-sqlite3
   ```

۲. اتصال به دیتابیس:  
   ```javascript
   const Database = require('better-sqlite3');
   const db = new Database('database.sqlite');

   // ساخت جدول
   db.prepare(`
     CREATE TABLE IF NOT EXISTS users (
       id TEXT PRIMARY KEY,
       xp INTEGER DEFAULT 0,
       level INTEGER DEFAULT 1
     )
   `).run();
   ```

۳. افزودن داده:  
   ```javascript
   const insert = db.prepare('INSERT INTO users (id, xp) VALUES (?, ?)');
   insert.run(message.author.id, 100);
   ```

---

### **۶.۴ سیستم لول (XP System)**  
**مثال عملی با JSON**:  
```javascript
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  // افزایش XP کاربر
  const userId = message.author.id;
  db[userId] = db[userId] || { xp: 0, level: 1 };
  db[userId].xp += 10;

  // بررسی ارتقا سطح
  if (db[userId].xp >= db[userId].level * 100) {
    db[userId].level += 1;
    message.channel.send(`🎉 ${message.author} به سطح ${db[userId].level} رسید!`);
  }

  fs.writeFileSync('database.json', JSON.stringify(db));
});
```

---

### **تمرین عملی فصل ۶**  
۱. دستور اسلشی `/ساعت` بسازید که زمان فعلی را برگرداند.  
۲. با SQLite جدولی برای نظرسنجیها ایجاد کنید و نتایج را ذخیره کنید.  
۳. سیستمی طراحی کنید که با هر پیام کاربر، شانس تصادفی جایزه بدهد!  

---

### **مشکلات رایج و راهحلها**  
- **دستورات اسلشی نمایش داده نمیشوند**:  
  - ۲۴-۴۸ ساعت صبر کنید (برای دستورات Global).  
  - از `CLIENT_ID` و `GUILD_ID` معتبر استفاده کنید.  
- **خطای دسترسی دیتابیس**:  
  - مطمئن شوید فایلهای JSON/SQLite قابل نوشتن هستند.  
  - از مسیرهای نسبی (مثل `./database.json`) استفاده کنید.  

---

### **نکات کلیدی**  
- برای محیط Production از دیتابیسهای قویتر مثل **PostgreSQL** یا **MongoDB** استفاده کنید.  
- همیشه قبل از تعامل با دیتابیس، ورودی کاربر را **اعتبارسنجی** کنید (برای جلوگیری از حمله تزریق SQL).  
- از **.env** برای ذخیره توکن و اطلاعات حساس استفاده کنید (فصل ۷).  

---

در فصل بعدی، **استقرار (Deploy) ربات** روی سرور و نکات امنیتی را یاد خواهید گرفت! 🚀
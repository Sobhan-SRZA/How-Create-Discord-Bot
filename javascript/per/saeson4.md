**فصل ۴: شروع کار با discord.js**  
---

### **۴.۱ معرفی کتابخانه discord.js**  
`discord.js` یک کتابخانه قدرتمند و انعطافپذیر برای ساخت رباتهای دیسکورد با جاوااسکریپت/Node.js است.  

#### **چرا discord.js؟**  
- **ساده و مبتدیپسند**: نسبت به کتابخانههای دیگر (مثل `Eris`) یادگیری آسانتری دارد.  
- **امن و بهروز**: بهطور مرتب آپدیت میشود و با آخرین تغییرات API دیسکورد سازگار است.  
- **مستندات عالی**: [مستندات رسمی](https://discord.js.org) آن جامع و همراه با مثال است.  

---

### **۴.۲ ساختار اصلی یک ربات**  
هر ربات دیسکورد با `discord.js` سه بخش اصلی دارد:  
1. **Client**: اتصال ربات به دیسکورد.  
2. **Events**: پردازش رویدادها (مثل دریافت پیام).  
3. **Commands**: اجرای دستورات کاربران.  

---

### **۴.۳ اتصال ربات به دیسکورد**  
#### **مراحل راهاندازی اولیه**  
1. **ایجاد یک `Client`**:  
   ```javascript
   const { Client, GatewayIntentBits } = require('discord.js');
   const client = new Client({
     intents: [
       GatewayIntentBits.Guilds, // دسترسی به سرورها
       GatewayIntentBits.GuildMessages, // دریافت پیامها
       GatewayIntentBits.MessageContent // خواندن محتوای پیامها
     ]
   });
   ```

2. **اتصال با توکن**:  
   ```javascript
   client.login('TOKEN_ربات_خود');
   ```

3. **رویداد `ready`**:  
   ```javascript
   client.on('ready', () => {
     console.log(`✅ ${client.user.tag} آنلاین شد!`);
   });
   ```

---

### **۴.۴ پاسخ به پیامهای کاربران**  
از رویداد `messageCreate` برای دریافت پیامها استفاده میشود:  
```javascript
client.on('messageCreate', (message) => {
  // اگر نویسنده پیام خود ربات باشد، پردازش نکند
  if (message.author.bot) return;

  // پاسخ به پیام "سلام"
  if (message.content === 'سلام') {
    message.reply('سلام! چطوری؟ 😊');
  }
});
```

---

### **۴.۵ ساخت اولین دستور (پینگ-پونگ)**  
```javascript
client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    const start = Date.now();
    message.reply('در حال محاسبه پینگ...').then((sentMessage) => {
      const latency = Date.now() - start;
      sentMessage.edit(`🏓 پونگ! تاخیر: ${latency}ms`);
    });
  }
});
```

---

### **۴.۶ کار با اطلاعات پیام**  
هر شیء `message` شامل اطلاعات مفیدی است:  
- **محتوا**: `message.content`  
- **نویسنده**: `message.author.tag`  
- **کانال**: `message.channel.name`  
- **سرور**: `message.guild.name`  

**مثال**:  
```javascript
client.on('messageCreate', (message) => {
  console.log(
    `پیام از ${message.author.tag} در کانال #${message.channel.name}: ${message.content}`
  );
});
```

---

### **تمرین عملی فصل ۴**  
۱. رباتی بسازید که به دستور `!ساعت` زمان فعلی را پاسخ دهد.  
۲. دستوری ایجاد کنید که با `!کاربر` نام و تگ کاربر را برگرداند.  
۳. دستور `!پاککن` را پیادهسازی کنید تا تعداد پیامهای مشخصی را پاک کند (اختیاری).  

**مثال تمرین ۱**:  
```javascript
if (message.content === '!ساعت') {
  const time = new Date().toLocaleTimeString('fa-IR');
  message.reply(`ساعت فعلی: ${time}`);
}
```

---

### **مشکلات رایج و راهحلها**  
- **ربات آنلاین نمیشود**:  
  - توکن را بررسی کنید.  
  - اینترنت وصل است؟  
  - آیا Intentهای لازم در پنل توسعهدهندگان فعال شدهاند؟ ([راهنمای فعالسازی Intents](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot))  
- **ربات به پیامها پاسخ نمیدهد**:  
  - Intent `MessageContent` را اضافه کنید.  
  - مطمئن شوید ربات به سرور اضافه شده است.  

---

### **نکات کلیدی**  
- **Gateway Intents** را در [پنل توسعهدهندگان دیسکورد](https://discord.com/developers/applications) فعال کنید.  
- **هرگز توکن ربات را در کد عمومی قرار ندهید** (از فایل `.env` استفاده کنید. فصل ۷ آموزش داده میشود).  
- برای دستورات پیشرفتهتر، از **Slash Commands** استفاده کنید (فصل ۶).  

---

در فصل بعدی، **ساخت دستورات پیشرفتهتر** و کار با **Embedها** را یاد خواهید گرفت! 🚀
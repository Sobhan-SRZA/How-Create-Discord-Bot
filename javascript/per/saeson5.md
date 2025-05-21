**فصل ۵: ساخت دستورات پیشرفته تر و کار با Embed ها**  

---

### **۵.۱ پردازش دستورات با پیشوند (Prefix Commands)**  
برای ساخت دستورات حرفه ای تر، باید پیام های کاربران را تجزیه و تحلیل کنید.  

#### **مراحل پردازش دستورات**:  
۱. **بررسی پیشوند**:  

   ```javascript
   const prefix = '!'; // پیشوند دستورات (مثلاً !پینگ)
   if (!message.content.startsWith(prefix)) return;
   ```

۲. **جداسازی دستور و آرگومان ها**:  

   ```javascript
   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase(); // نام دستور (مثلاً "پینگ")
   ```

**مثال**:  

```javascript
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ساین') {
    const text = args.join(' ');
    message.channel.send(`📢 ${text.toUpperCase()}`);
  }
});
```

---

### **۵.۲ ساخت Embed های زیبا**  
Embed ها پیام های ساختار یافته و جذابی هستند که اطلاعات را به صورت سازماندهی شده نمایش می دهند.  

#### **استفاده از `EmbedBuilder`**:  

```javascript
const { EmbedBuilder } = require('discord.js');

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF) // رنگ نوار کناری (به فرمت HEX)
  .setTitle('عنوان Embed')
  .setDescription('توضیحات کلی')
  .addFields(
    { name: 'فیلد ۱', value: 'مقدار ۱', inline: true },
    { name: 'فیلد ۲', value: 'مقدار ۲', inline: true },
  )
  .setImage('https://example.com/image.png')
  .setTimestamp(); // اضافه کردن زمان فعلی

message.channel.send({ embeds: [exampleEmbed] });
```

#### **مثال عملی (دستور !کاربر)**:  

```javascript
if (command === 'کاربر') {
  const user = message.author;
  const embed = new EmbedBuilder()
    .setColor('Random')
    .setTitle('اطلاعات کاربر')
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: 'تگ', value: user.tag },
      { name: 'آیدی', value: user.id },
      { name: 'تاریخ ساخت حساب', value: user.createdAt.toLocaleDateString('fa-IR') }
    );

  message.channel.send({ embeds: [embed] });
}
```

---

### **۵.۳ دستورات مدیریتی (ادمین)**  
ساخت دستوراتی که نیاز به دسترسی های خاص دارند (مثلاً پاک کردن پیام ها).  

#### **دستور !پاککن**:  

```javascript
if (command === 'پاککن') {
  // بررسی آیا کاربر دارای دسترسی مدیریت پیام ها است
  if (!message.member.permissions.has('ManageMessages')) {
    return message.reply('❌ شما دسترسی لازم را ندارید!');
  }

  const amount = parseInt(args[0]) || 10; // پیشفرض ۱۰ پیام
  if (isNaN(amount) || amount > 100) {
    return message.reply('لطفاً عددی بین ۱ تا ۱۰۰ وارد کنید!');
  }

  message.channel.bulkDelete(amount + 1) // +1 برای حذف خود دستور
    .then(() => {
      message.channel.send(`✅ ${amount} پیام پاک شد!`).then(msg => {
        setTimeout(() => msg.delete(), 5000);
      });
    })
    .catch(console.error);
}
```

---

### **۵.۴ افزودن Reactions به پیام ها**  
استفاده از ری اکشن ها برای تعامل بیشتر (مثلاً نظرسنجی).  

**مثال (دستور !نظرسنجی)**:  

```javascript
if (command === 'نظرسنجی') {
  const question = args.join(' ');
  if (!question) return message.reply('لطفاً سوال نظرسنجی را وارد کنید!');

  const pollEmbed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle('📊 نظرسنجی')
    .setDescription(question)
    .addFields({ name: 'دستورالعمل', value: 'با ✅/❌ رأی دهید!' });

  message.channel.send({ embeds: [pollEmbed] }).then(pollMessage => {
    pollMessage.react('✅');
    pollMessage.react('❌');
  });
}
```

---

### **تمرین عملی فصل ۵**  
۱. دستوری بسازید که با `!سطح` اطلاعات سطح کاربر (XP) را در Embed نمایش دهد (داده ها را می توانید در آرایه ذخیره کنید).  
۲. دستور `!کمک` ایجاد کنید که لیست دستورات ربات را در یک Embed سازماندهی کند.  
۳. دستور `!بن` را پیاده سازی کنید که کاربران را با آیدی بن کند (اختیاری).  

---

### **مشکلات رایج و راه حل ها**  
- **Embed ارسال نمی شود**:  
  - مطمئن شوید از `embeds: [embed]` استفاده کرده اید نه `embed: embed`.  
  - بررسی کنید رنگ (Color) را بهدرستی تنظیم کرده اید.  
- **خطای دسترسی (Permissions)**:  
  - در پنل دیسکورد، دسترسی **Manage Messages** را به ربات بدهید.  
  - از `message.member.permissions.has()` برای بررسی دسترسی کاربر استفاده کنید.  

---

### **نکات کلیدی**  
- برای جلوگیری از Overwrite شدن Embedها، هر فیلد نباید بیش از **1024 کاراکتر** باشد.  
- از `setFooter()` برای افزودن متن پایینی در Embed استفاده کنید.  
- برای دریافت اطلاعات سرور (Guild) از `message.guild` استفاده کنید.  

---

در فصل بعدی، **مفاهیم پیشرفته تر** مثل **Slash Commands**، **مدیریت خطا ها** و **کار با دیتابیس** را یاد خواهید گرفت! 🚀
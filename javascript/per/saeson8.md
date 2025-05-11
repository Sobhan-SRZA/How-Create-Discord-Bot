**فصل ۸: پروژههای عملی برای تثبیت مهارتها**  
---

### **۸.۱ پروژه ۱: ربات نظرسنجی (Poll Bot)**  
**هدف**: ساخت رباتی که با دستور `!نظرسنجی [سوال]` یک نظرسنجی با Reactions ایجاد کند و نتایج را تحلیل کند.  

#### **مراحل پیادهسازی**:  
۱. **دریافت سوال و ایجاد Embed**:  
   ```javascript
   client.on('messageCreate', async (message) => {
     if (!message.content.startsWith('!نظرسنجی') || message.author.bot) return;
     const question = message.content.slice(9).trim();
     if (!question) return message.reply('لطفاً سوال نظرسنجی را وارد کنید!');

     const pollEmbed = new EmbedBuilder()
       .setColor('#5865F2')
       .setTitle('📊 نظرسنجی جدید')
       .setDescription(question)
       .addFields({ name: 'گزینهها', value: '✅ = موافق\n❌ = مخالف' });

     const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
     await pollMessage.react('✅');
     await pollMessage.react('❌');
   });
   ```

۲. **جمعآوری نتایج**:  
   ```javascript
   client.on('messageReactionAdd', async (reaction, user) => {
     if (user.bot) return;
     if (reaction.message.embeds[0]?.title === '📊 نظرسنجی جدید') {
       const agree = reaction.message.reactions.cache.get('✅')?.count || 0;
       const disagree = reaction.message.reactions.cache.get('❌')?.count || 0;
       // ذخیره نتایج در دیتابیس یا نمایش آن
     }
   });
   ```

---

### **۸.۲ پروژه ۲: ربات پخش موزیک (Music Bot)**  
**هدف**: ساخت رباتی که به کانال صوتی متصل شود و آهنگ پخش کند.  

#### **مراحل پیادهسازی**:  
۱. **نصب پکیجهای مورد نیاز**:  
   ```bash
   npm install @discordjs/voice @discordjs/rest @discordjs/opus ffmpeg-static ytdl-core
   ```

۲. **اتصال به کانال صوتی**:  
   ```javascript
   const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

   client.on('messageCreate', async (message) => {
     if (message.content.startsWith('!پخش')) {
       const voiceChannel = message.member.voice.channel;
       if (!voiceChannel) return message.reply('⚠️ اول به کانال صوتی جوین شو!');

       const connection = joinVoiceChannel({
         channelId: voiceChannel.id,
         guildId: voiceChannel.guild.id,
         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
       });

       const stream = ytdl('https://youtu.be/آیدی-آهنگ', { filter: 'audioonly' });
       const resource = createAudioResource(stream);
       const player = createAudioPlayer();

       connection.subscribe(player);
       player.play(resource);
     }
   });
   ```

---

### **۸.۳ پروژه ۳: سیستم سطحبندی (XP System)**  
**هدف**: ساخت سیستمی که فعالیت کاربران را ردیابی کند و بر اساس XP به آنها سطح دهد.  

#### **مراحل پیادهسازی**:  
۱. **ذخیره دادهها در JSON**:  
   ```javascript
   const fs = require('fs');
   let xpData = JSON.parse(fs.readFileSync('xp.json', 'utf8')) || {};

   client.on('messageCreate', (message) => {
     if (message.author.bot) return;

     const userId = message.author.id;
     xpData[userId] = xpData[userId] || { xp: 0, level: 1 };

     // افزایش XP تصادفی بین ۵ تا ۱۵
     xpData[userId].xp += Math.floor(Math.random() * 11) + 5;

     // بررسی ارتقا سطح
     const xpRequired = xpData[userId].level * 100;
     if (xpData[userId].xp >= xpRequired) {
       xpData[userId].level += 1;
       message.channel.send(`🎉 ${message.author} به سطح ${xpData[userId].level} رسید!`);
     }

     fs.writeFileSync('xp.json', JSON.stringify(xpData));
   });
   ```

۲. **دستور !سطح**:  
   ```javascript
   if (message.content === '!سطح') {
     const userData = xpData[message.author.id] || { xp: 0, level: 1 };
     const embed = new EmbedBuilder()
       .setTitle('📊 سطح شما')
       .addFields(
         { name: 'سطح', value: userData.level.toString() },
         { name: 'XP', value: userData.xp.toString() }
       );
     message.channel.send({ embeds: [embed] });
   }
   ```

---

### **۸.۴ پروژه ۴: ربات مُدیریتی (Moderation Bot)**  
**هدف**: ساخت رباتی با دستورات مدیریتی مثل بن، میوت و پاککردن پیام.  

#### **دستور !بن**:  
```javascript
if (command === 'بن') {
  if (!message.member.permissions.has('BanMembers')) {
    return message.reply('❌ شما دسترسی بن کردن ندارید!');
  }

  const target = message.mentions.users.first();
  if (!target) return message.reply('⚠️ کاربر را منشن کنید!');

  message.guild.members.ban(target.id)
    .then(() => message.reply(`✅ ${target.tag} بن شد!`))
    .catch(() => message.reply('⛔ خطا در بن کردن!'));
}
```

---

### **۸.۵ پروژه ۵: ربات مینیگیم (سکه، شانس، ...)**  
**هدف**: ساخت بازیهای ساده برای تعامل با کاربران.  

#### **دستور !سکه**:  
```javascript
if (command === 'سکه') {
  const result = Math.random() < 0.5 ? 'رو' : 'پشت';
  message.reply(`سکه انداختم... **${result}** آمد!`);
}

// دستور !شماره
if (command === 'شماره') {
  const number = Math.floor(Math.random() * 100) + 1;
  message.reply(`شماره تصادفی: **${number}**`);
}
```

---

### **تمرینهای تکمیلی**:  
۱. **ربات تیکت**: سیستمی که با دستور `!تیکت` یک کانال جدید برای کاربر ایجاد کند.  
۲. **ربات واژهیاب**: با دستور `!معنی [کلمه]` معنی کلمه را از یک API دریافت کند.  
۳. **ربات آبوهوا**: با دستور `!آبوهوا [شهر]` اطلاعات آبوهوا را نمایش دهد.  

---

### **مشکلات رایج**:  
- **ربات موزیک صدا پخش نمیکند**:  
  - مطمئن شوید **FFmpeg** نصب است (`npm install ffmpeg-static`).  
  - بررسی کنید ربات به کانال صوتی وارد شده است.  
- **سیستم XP دادهها را ذخیره نمیکند**:  
  - از `fs.writeFileSync` بعد از هر تغییر استفاده کنید.  
  - مسیر فایل `xp.json` را بررسی کنید.  

---

### **نکات نهایی**:  
- پروژهها را بهصورت **ماژولار** کدنویسی کنید (هر دستور در فایل جداگانه).  
- از **GitHub** برای مدیریت نسخهها استفاده کنید.  
- برای ایدههای بیشتر، به [Discord Bot Ideas](https://github.com/discordjs/guide/discussions) مراجعه کنید.  

--- 

**پایان دوره!** 🎓  
حالا شما میتوانید رباتهای دیسکورد حرفهای بسازید، آنها را توسعه دهید و روی سرور منتشر کنید. یادگیری را ادامه دهید و پروژههای شخصیسازیشده خود را خلق کنید!
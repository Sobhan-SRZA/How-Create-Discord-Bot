## **Chapter 8: Practical Projects to Solidify Your Skills**

---

### **8.1 Project 1: Poll Bot**

**Goal:** Build a bot that, with the command `!poll [question]`, creates a reaction-based poll and tracks results.

#### **Implementation Steps:**

1. **Receive the Question & Create an Embed**

   ```javascript
   client.on('messageCreate', async (message) => {
     if (!message.content.startsWith('!poll') || message.author.bot) return;
     const question = message.content.slice(5).trim();
     if (!question) return message.reply('Please provide a poll question!');

     const pollEmbed = new EmbedBuilder()
       .setColor('#5865F2')
       .setTitle('📊 New Poll')
       .setDescription(question)
       .addFields({ name: 'Options', value: '✅ = Yes\n❌ = No' });

     const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
     await pollMessage.react('✅');
     await pollMessage.react('❌');
   });
   ```

2. **Collect Results**

   ```javascript
   client.on('messageReactionAdd', async (reaction, user) => {
     if (user.bot) return;
     const embed = reaction.message.embeds[0];
     if (embed?.title === '📊 New Poll') {
       const yesCount = reaction.message.reactions.cache.get('✅')?.count || 0;
       const noCount  = reaction.message.reactions.cache.get('❌')?.count || 0;
       // Store or display the counts as needed
     }
   });
   ```

---

### **8.2 Project 2: Music Bot**

**Goal:** Create a bot that joins a voice channel and plays music.

#### **Implementation Steps:**

1. **Install Required Packages**

   ```bash
   npm install @discordjs/voice @discordjs/opus ffmpeg-static ytdl-core
   ```

2. **Connect to a Voice Channel & Play**

   ```javascript
   const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
   const ytdl = require('ytdl-core');

   client.on('messageCreate', async (message) => {
     if (message.content.startsWith('!play')) {
       const voiceChannel = message.member.voice.channel;
       if (!voiceChannel) return message.reply('⚠️ You must join a voice channel first!');

       const connection = joinVoiceChannel({
         channelId: voiceChannel.id,
         guildId: voiceChannel.guild.id,
         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
       });

       const stream = ytdl('https://youtu.be/VIDEO_ID', { filter: 'audioonly' });
       const resource = createAudioResource(stream);
       const player = createAudioPlayer();

       connection.subscribe(player);
       player.play(resource);
     }
   });
   ```

---

### **8.3 Project 3: XP Leveling System**

**Goal:** Track user activity and assign levels based on XP.

#### **Implementation Steps:**

1. **Store Data in JSON**

   ```javascript
   const fs = require('fs');
   let xpData = JSON.parse(fs.readFileSync('xp.json', 'utf8')) || {};

   client.on('messageCreate', (message) => {
     if (message.author.bot) return;

     const userId = message.author.id;
     xpData[userId] = xpData[userId] || { xp: 0, level: 1 };

     // Award random XP (5–15)
     xpData[userId].xp += Math.floor(Math.random() * 11) + 5;

     // Check for level-up
     const xpNeeded = xpData[userId].level * 100;
     if (xpData[userId].xp >= xpNeeded) {
       xpData[userId].level++;
       message.channel.send(`🎉 ${message.author} reached level ${xpData[userId].level}!`);
     }

     fs.writeFileSync('xp.json', JSON.stringify(xpData));
   });
   ```

2. **Create the `!level` Command**

   ```javascript
   if (message.content === '!level') {
     const userData = xpData[message.author.id] || { xp: 0, level: 1 };
     const embed = new EmbedBuilder()
       .setTitle('📊 Your Level')
       .addFields(
         { name: 'Level', value: userData.level.toString(), inline: true },
         { name: 'XP',    value: userData.xp.toString(),    inline: true }
       );
     message.channel.send({ embeds: [embed] });
   }
   ```

---

### **8.4 Project 4: Moderation Bot**

**Goal:** Implement moderation commands like ban, mute, and bulk delete.

#### **`!ban` Command Example**

```javascript
if (command === 'ban') {
  if (!message.member.permissions.has('BanMembers')) {
    return message.reply('❌ You do not have permission to ban members!');
  }

  const target = message.mentions.users.first();
  if (!target) return message.reply('⚠️ Please mention a user to ban!');

  message.guild.members.ban(target.id)
    .then(() => message.reply(`✅ ${target.tag} has been banned!`))
    .catch(() => message.reply('⛔ Failed to ban the user!'));
}
```

---

### **8.5 Project 5: Mini-Games Bot**

**Goal:** Create simple interactive games.

#### **`!coin` Command**

```javascript
if (command === 'coin') {
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  message.reply(`I flipped a coin and got **${result}**!`);
}
```

#### **`!number` Command**

```javascript
if (command === 'number') {
  const num = Math.floor(Math.random() * 100) + 1;
  message.reply(`Your random number is **${num}**`);
}
```

---

### **Additional Challenges**

1. **Ticket Bot:** With `!ticket`, create a private support channel for the user.
2. **Dictionary Bot:** `!define [word]` fetches definitions from an API.
3. **Weather Bot:** `!weather [city]` displays current weather info.

---

### **Common Issues & Fixes**

* **Music Bot Isn’t Playing:**

  * Ensure **FFmpeg** is installed (`npm install ffmpeg-static`).
  * Confirm the bot has joined the voice channel.
* **XP System Not Saving Data:**

  * Use `fs.writeFileSync` after each update.
  * Verify the correct path to `xp.json`.

---

### **Final Tips**

* Code projects **modularly** (each command in its own file).
* Use **GitHub** for version control.
* For more ideas, see [Discord Bot Ideas](https://github.com/discordjs/guide/discussions).

---

**Course Complete!** 🎓
You can now build, extend, and deploy professional Discord bots. Keep learning and create your own custom projects!
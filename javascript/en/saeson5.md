## **Chapter 5: Building Advanced Commands and Working with Embeds**

---

### **5.1 Handling Prefix Commands**

To build more sophisticated commands, you need to parse the user’s message.

#### **Command Processing Steps**

1. **Check the prefix**:

   ```javascript
   const prefix = '!'; // Command prefix (e.g., !ping)
   if (!message.content.startsWith(prefix)) return;
   ```
2. **Split command and arguments**:

   ```javascript
   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase(); // e.g., "ping"
   ```

**Example**:

```javascript
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'announce') {
    const text = args.join(' ');
    message.channel.send(`📢 ${text.toUpperCase()}`);
  }
});
```

---

### **5.2 Creating Rich Embeds**

Embeds let you send richly formatted, structured messages.

#### **Using `EmbedBuilder`**

```javascript
const { EmbedBuilder } = require('discord.js');

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF)            // Sidebar color in HEX
  .setTitle('Embed Title')       // Title
  .setDescription('General info')// Description
  .addFields(                    // Fields
    { name: 'Field 1', value: 'Value 1', inline: true },
    { name: 'Field 2', value: 'Value 2', inline: true }
  )
  .setImage('https://example.com/image.png') // Main image
  .setTimestamp();                // Add current timestamp

message.channel.send({ embeds: [exampleEmbed] });
```

#### **Practical Example (`!user` command)**

```javascript
if (command === 'user') {
  const user = message.author;
  const embed = new EmbedBuilder()
    .setColor('Random')
    .setTitle('User Information')
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: 'Tag', value: user.tag },
      { name: 'ID', value: user.id },
      { name: 'Account Created', value: user.createdAt.toLocaleDateString('en-US') }
    );

  message.channel.send({ embeds: [embed] });
}
```

---

### **5.3 Administrative Commands**

Commands that require special permissions (e.g., deleting messages).

#### **The `!purge` Command**

```javascript
if (command === 'purge') {
  // Check Manage Messages permission
  if (!message.member.permissions.has('ManageMessages')) {
    return message.reply('❌ You don’t have permission to use this!');
  }

  const amount = parseInt(args[0]) || 10; // Default to 10 messages
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Please enter a number between 1 and 100!');
  }

  message.channel.bulkDelete(amount + 1) // +1 to delete the purge command itself
    .then(() => {
      message.channel.send(`✅ Deleted ${amount} messages!`).then(msg => {
        setTimeout(() => msg.delete(), 5000);
      });
    })
    .catch(console.error);
}
```

---

### **5.4 Adding Reactions**

Use reactions for interactive features (like polls).

#### **Poll Example (`!poll` command)**

```javascript
if (command === 'poll') {
  const question = args.join(' ');
  if (!question) return message.reply('Please provide a poll question!');

  const pollEmbed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle('📊 Poll Time')
    .setDescription(question)
    .addFields({ name: 'Instructions', value: 'React with ✅ or ❌!' });

  message.channel.send({ embeds: [pollEmbed] }).then(pollMessage => {
    pollMessage.react('✅');
    pollMessage.react('❌');
  });
}
```

---

### **Hands-On Exercise for Chapter 5**

1. Create a `!level` command that displays a user’s XP level in an embed (store data in an array or simple JSON).
2. Build a `!help` command that lists all bot commands in a neatly organized embed.
3. (Optional) Implement a `!ban` command to ban a user by ID.

---

### **Common Issues & Solutions**

* **Embed Doesn’t Send:**

  * Ensure you pass it as `{ embeds: [embed] }`, not `embed: embed`.
  * Verify your color value is valid.
* **Permission Errors:**

  * Grant the bot **Manage Messages** permission in your server settings.
  * Use `message.member.permissions.has()` to check user permissions.

---

### **Key Tips**

* No field in an embed may exceed **1024 characters**.
* Use `setFooter()` to add footer text.
* Access guild information via `message.guild`.

---

In the next chapter, you’ll explore **advanced concepts** like **Slash Commands**, **error handling**, and **database integration**! 🚀
# How-Create-Discord-Bot
ez

# Command Handelr
```js
//===========================================================================================================//
//consol
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });  
const prefix = "BOT_PREFIX";
client.commands = new Discord.Collection();
client.login("BOT_TOKEN");


//===========================================================================================================//
//Loading Commands
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

//===========================================================================================================//
//Events
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
```

hamino mizari indexet
badesh
ye file misazi be esme message.js va toie poshe events mizari

badesh in code ro mizari to file message.js
```js
module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = "BOT_PREFIX";

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};
```
bade inke poshe commands ro sakhti tosh har file sakhti akharesh baiad .js dashte bashe

```js
module.exports = {
    name: 'ESM-COMMAND',
    aliases: ['ALIAS-1','ALIAS-2'],
    category: 'CATEGORY-COMMAND',
    utilisation: '{prefix}COMMAND-NAME',
  async execute(client, message, args) { 
 }
}

```
az hala bebad jori ke man barat commande handelr neveshtam hamishe baiad avval code haie poshe commands ino toshon dashte bashan

gablan behet yad dadam chetory az command handelr haie bagie baraie khodet estefade koni
ez

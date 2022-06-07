//===========================================================================================================//
//consol
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({});  
client.commands = new Discord.Collection();
client.prefix = "BOT_PREFIX";
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

//===========================================================================================================//
//Run Bot
client.on("ready", () => {
    console.log(`${client.user.tag} Is Now Online :)`)
})
module.exports = {
    name: 'ESM-COMMAND',
    aliases: ['ALIAS-1','ALIAS-2'],
    category: 'CATEGORY-COMMAND',
    utilisation: '{prefix}COMMAND-NAME',
  async execute(client, message, args) { 
    message.channel.startTyping();
    message.reply('Testing...').then(embedMessage => { 
    message.channel.stopTyping() 
   }) 
 }
}

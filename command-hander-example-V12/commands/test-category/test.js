module.exports = {
  name: 'command-name',
  aliases: ['aliases-1','aliases-2'],
  category: 'command-category-name',
  utilisation: '{prefix}command-name',
  usage: '[ some-info-about-usages ]',
async execute(client, message, args) {
  setTimeout(() => {
    message.channel.startTyping()
  }, 1000*5)  
  message.reply('Testing...')  
  setTimeout(() => {
    message.channel.stopTyping() 
  }, 1000*5) 
}
}
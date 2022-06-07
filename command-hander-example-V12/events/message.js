module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    if (message.content.indexOf(client.prefix) !== 0) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};

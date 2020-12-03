module.exports = {
    name: "ping",
    aliases: [],
    help: "Get the ping of the bot",
    exe: (_client, message, _args) => {
        then = Date.now();
        message.channel.send(":ping_pong: Pong ! **0**ms").then(m => {
            m.edit(`:ping_pong: Pong ! **${Date.now() - then}**ms`);
        });
    }
}
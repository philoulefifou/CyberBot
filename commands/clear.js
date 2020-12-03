module.exports = {
    name: "clear",
    aliases: [],
    help: "Clear messages in a channel.",
    exe: (_client, message, args) => {
        if (message.author.bot) return;

        // Return if issues.
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Tu ne peux pas faire ça ${message.author.toString()} !`).then(m => m.delete({ timeout: 10000 }));
        if (args.length != 1) return message.channel.send("Il ne doit y avoir qu'un argument, le nombre de message a supprimer.").then(m => m.delete({ timeout: 10000 }));
        if (!Number(args[0])) return message.channel.send("L'argument doit être un nombre.").then(m => m.delete({ timeout: 10000 }));

        let nbMessages = Number(args[0]) + 1; // The number of messages that must be deleted (+ the command sent).

        if (nbMessages >= 100) nbMessages = 100; // Set max to 100
 
        message.channel.bulkDelete(nbMessages)
            .then(() => message.channel.send(`**${nbMessages}** messages supprimés par \`${message.author.tag}\` !`).then(m => m.delete({ timeout: 10000 })))
            .catch(err => message.channel.send(`Erreur, \n\`\`\`batch\n${err}\n\`\`\``).then(m => m.delete({ timeout: 10000 })));

    }
}
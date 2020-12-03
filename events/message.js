/*
    When a message is sent
*/

module.exports = (client, message) => {

    const botzChannel = client.guilds.cache.find(g => g.id == client.config.guild).channels.cache.find(c => c.id == client.config.channels.botz);
    if (message.content.startsWith(client.config.prefix) && !message.author.bot) {
        /* 
            Commands
        */
        let msg = message.content.split(' ');
        let cmd = msg.shift().slice(client.config.prefix.length).toLowerCase();
        let args = msg;
        if (client.commands.has(cmd)) {
            // Check by name
            client.commands.get(cmd).exe(client, message, args);
        } else if (client.commands.find(c => c.aliases.includes(cmd))) {
            // Check aliases
            client.commands.find(c => c.aliases.includes(cmd)).exe(client, message, args);
        }

    } else if (message.author.id == "302050872383242240") {  
        /*
            Disboard
        */
        let txt = message.embeds[0].description.split(' ');

        if (txt[4] == "minutes") time = Number(txt[3]);
        else if (txt.indexOf("Bump" >= 0)) time = 120;
        else return;   

        message.channel.send("Le rappel sera effectué dans " + time + " minutes !")
            .catch(err => console.error(err));

        setTimeout(m => {
            botzChannel.send("Il est l'heure de bumpé `d!bump` ! <@#783029032508850207>");
        }, time*60*1000, message);    
    } else if (message.content.indexOf('https://discord.gg/') >= 0 && !(message.member.hasPermission("ADMINISTRATOR")) && !message.author.bot) {            
        /*
            Anti pub
        */
        message.channel.send("**La pub n'est pas autorisé sur ce serveur.**");
        message.delete();
    } else if (!message.author.bot && message.channel.id == client.config.channels.general) {
        /*
            Ping Deadchat role
        */
        const filter = m => m.channel = message.channel;
        let col = message.channel.createMessageCollector(filter, {time: 90*60*1000}); // 90 minutes
        
        col.on('collect', () => col.stop());
        col.on("end", (_, reason) => {
            if (reason == "time") {
                message.channel.send(`Réveillez-vous <@&783029316379607071> !`);
            }
        });
    }



}
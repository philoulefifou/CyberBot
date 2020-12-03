module.exports = (client, member) => {

    let guild = client.guilds.cache.first();

    let gbyeEmbed = {
            "description": `<@${member.user.id}> a quitté ...`,
            "color": guild.members.cache.find(m => m.id == client.user.id).displayColor,
            "author": {
                "name": member.user.tag,
                "icon_url": member.user.displayAvatarURL()
            },
            "timestamp": Date.now(),
            "thumbnail": {
                "url": member.user.displayAvatarURL()
            }
        }

    guild.channels.cache.find(c => c.id == client.config.channels.welcome)
        .send({ embed: gbyeEmbed });
    
}
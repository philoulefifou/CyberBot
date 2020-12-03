module.exports = (client, member) => {

    let guild = client.guilds.cache.first();

    let welcomeEmbed = {
            "title": "Bienvenue chez *CyberVibes*, amuses toi bien ici !",
            "description": "Vas voir les <#782363953963597845> et rajoutes-toi des <#782364118606544917> !",
            "color": guild.members.cache.find(m => m.id == client.user.id).displayColor,
            "author": {
                "name": member.user.tag,
                "icon_url": member.user.displayAvatarURL()
            },
            "footer": {
                "text": `Tu es notre ${guild.members.cache.size}ème membre !`
            },
            "timestamp": Date.now(),
            "image": {
                "url": "https://mir-s3-cdn-cf.behance.net/projects/original/08d53492880429.Y3JvcCwxMjMxLDk2MywxMzQsNzY.gif"
            },
            "thumbnail": {
                "url": member.user.displayAvatarURL()
            }
        }

    guild.channels.cache.find(c => c.id == client.config.channels.welcome).send(`Salut toi, <@${member.user.id}> !`, { embed: welcomeEmbed });

}
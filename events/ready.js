/*
    When the bot is online.
*/

let cycle = 0;
let allPresences = [
    { activity: { name: "écris ,help !", type: "PLAYING" }},
    { activity: { name: "suis-je encore humain ..?", type: "PLAYING" }}
]

const cyclePresence = function(client) {
    client.user.setPresence(allPresences[cycle]);

    if (cycle < allPresences.length - 1) {
        cycle += 1;
    } else {
        cycle = 0;
    }
}

module.exports = (client) => {

    setInterval(cyclePresence, 5000, client);

    client.generateInvite().then(inv => console.log(inv));
    console.log("Bot ready.");

}
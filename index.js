/*
    Invite : https://discord.com/api/oauth2/authorize?client_id=782668941851230248&permissions=0&scope=bot
*/

// Require all the modules
const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Create the bot
const client = new Discord.Client();

// Get the config file
client.config = JSON.parse(fs.readFileSync("config.json"));

// Load the events
console.log("Start loading the events ...");
fs.readdirSync("./events").forEach(file => {
    let event_name = file.slice(0, -3);
    client.on(event_name, require(`./events/${file}`).bind(null, client));
    console.log(`"${file}" loaded.`)
});
console.log("All the events are loaded.\n");

// Load the commands
console.log("Start loading the commands ...");
client.commands = new Discord.Collection();
fs.readdirSync("./commands").forEach(file => {
    let cmd_name = file.slice(0, -3).toLowerCase();
    client.commands.set(cmd_name, require(`./commands/${file}`));
    console.log(`"${file}" loaded.`)
});
console.log("All the commands are loaded.\n");

// Login with the secret token
client.login(process.env.TOKEN);
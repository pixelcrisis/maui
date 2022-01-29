/************************/
/** Maui - For Discord **/
/**   by pixelcrisis   **/
/************************/

// Set up Discord Connection
const Discord = require('discord.js')
const intents = [ Discord.Intents.NON_PRIVILEGED, 'GUILD_MEMBERS' ]

const Maui = new Discord.Client({
	ws: { intents: new Discord.Intents(intents) }
})

// Start Our Maui Build
Maui.info = require('./package.json')

// Add Exec and a Sleep() Clone
Maui.exec = require('child_process').exec
Maui.wait = require('util').promisify(setTimeout)
// Add The Relevant Config Sections
Maui.auth = require('config.json').auth
Maui.base = require('config.json').base

// Import Our Global Utilities
require('./toolkit/logger.js')(Maui)
require('./toolkit/utility.js')(Maui)
require('./storage/database.js')(Maui)

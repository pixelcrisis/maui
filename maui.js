/************************/
/** Maui - For Discord **/
/**   by pixelcrisis   **/
/************************/

// Grab Directories With Our Loader
const Load = require('./toolkit/loader.js')

// Set up Discord Connection
const Discord = require('discord.js')
const intents = [ 
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_PRESENCES
]

// Async Start For Loader
const init = async () => {
	const Maui = new Discord.Client({
		intents: new Discord.Intents(intents)
	})

	// Start Our Maui Build
	Maui.info = require('./package.json')

	// Add Exec and a Sleep() Clone
	Maui.exec = require('child_process').exec
	Maui.wait = require('util').promisify(setTimeout)
	// Add The Relevant Config Sections
	Maui.auth = require('./config.json').auth
	Maui.base = require('./config.json').base

	// Import Our Global Utilities
	require('./toolkit/logger.js')(Maui)
	require('./toolkit/utility.js')(Maui)
	require('./storage/database.js')(Maui)

	Maui.Log(`Loading Plugins...`)
	let plugins = await Load('./plugins')
	for (let file of plugins) file.src(Maui)

	Maui.Log(`Binding Events...`)
	let events = await Load('./events')
	for (let file of events) {
		Maui.on(file.name, file.src.bind(null, Maui))
	}

	Maui.Log(`Handling Errors....`)
  process.on('uncaughtException',  err => Maui.Note(err, 'Exception', 'fail'))
  process.on('unhandledRejection', err => Maui.Note(err, 'Rejection', 'fail'))

  Maui.Log(`Logging Into Discord...`)
  Maui.login(Maui.auth.token)
}

init()

// Uses Winston to Log In Console & To File

const Winston = require('winston')
const Logbook = require('read-last-lines')
const configs = require('../config.json').logs
const { format, transports } = Winston
const { combine } = format

const layout = [
	format.timestamp({ format: 'HH:mm:ss' }),
	format.printf(log => `${log.timestamp} [${log.level}] ${log.message}`)
]

// Define Outputs
const toFile = combine(...layout)
const addColors = format.colorize({ all: true })
const toConsole = combine(...layout, addColors)

// Toolkits Use Global 'Self' Identifier
module.exports = (Self, filename = 'Maui.log') => {
	// Create The Logger
	Winston.addColors(configs.colors)
	const Logger = Winston.createLogger({
		level: configs.level, 
		levels: configs.levels, 
		transports: [
			new transports.File({ filename, format: toFile }),
			new transports.Console({ format: toConsole })
		]
	})

	// Add Our Logging Access Points
	Self.Log = (text, type = "core") => Logger[type](text)
	Self.Logs = async (n = 30) => await Logbook.read(filename, n)

	// Send Logs To A Discord Channel
	Self.Note = function (text, name, type = "core") {
		// Also Actually Log Them
		this.Log(name || text, type)
		// Ignore If We Aren't A Bot
		if (!this || !this.ready) return
		// Or If We Can't Find The Channel
		let channel = this.channels.cache.get(configs.channel)
		if (!channel) return

		let data = { channel, color: this.base.embed_color }
		let post = { head: name || '', desc: text.stack || text }

		// Add Ping/Formatting For Errors
		if (type == "fail") {
			Data.color = '0xFF0000'
			post.desc = "```" + post.desc + "```"
			post.text = `<@${this.auth.authors.join('><@')}>`
			if (text.stack) this.Log(text.stack, type)
		}

		return this.Reply(data, post)
	}
}
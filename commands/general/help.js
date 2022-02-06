module.exports = {
	name: 'help',
	also: [ 'invite', 'support' ],
	gate: 1,

	help: {
		head: "m!help (command)",
		desc: [
			"Without `command`, returns general help.",
			"Optionally pass a `command` to view the help block for that command.",
			"{{ m!help }}{{ m!help help }}"
		]
	},

	post: {
		head: "{hello}, I'm **Maui!**",
		desc: [
			"I track user timezones so you know what time it is for other members!",
			"",
			"`m!time` - displays the times in the server.",
			"`m!commands` - shows available commands.",
			"`m!help command` - will show help for *command*.",
			"",
			"{website} - {discord} - {invite} - Maui {ver}"
		]
	},

	fire: async function (Maui, Msg) {
		let base = Maui.$copy(this.post)
		if (!Msg.args.length) return Maui.Reply(Msg, base)

		// split at . and - to find subcommands
		let temp = Msg.args.join(".").split("-").join(".").split(".")
		let name = temp.shift().toLowerCase(), sub = temp.join(".")

		let Command = Maui.getCommand(Msg, name)
		if (Command && sub) {
			Command = Maui.getCommand(Msg, `${ Command.name }-${ sub }`)
		}

		return Command ? Maui.cmdHelp(Msg, Command) : false
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name)
		await Maui.testCommand(Msg, this.name, 'help')
		Maui.Reply(Msg, `Expected: General Help, Command Help`)
		return true
	}

}
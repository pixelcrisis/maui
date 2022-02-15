module.exports = {
	name: 'help',
	also: [ 'invite', 'support' ],
	gate: 1,

	help: {
		head: "m!help (command)",
		desc: [
			"Without **(command)**, returns general help.",
			"Optionally pass a **(command)** to view the help block for that command.",
			"{{ m!help }}{{ m!help help }}"
		]
	},

	post: {
		head: "{hey}, I'm **Maui!**",
		desc: [
			"I track timezones so you know what time it is for other members!",
			"I also handle posting embeds (bulletins!) ",
			"",
			"`m!time` - displays the times in the server.",
			"`m!commands` - shows available commands.",
			"`m!help command` - will show help for *command*.",
			"",
			"{website} - {discord} - {invite} - Maui {ver}"
		]
	},

	lang: {
		none: "{nay}, `{opts}` doesn't look like a command to me."
	},

	fire: async function (Maui, Msg) {
		Msg.help = true
		if (!Msg.args.length) return Maui.Reply(Msg, this.post)

		let Command = Maui.getCommand(Msg, Msg.args[0].toLowerCase())
		if (!Command) return Maui.Reply(Msg, this.lang.none)
		else return Maui.getHelp(Msg, Command)
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name
		await Maui.runTest(Msg, '', 'General Help')
		await Maui.runTest(Msg, 'help', "Help's Help")
		return true
	}
}
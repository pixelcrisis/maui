module.exports = {
	name: "autotime",
	gate: 3,

	help: {
		head: "m!autotime",
		desc: [
			"Toggles autotime on or off.",
			"With autotime enabled, if a message contains a time string, it will automatically send out the time block from `m!time`",
			"{{ m!autotime }}"
		]
	},

	lang: {
		done: "{yay}, set auto time to `{autotime}`"
	},

	fire: async function (Maui, Msg) {
		let autotime = !Msg.config.autotime
		await Maui.configCache(Msg.guild.id, { autotime })
		return Maui.Reply(Msg, this.lang.done, { autotime })
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name)
		await Maui.testCommand(Msg, this.name)
		Maui.Reply(Msg, `Toggle, Toggle`)
		return true
	}
}
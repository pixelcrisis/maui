module.exports = {
	name: "prefix",
	gate: 3,
	args: 1,

	help: {
		head: "m!prefix [prefix]",
		desc: [
			"Change the default prefix to `prefix`",
			"{{ m!prefix > }}{{ m!prefix ^ }}"
		]
	},

	lang: {
		done: "{yay}, set prefix to `{prefix}`"
	},

	fire: async function (Maui, Msg) {
		let prefix = Msg.args[0]
		await Maui.configCache(Msg.guild.id, { prefix })
		return Maui.Reply(Msg, this.lang.done, { prefix })
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name)
		await Maui.testCommand(Msg, this.name, '^')
		await Maui.testCommand(Msg, this.name, 'm2')
		Maui.Reply(Msg, `Fail, ^, m2`)
		return true
	}
}
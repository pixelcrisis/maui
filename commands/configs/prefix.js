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
		Msg.trigger = this.name
		await Maui.runTest(Msg, '', 'Fail')
		await Maui.runTest(Msg, '^', 'Set ^')
		await Maui.runTest(Msg, 'm2', 'Set m2')
		return true
	}
}
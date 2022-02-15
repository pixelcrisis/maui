module.exports = {
	name: "color",
	gate: 3,
	args: 1,

	help: {
		head: "m!color [#color]",
		desc: [
			"Sets embed color to **[color]**",
			"**[color]** should be a 6 digit hex string.",
			"{{ m!color #ff0000 }}{{ m!color #000000 }}"
		]
	},

	lang: {
		fail: "{nay} `{color}` wasn't a valid color. It needs to be all 6 digits of a hex string.",
		done: "{yay}, I've set the response color to `{color}`"
	},

	fire: async function (Maui, Msg) {
		let color = Msg.args[0]
		let check = /^#(?:[0-9a-f]{3}){1,2}$/i.exec(color)
		if (!check) check = /^#(?:[0-9a-f]{3}){1,2}$/i.exec(`#${ color }`)
		if (color.length < 6) check = false
		if (!check) return Maui.Reply(Msg, this.lang.fail, { color })

		color = `0x${ color.split('#').join('').toUpperCase() }`
		await Maui.configCache(Msg.guild.id, { color })
		color = color.split('0x').join('#')
		return Maui.Reply(Msg, this.lang.done, { color })
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name
		let color = Maui.base.color.split('0x').join('')
		await Maui.runTest(Msg, '', 'Help')
		await Maui.runTest(Msg, 'asdfa', 'Fail')
		await Maui.runTest(Msg, 'FFF', 'Fail')
		await Maui.runTest(Msg, color, color)
		return true
	}
}
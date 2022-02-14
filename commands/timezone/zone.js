module.exports = {
	name: "timezone",
	also: [ "zone", "z" ],
	gate: 1,
	args: 1,

	help: {
		head: "m!z [timezone]",
		desc: [
			"Sets your timezone to `timezone`.",
			"Timezone is the nearest *time city* to you. For the US, it's usually *Los Angeles*, *Denver*, *Chicago*, and *New York*.",
			"{{ m!z Syndey }}{{ m!z London }}{{ m!timezone Chicago }}",
			"If you're unsure what to input, you can visit this link and click on yourself on the map: {timezone}"
		]
	},

	lang: {
		none: "{nay}, I couldn't find the timezone `{opts}`",
		done: "{yay}, I've set your timezone to `{zone}`",
		fail: "{hmm}, something went wrong saving your data."
	},

	fire: async function (Maui, Msg) {
		let zone = Maui.getZone(Msg.content)
		if (!zone) return Maui.Reply(Msg, this.lang.none)

		let update = await Maui.$Timezone.set({
			user: Msg.author.id, guild: Msg.guild.id, zone
		})

		if (update) return Maui.Reply(Msg, this.lang.done, { zone })
		else return Maui.Reply(Msg, this.lang.fail)
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name)
		await Maui.testCommand(Msg, this.name, 'Chicago')
		Maui.Reply(Msg, `Fail, Chicago`)
		return true
	}
}
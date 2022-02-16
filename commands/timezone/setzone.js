module.exports = {
	name: "setzone",
	gate: 2,
	args: 2,

	help: {
		head: "m:setzone [@user/userID] [timezone]",
		desc: [
			"Sets user's timezone to `timezone`.",
			"Timezone is the nearest *time city* to you. For the US, it's usually *Los Angeles*, *Denver*, *Chicago*, and *New York*. If you're unsure what to input, you can visit this link and click on yourself on the map: {timezone}",
			"{{ m:setzone @user Chicago }}{{ m:setzone userID Sydney }}"
		]
	},

	lang: {
		no_zone: "{nay}, I couldn't find the timezone `{arg2}`",
		no_user: "{hmm}, I couldn't find the user `{arg1}`",
		finish: "{yay}, I've set {ping} timezone to `{zone}`",
		fail: "{hmm}, something went wrong saving your data."
	},

	fire: async function (Maui, Msg) {
		let arg1 = Msg.args.shift()
		let user = await Maui.getUser(Msg.guild, arg1)
		if (!user) return Maui.Reply(Msg, this.lang.no_user, { arg1 })

		let arg2 = Msg.args.join(' ')
		let zone = Maui.getZone(arg2)
		if (!zone) return Maui.Reply(Msg, this.lang.no_zone, { arg2 })

		let update = await Maui.$Timezone.set({
			user: user.id, guild: Msg.guild.id, zone
		})

		let ping = `<@${ user.id }>`
		if (update) return Maui.Reply(Msg, this.lang.finish, { ping, zone })
		else return Maui.Reply(Msg, this.lang.fail)
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name, 'Nobody')
		await Maui.testCommand(Msg, this.name, 'Nobody chicago')
		await Maui.testCommand(Msg, this.name, `${ Maui.user.id} chicago`)
		Maui.Reply(Msg, `Help, Fail, Chicago`)
		return true
	}
}
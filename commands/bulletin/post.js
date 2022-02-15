module.exports = {
	name: "post",
	also: [ "p", "embed", "bulletin" ],
	gate: 2,
	args: 1,

	help: {
		head: "m!post [embed]",
		desc: [
			"Post a discord **[embed]** into the current channel.",
			"You can use {embedgen} to help quickly make your own!",
			`{{ m!post { "title": "Hello World!" } }}`
		]
	},

	lang: {
		fail: "{nay}, that embed didn't parse properly!"
	},

	fire: async function (Maui, Msg) {
		let post = Maui.getEmbed(Msg.content)
		if (!post) return Maui.Reply(Msg, this.lang.fail)

		let send = { embeds: [ post ], content: post.content}
		let sent = await Msg.channel.send(send)
		await Maui.cleanMessage(Msg)
		return sent
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name

		let str1 = `{ "title": "Hello!" }`
		let str2 = `{ "title": "Hello!", "content": "Content!" }`
		let str3 = `{ thing: "Hello }`
		await Maui.runTest(Msg, str1, "Hello!")
		await Maui.runTest(Msg, str2, "Hello! Content!")
		await Maui.runTest(Msg, str3, "Fail: Embed")
		return true
	}
}
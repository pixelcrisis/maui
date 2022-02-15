module.exports = {
	name: "edit",
	also: [ "e" ],
	gate: 2,
	args: 2,

	help: {
		head: "m!edit [messageID] [content]",
		desc: [
			"Change a bulletin with **[messageID]** to **[content]**",
			"You can use an {embedgen} to help quickly make your own.",
			"You can get message IDs by enabling {developer}.",
			`{{ m!edit 606874363089649684 { "title": "Hello World!" } }}`
		]
	},

	lang: {
		valid: "{nay}, `{id}` is not a valid message ID.",
		found: "{nay}, I couldn't find message with ID `{id}`.",
		embed: "{nay}, I had some trouble parsing that embed.",
		edits: "{nay}, I can only edit my own messages."
	},

	fire: async function (Maui, Msg) {
		let [ id, content ] = Maui._keyVal(Msg.args)
		if (id.length != 18) return Maui.Reply(Msg, this.lang.valid, { id })

		let post = Maui.getEmbed(content)
		if (!post) return Maui.Reply(Msg, this.lang.embed)

		let find = await Msg.channel.messages.fetch(id)
		if (!find) return Maui.Reply(Msg, this.lang.found, { id })

		let self = find.author.id == Maui.user.id
		if (!self) return Maui.Reply(Msg, this.lang.edits)
		
		let edit = { embeds: [ post ], content: post.content }
		await find.edit(edit)
		await Maui.cleanMessage(Msg)
		return true
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name
		let sent = await Msg.channel.send('the test message')

		let str1 = `${ sent.id } { "title": "Hi!" }`
		let str2 = `2345 { "title": "Hi!" }`
		let str3 = `${ sent.id } { "title": "Hi!", "content": "oh?" }`
		let str4 = `${ sent.id } { thing: hello }`
		await Maui.runTest(Msg, str1, `Hi!`)
		await Maui.runTest(Msg, str2, `Fail: Found`)
		await Maui.runTest(Msg, str3, `oh? Hi!`)
		await Maui.runTest(Msg, str4, `Fail: Embed`)

		return true
	}
}
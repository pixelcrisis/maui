module.exports = {
	name: "roles",
	gate: 2,

	help: {
		head: "m:roles",
		desc: "Returns a list of Role IDs in the server."
	},

	post: {
		head: "{guild} Roles",
		desc: []
	},

	fire: async function (Maui, Msg) {
		let post = Maui.$copy(this.post)
		await Msg.guild.roles.cache.each(role => {
			let mention = Maui.mention(role, 'role')
			post.desc.push(`\`${ role.id }\` ${ mention }`)
		})
		return Maui.Reply(Msg, post)
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name
		await Maui.runTest(Msg, '', 'Role List')
		return true
	}
}
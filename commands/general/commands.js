module.exports = {
	name: 'commands',
	also: [ 'cmd', 'cmds', 'command' ],
	gate: 1,

	help: {
		head: "m:commands",
		desc: "Lists the commands you have access to."
	},

	post: {
		head: "Maui Commands ({perm})",
		desc: "Below is a list of all the commands you have access to.",
		grid: []
	},

	lang: {
		prefix: "**Prefix** for {guild}: `m:`",
		footer: "Use `m:help command` for more info."
	},

	fire: async function (Maui, Msg) {
		let sort = {}
		let post = Maui.$copy(this.post)
		let list = Maui._arrSort(Maui.allCommand(Msg))

		for (let cmd of list) {
			sort[cmd.section] = sort[cmd.section] || ''
			sort[cmd.section] += `${ cmd.name }\n`
		}
		for (let name in sort) {
			post.grid.push({ name, text: sort[name], col: 1 })
		}

		let text = `${ this.lang.prefix }\n${ this.lang.footer }`
		post.grid.push({ text })
		return Maui.Reply(Msg, post, { perm: Msg.access.name })
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name 

		Msg.access = Maui.$badges[1]
		await Maui.runTest(Msg, '', 'User Commands')

		Msg.access = Maui.$badges[2]
		await Maui.runTest(Msg, '', 'Mod Commands')

		Msg.access = Maui.$badges[3]
		await Maui.runTest(Msg, '', 'Admin Commands')

		Msg.access = Maui.$badges[4]
		await Maui.runTest(Msg, '', 'Owner Commands')

		Msg.access = Maui.$badges[5]
		await Maui.runTest(Msg, '', 'Author Commands')
		
		return true
	}
}
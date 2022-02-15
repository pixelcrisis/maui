// Command Processing

module.exports = Maui => {

	Maui.hasCommand = function (name) {
		let alias = Maui.cmdLink[name]
		return Maui.cmdList[alias || name]
	}

	Maui.allCommand = function (Msg) {
		let list = []
		for (let name in this.cmdList) {
			let Command = this.cmdList[name]
			let section = this.$badges[Command.gate].name
			let visible = Command.gate <= Msg.access.level && !Command.hide
			if (visible) list.push({ ...Command, section })
		}
		return list
	}

	Maui.getCommand = function (Msg, name) {
		let trigger = name || Msg.trigger.split('.')[0]
		let Command = this.hasCommand(trigger)
		if (!Command) return false

		// Check For SubCommands
		let subCommand = this.subCommand(Msg, Command)
		if (subCommand) Command = subCommand

		// Check For Permissions
		let allowed = this.cmdAccess(Msg, Command)
		return allowed ? Command : false
	}

	Maui.subCommand = function (Msg, Command) {
		let data = Msg.trigger.split('.')
		let flag = data.length > 1 ? data[1] : false
		if (!flag && !Msg.args.length) return false

		let name = flag || [ ...Msg.args ].shift().toLowerCase()
		let subC = this.hasCommand(`${ Command.name }-${ name }`)
		if (subC && !flag) Msg.args.shift()
		return subC
	}

	Maui.logCommand = function (Msg, error) {
		let name = Msg.trigger
		let text = error || Msg.content
		let type = Msg.tests ? 'test' : 'user'
		let auth = Msg.guild ? Msg.guild.name : 'DM'
		this.Log(`<${ auth }> ${ name } ${ text }`, type)
	}

	Maui.getHelp = function (Msg, Command) {
		let reqs = Command.args || Command.tags
		let list = Command.also ? Command.also.join("**, **m!") : false
		
		let post = this.$copy(Command.help)
		if (!Array.isArray(post.desc)) post.desc = [ post.desc ]

		if (list) {
			let also = `\nAlso Works: **m!${ list }**`
			post.desc.push(also)
		}

		if (reqs) {
			let rule = []
			if (!list) post.desc.push('') // spacer
			let tags = `Required Tags: **${ Command.tags || 0 }**`
			let args = `Required Args: **${ Command.args || 0 }**`
			if (Command.args) rule.push(args)
			if (Command.tags) rule.push(tags)
			post.desc.push(rule.join(' '))
		}

		return this.Reply(Msg, post)
	}

}
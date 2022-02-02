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
			let allowed = Command.gate <= Msg.access.level
			let section = this.$badges[Command.gate].name
			if (allowed) list.push({ ...Command, section })
		}
		return list
	}

	Maui.getCommand = function (Msg) {
		let trigger = Msg.trigger.split('.')[0]
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
		let subC = this.findCommand(`${ Command.name }-${ name }`)
		if (subC && !flag) Msg.args.shift()
		return subC
	}

	Maui.logCommand = function (Msg, error) {
		let where = Msg.guild ? Msg.guild.name : 'DM'
		this.Log(`<${ where }> ${ Msg.trigger } ${ error || Msg.content }`)
	}

	Maui.cmdHelp = function (Msg, Command) {
		let help = { ...Command.help }
		let gate = Msg.access.level

		if (help.user && gate > 0) help = { ...help.user }
		if (help.mods && gate > 1) help = { ...help.mods }
		if (help.conf && gate > 2) help = { ...help.conf }

		if (Command.also) {
			let alias = "`m!" + [ ...Command.also ].join("`, `m!") + "`"
			help.grid = [{ text: `*Also Works:* ${ alias }` }]
		}

		return this.replyDM(Msg, post)
	}

}
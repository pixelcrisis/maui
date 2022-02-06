// Runnings Tests!

module.exports = Maui => {

	Maui.testCommand = async function (Msg, name, text = '') {
		Msg.trigger = name
		Msg.content = text
		Msg.tags = text.split('-').map(s => s.trim())
		Msg.args = Msg.tags.shift().split(' ').filter(Boolean)

		let Command = await this.getCommand(Msg)
		if (!Command) return this.Reply(Msg, `Couldn't find ${ name }`)
		else this.Reply(Msg, `{{ Firing: ${ name } ${ text } }}`)
		return Command.fire(this, Msg)
	}

}
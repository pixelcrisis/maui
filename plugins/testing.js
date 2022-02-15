// Runnings Tests!

module.exports = Maui => {

	Maui.runTest = async function (Msg, text, pass) {
		Msg.content = text
		Msg.tags = text.split('-').map(s => s.trim())
		Msg.args = Msg.tags.shift().split(' ').filter(Boolean)

		let Command = await this.getCommand(Msg)
		if (Command) await Command.fire(this, Msg)

		if (pass) return this.Reply(Msg, pass)
		else return true
	}

}
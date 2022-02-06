// The Complicated Messaging System

module.exports = Maui => {

	Maui.response = function (Msg, data, values) {
		if (!this.canReply(Msg)) {
			this.logCommand(Msg, `Missing Reply Permissions`)
			return false
		}
		if (typeof data === "string") data = { desc: data }
		return this.Post(Msg, data, values)
	}

	Maui.Reply = async function (Msg, data, values) {
		let sent, response = this.response(Msg, data, values)
		if (response) for (var i = 0; i < response.length; i++) {
			sent = await Msg.channel.send(response[i])
		}
		return sent
	}

	Maui.replyDM = async function (Msg, data, values) {
		Msg.react('☑️')
		let err = () => this.Log(`DM: Couldn't Send Message`)
		let sent, response = this.response(Msg, data, values)
		if (response) for (var i = 0; i < response.length; i++) {
			sent = await Msg.author.send(response[i]).catch(err)
		}
		return sent
	}

	Maui.replyFlash = async function (Msg, data, values, length = 5) {
		let flashed = await this.Reply(Msg, data, values)
		if (!Msg.guild || Msg.tests) return
		await this.wait(length * 1000)
		if (flashed) return flashed.delete()
	}

	Maui.replyClean = async function (Msg, data, values, length = 5) {
		if (!Msg.guild || Msg.tests) return this.Reply(Msg, data, values)
		await this.cleanMessage(Msg)
		return this.replyFlash(Msg, data, values, length)
	}

}
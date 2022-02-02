// Moderation Features

module.exports = Maui => {

	Maui.cleanMessage = async function (Msg) {
		let perms = this.canManageMessages(Msg) && !Msg.tests
		if (perms) await Msg.delete()
		return perms
	}

}
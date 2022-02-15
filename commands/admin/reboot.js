module.exports = {
	name: "reboot",
	also: [ "update" ],
	gate: 5,

	help: {
		head: "m!reboot",
		desc: "Updates and reboots the bot."
	},

	fire: async function (Maui, Msg) {
		Maui.exec('git pull', async (err, good) => {
			if (err || !good) return Maui.Reply(Msg, 'Error Updating')

			if (typeof good !== 'string') good = Maui.look(good)
			await Maui.Reply(Msg, `{{ ${ good } }}`)
			await Maui.Reply(Msg, `{{ Rebooting... }}`)
			return Maui.exec('pm2 restart 0')
		})
	}
}
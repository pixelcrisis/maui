module.exports = {
	name: "logs",
	gate: 5,

	help: {
		head: "m:logs",
		desc: "Prints most recent logs."
	},

	fire: async function (Maui, Msg) {
		let logs = await Maui.Logs()
		return Maui.Reply(Msg, `{{ ${ logs } }}`)
	}
}
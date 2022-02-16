module.exports = {
	name: 'test',
	hide: true,
	args: 1,
	gate: 5,

	help: {
		head: "m:test",
		desc: "Runs a test."
	},

	lang: {
		start: "Starting {total} test(s).",
		test: "Ran test {tested}/{total}.",
		finish: "Finished {total} test(s)."
	},

	fire: async function (Maui, Msg) {
		Msg.tests = true
		Msg.color = '0xFF0000'

		if (Msg.content == "all") {
			Msg.args = Object.keys(Maui.cmdList)
		}

		let total = Msg.args.length
		let tested = 0

		Maui.Reply(Msg, this.lang.start, { total })

		for (let name of Msg.args) {
			tested += 1
			let Command = Maui.hasCommand(name)
			if (Command && Command.test) await Command.test(Maui, Msg)
			Maui.Reply(Msg, this.lang.test, { total, tested })
		}

		Maui.Reply(Msg, this.lang.finish, { total })
	}
}
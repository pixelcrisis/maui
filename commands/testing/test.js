module.exports = {
	name: 'test',
	hide: true,
	args: 1,
	gate: 5,

	help: {
		head: "m!test",
		desc: "Runs a test."
	},

	lang: {
		run: "Starting {total} test(s).",
		ran: "Ran test {tested}/{total}.",
		end: "Finished {total} test(s).",
		err: "Couldn't find test for {name}"
	},

	fire: async function (Maui, Msg) {
		Msg.tests = true
		Msg.color = '0xFF0000'

		let total = Msg.args.length
		let tested = 0

		Maui.Reply(Msg, this.lang.run, { total })

		for (let name of Msg.args) {
			tested += 1

			let test = Maui.hasCommand(`test-${name}`)
			if (test) await test.fire(Maui, Msg)

			else {
				let Command = Maui.hasCommand(name)
				if (Command && Command.test) await Command.test(Maui, Msg)
				else Maui.Reply(Msg, this.lang.err, { name })
			}

			Maui.Reply(Msg, this.lang.ran, { total, tested })
		}

		Maui.Reply(Msg, this.lang.end, { total })
	}

}
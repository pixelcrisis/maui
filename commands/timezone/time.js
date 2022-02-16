module.exports = {
	name: "time",
	also: [ "times", "t" ],
	gate: 1,

	help: {
		head: "m:time (time/user)",
		desc: [
			"Displays the current time in the server.",
			"You can pass a `time` to see future times.",
			"Additionally pass a `user` to see their zone.",
			"{{ m:time }}{{ m:t 9pm }}{{ m:t user }}"
		]
	},

	lang: {
		curr: "Current Time in {guild}",
		when: "Time @ {opts} in {name}",
		none: "{hmm}, {guild} doesn't have any timezones yet! Set yours with `m:zone`",
		zone: "{nay}, you don't have a timezone set! Set one with `m:zone`"
	},

	fire: async function (Maui, Msg) {
		let list = await Maui.$Timezone.all(Msg.guild.id)
		if (!list || !list.length) {
			return Msg.auto ? false : Maui.Reply(Msg, this.lang.none)
		}

		let self = list.filter(m => m.user == Msg.author.id)[0]
		if (!self) {
			return Msg.auto ? false : Maui.Reply(Msg, this.lang.zone)
		}

		let time = false, data = {}
		let name = self.zone.split('/')[1].split('_').join(' ')
		let User = Msg.author, guild = Msg.guild.id

		if (Msg.content) {
			time = Maui.checkTime(Msg.content, self.zone)
			User = await Maui.getUser(Msg.guild, Msg.content)
		}

		let post = { head: this.lang[time ? 'when' : 'curr'], desc: [] }

		for (let item of list) {
			let when = Maui.timeIn(item.zone, time)
			let curr = data[item.zone] || { ...when, ping: 0, count: 0 }
			if (User && User.id == item.user) curr.ping = User.id
			curr.count += 1
			data[item.zone] = curr
		}

		let sort = Maui._arrSort(Object.values(data), '_offset')

		for (let z of sort) {
			let str = `**${ z.time }** - ${ z.name } (${ z.count })`
			if (z.ping) str += ` <@${ z.ping }>`
			post.desc.push(str)
		}

		return Maui.Reply(Msg, post, { name })
	},

	test: async function (Maui, Msg) {
		await Maui.testCommand(Msg, this.name)
		await Maui.testCommand(Msg, this.name, '9pm')
		await Maui.testCommand(Msg, this.name, Maui.user.id)
		Maui.Reply(Msg, `Expected Time, Time @ 9pm, Time For Bot`)
		return true
	}
}
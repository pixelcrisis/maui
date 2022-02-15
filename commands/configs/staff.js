module.exports = {
	name: "staff",
	gate: 3,

	help: {
		head: "m!staff (@role / roleID)",
		desc: [
			"Pass a **(role)** to toggle access to staff commands.",
			"Without a **(role)**, returns a list of roles with staff access.",
			"You can use the **m!roles** command to get all the role IDs in your server.",
			"Roles named *Staff* and *Mod* are automatically given staff access.",
			"{{ m!staff }}{{ m!staff @Mediator }}{{ m!staff 802938998284222484 }}"
		]
	},

	post: {
		head: "{guild} Staff Roles",
		foot: "m2help staff",
		desc: ""
	},

	lang: {
		none: "{hmm}, there aren't any staff roles yet!",
		role: "{nay}, `{opts}` doesn't appear to be a role.",
		add: "{yay}, I've added {mention} as a staff role!",
		rem: "{yay}, I've removed {mention} as a staff role."
	},

	fire: async function (Maui, Msg) {
		let basic = Maui.basicMod(Msg)
		let staff = Msg.config.staff
		if (basic) staff.push(basic)

		if (!Msg.args.length) { // Show List Of Staff Roles
			let post = Maui.$copy(this.post)

			await Msg.guild.roles.cache.each(role => {
				let mention = Maui.mention(role, 'role')
				if (staff.includes(role.id)) post.desc += `${ mention } `
			})
			if (!post.desc.length) post.desc += this.lang.none
			return Maui.Reply(Msg, post)
		}
		
		else { // Toggle Staff Role In List
			let role = await Maui.getRole(Msg.guild, Msg.args[0])
			if (!role) return Maui.Reply(Msg, this.lang.role)

			let has = staff.indexOf(role.id)
			if (has < 0) staff.push(role.id)
			else staff.splice(has, 1)


			let mention = Maui.mention(role, 'role')
			let respond = has < 0 ? this.lang.add : this.lang.rem
			await Maui.configCache(Msg.guild.id, { staff })
			return Maui.Reply(Msg, respond, { mention })
		}
	},

	test: async function (Maui, Msg) {
		Msg.trigger = this.name
		await Maui.runTest(Msg, '', 'Staff List')
		await Maui.runTest(Msg, '877772748569587763', 'Add Crisis')
		await Maui.runTest(Msg, '', 'List + Crisis')
		await Maui.runTest(Msg, '877772748569587763', 'Remove Crisis')
		await Maui.runTest(Msg, '', 'List No Crisis')
		return true
	}
}
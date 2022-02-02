// Handling User Permissions

module.exports = Maui => {

	Maui.$badges = {
		1: { level: 1, name: "User" },
		2: { level: 2, name: "Mod" },
		3: { level: 3, name: "Admin" },
		4: { level: 4, name: "Owner" },
		5: { level: 5, name: "Author" }
	}

	// Check User For Bot Permissions
	Maui.getAccess = async function (Msg) {
		let badge = this.$badges[1]
		if (this.isMod(Msg)) badge = this.$badges[2]
		if (Msg.member.hasPermission('ADMINISTRATOR')) badge = this.$badges[3]
		if (Msg.member.id == Msg.guild.ownerID) badge = this.$badges[4]
		if (this.auth.authors.includes(Msg.member.id)) badge = this.$badges[5]
		return badge
	}

	// Check If User Has Given Role
	Maui.checkRole = function (User, list) {
		let value = false
		let roles = this.$list(list)
		let check = User._roles.includes
		for (let role of roles) if (check(role)) value = true
		return value
	}

	Maui.isMod = function (Msg, User) {
		// Find Defined Mods
		let check = User._roles.includes
		let staff = this.$list(Msg.config.staff)
		for (let id of staff) if (check(id)) return true
		// Find Generic Mods
		let basic = [ "mod", "mods", "moderator", "moderators", "staff" ]
		let named = role => basic.includes(role.name.toLowerCase())
		let found = Msg.guild.roles.cache.find(named)
		if (found && found.id) return check(found.id)
		else return false
	}

	Maui.cmdAccess = function (Msg, Command) {
		if (!Msg || !Command) return false

		let eAuth = `Sorry, That Command Doesn't Work In DMs.`
		let eGate = `[ Gate: ${ Msg.access.level }/${ Command.gate } ]`
		let eTags = `[ Tags: ${ Msg.tags.length }/${ Command.tags } ]`
		let eArgs = `[ Args: ${ Msg.args.length }/${ Command.args } ]`
		let error = false

		if (!Command.hide && !Msg.guild) 						error = eAuth
		if ((Command.tags || 0) > Msg.tags.length) 	error = eTags
		if ((Command.args || 0) > Msg.args.length) 	error = eArgs
		if (Command.gate > Msg.access.level) 				error = eGate

		if ([ eTags, eArgs ].includes(error)) this.cmdHelp(Msg, Command)
		if (error == eAuth) this.replyDM(Msg, error)
		this.logCommand(Msg, error)
		return !error
	}

}
// User-Specific Info

module.exports = (Self, Types) => {

	let Members = {
		table: Self.DB.define('members', {
			user: 		{ type: Types.STRING, unique: true },
			timezone: { type: Types.TEXT, defaultValue: '[]' },
			birthday: { type: Types.TEXT, defaultValue: '[]' },
			reacted: 	{ type: Types.TEXT, defaultValue: '[]' },
			starred: 	{ type: Types.TEXT, defaultValue: '[]' }
		})
	}

	Members.all = async function (guild, type) {
		let query = { where: { [type]: Self.$holds(guild) } }
		let found = await this.table.findAll(query)
		return Self.$send(found)
	}

	Members.get = async function (user) {
		let query = { where: { user } }
		let found = await this.table.findOne(query)
		return found ? Self.$send(found) : await this.new(user)
	}

	Members.new = async function (user) {
		let fresh = await this.table.create({ user })
		Self.$log(`Created Member: ${user}`, fresh)
		return Self.$send(fresh)
	}

	Members.set = async function (user, data) {
		let query = { where: { user } }
		let found = await this.table.findOne(query)
		if (!found) found = await this.new(user)
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Memeber: ${user}`, data, !saved)
		return Self.$send(saved ? data : false)
	}

	Self.$Members = Members

}
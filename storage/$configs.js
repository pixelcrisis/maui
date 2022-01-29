// Server-Based Settings

module.exports = (Self, Types) => {

	let base = Self.base
	let Configs = {
		table: Self.DB.define('configs', {
			guild: 	{ type: Types.STRING, unique: true },
			prefix: { type: Types.STRING, defaultValue: base.prefix },
			staff: 	{ type: Types.TEXT, 	defaultValue: '[]' },

			board: 	{ type: Types.STRING },
			emoji: 	{ type: Types.STRING, defaultValue: base.starboard.emoji },
			count: 	{ type: Types.STRING, defaultValue: base.starboard.count },

			birthday: { type: Types.STRING },
			today: 		{ type: Types.TEXT, defaultValue: base.birthdays.today },
			nextweek: { type: Types.TEXT, defaultValue: base.birthdays.nextweek }
		})
	}

	Configs.get = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findOne(query)
		return found ? Self.$send(found) : await this.new(guild)
	}

	Configs.new = async function (guild) {
		let fresh = await this.table.create({ guild })
		Self.$log(`Created Configs: ${guild}`, fresh)
		return Self.$send(fresh)
	}

	Configs.set = async function (guild, data) {
		let query = { where: { guild } }
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Configs: ${guild}`, data, !saved)
		return Self.$send(saved ? data : false)
	}

	Self.$Configs = Configs

}
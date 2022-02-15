// Server Settings

module.exports = (Self, Types) => {

	let Configs = {
		table: Self.DB.define('configs', {
			guild: 	{ type: Types.STRING, unique: true },
			prefix: { type: Types.STRING, defaultValue: Self.base.prefix },
			staff: 	{ type: Types.TEXT, 	defaultValue: '[]' },
			color: 	{ type: Types.STRING, defaultValue: '' },

			autotime: { type: Types.BOOLEAN, defaultValue: false },

			s_board: 	{ type: Types.STRING, defaultValue: '' },
			s_emoji: 	{ type: Types.STRING, defaultValue: Self.base.starboard.emoji },
			s_count: 	{ type: Types.STRING, defaultValue: Self.base.starboard.count },

			bd_today: { type: Types.TEXT, defaultValue: Self._ENG.birthdays.today },
			bd_week:  { type: Types.TEXT, defaultValue: Self._ENG.birthdays.nextweek }
		})
	}

	let Unpack = Self.$unpack

	Configs.get = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findOne(query)
		if (found) return Unpack(found)
			
		let saved = await this.table.create({ guild })
		Self.$log(`Created Configs: ${ guild }`, saved)
		return Unpack(saved)
	}

	Configs.set = async function (guild, data) {
		let query = { where: { guild } }
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Configs: ${guild}`, data, !saved)
		return Unpack(saved ? data : false)
	}

	Self.$Configs = Configs

}
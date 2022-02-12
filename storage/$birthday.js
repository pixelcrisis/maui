// Birthday Entries

module.exports = (Self, Types) => {

	let Birthday = {
		table: Self.DB.define('birthdays', {
			user:  { type: Types.STRING },
			guild: { type: Types.STRING },
			date:  { type: Types.STRING }
		})
	}

	let Unpack = Self.$unpack

	Birthday.all = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findAll(query)
		return Unpack(found)
	}

	Birthday.get = async function (user, guild) {
		let query = { where: { user, guild } }
		let found = await this.table.findOne(query)
		return Unpack(found)
	}

	Birthday.set = async function (data) {
		let { user, guild } = data
		let query = { where: { user, guild } }
		let found = await this.get(user, guild)

		if (found) {
			let saved = await this.table.update(data, query)
			Self.$log(`Updated Birthday: ${ guild }`, data, !saved)
			return Unpack(saved ? data : false)
		} else {
			let saved = await this.table.create(data)
			Self.$log(`Created Birthday: ${ guild }`, saved)
			return Unpack(saved)
		}
	}

	Self.$Birthday = Birthday

}
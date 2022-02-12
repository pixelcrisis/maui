// Starboard Entries

module.exports = (Self, Types) => {

	let Starred = {
		table: Self.DB.define('starred', {
			user:  { type: Types.STRING },
			guild: { type: Types.STRING },
			where: { type: Types.STRING },
			entry: { type: Types.STRING },
			count: { type: Types.INTEGER, defaultValue: 0 }
		})
	}

	Starred.get = async function (guild, where) {
		let query = { where: { guild, where } }
		let found = await this.table.findOne(query)
		return Self.$unpack(found)
	}

	Starred.new = async function (data) {
		let fresh = await this.table.create(data)
		Self.$log(`Created Starred: ${ data.guild }`, fresh)
		return Self.$unpack(fresh)
	}

	Starred.set = async function (data) {
		let query = { where: { id: data.id } }
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Starred ${ data.guild }`, data, !saved)
		return Self.$unpack(saved ? data : false)
	}

	Self.$Starred = Starred

}
// Server Info Cache

module.exports = (Self, Types) => {

	let Servers = {
		table: Self.DB.define('servers', {
			guild: { type: Types.STRING, unique: true },
			roles: { type: Types.TEXT, 	defaultValue: '[]' },
			emoji: { type: Types.TEXT, 	defaultValue: '[]' },
			chans: { type: Types.TEXT, 	defaultValue: '[]' }
		})
	}

	let Unpack = Self.$unpack

	Servers.get = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findOne(query)
		return Unpack(found)
	}

	Servers.set = async function (guild, data) {
		let query = { where: { guild } }
		let found = await this.get(guild)

		if (found) {
			let saved = await this.table.update(data, query)
			Self.$log(`Updated Server Cache: ${ guild }`, data, !saved)
			return Unpack(saved ? data : false)
		} else {
			let saved = await this.table.create(data)
			Self.$log(`Created Server Cache: ${ guild }`, saved)
			return Unpack(saved)
		}
	}

	Self.$Servers = Servers

}
// Server Info Cache

module.exports = (Self, Types) => {

	let Servers = {
		table: Self.DB.define('servers', {
			guild: 		{ type: Types.STRING, unique: true },
			roles: 		{ type: Types.TEXT, 	defaultValue: '[]' },
			emojis: 	{ type: Types.TEXT, 	defaultValue: '[]' },
			channels: { type: Types.TEXT, 	defaultValue: '[]' }
		})
	}

	Servers.get = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findOne(query)
		return Self.$send(found)
	}

	Servers.new = async function (data) {
		let fresh = await this.table.create(data)
		Self.$log(`Created Server: ${data.guild}`, fresh)
		return Self.$send(fresh)
	}

	Servers.set = async function (guild, data) {
		let query = { where: { guild } }
		let found = await this.table.findOne(query)
		if (!found) return this.new(data)
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Server: ${guild}`, data, !saved)
		return Self.$send(saved ? data : false)
	}

	Self.$Servers = Servers

}
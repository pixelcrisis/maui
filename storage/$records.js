// Maui Bot Records

module.exports = (Self, Types) => {

	let Records = {
		index: { bot: 'maui' },
		table: Self.DB.define('records', {
			bot: { type: Types.STRING, unique: true },
			ran: { type: Types.INTEGER, defaultValue: 0 }
		})
	}

	let Unpack = Self.$unpack

	Records.get = async function () {
		let query = { where: this.index }
		let found = await this.table.findOne(query)
		if (found) return Unpack(found)

		let saved = await this.table.create(this.index)
		Self.$log(`Created Bot Records`, saved)
		return Unpack(saved)
	}

	Records.set = async function (data) {
		let query = { where: this.index }
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Records`, data, !saved)
		return Unpack(saved ? data : false)
	}

	Self.$Records = Records

}
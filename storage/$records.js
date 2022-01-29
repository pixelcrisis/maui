// Maui Bot Records

module.exports = (Self, Types) => {

	let Records = {
		index: { bot: 'maui' },
		table: Self.DB.define('records', {
			bot: { type: Types.STRING, unique: true },
			ran: { type: Types.INTEGER, defaultValue: 0 }
		})
	}

	Records.get = async function () {
		let query = { where: this.index }
		let found = await this.table.findOne(query)
		return found ? Self.$send(found) : this.new()
	}

	Records.new = async function () {
		let fresh = await this.table.create(this.index)
		Self.$log(`Created Records`, fresh)
		return Self.$send(fresh)
	}

	Records.set = async function (data) {
		let query = { where: this.index }
		let saved = await this.table.update(data, query)
		Self.$log(`Updated Records`, data, !saved)
		return Self.$send(saved ? data : false)
	}

	Self.$Records = Records

}
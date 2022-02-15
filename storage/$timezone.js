// Timezone Entries

module.exports = (Self, Types) => {

	let Timezone = {
		table: Self.DB.define('timezones', {
			user:  { type: Types.STRING },
			guild: { type: Types.STRING },
			zone:  { type: Types.STRING }
		})
	}

	let Unpack = Self.$unpack

	Timezone.all = async function (guild) {
		let query = { where: { guild } }
		let found = await this.table.findAll(query)
		return Unpack(found)
	}

	Timezone.get = async function (user, guild) {
		let query = { where: { user, guild } }
		let found = await this.table.findOne(query)
		return Unpack(found)
	}

	Timezone.set = async function (data) {
		let { user, guild } = data
		let query = { where: { user, guild } }
		let found = await this.get(user, guild)

		if (found) {
			let saved = await this.table.update(data, query)
			Self.$log(`Updated Timezone: ${ guild }`, data, !saved)
			return Unpack(saved ? data : false)
		} else {
			let saved = await this.table.create(data)
			Self.$log(`Created Timezone: ${ guild }`, saved)
			return Unpack(saved)
		}
	}

	Timezone.rem = async function (user, guild) {
		let query = { where: { user, guild } }
		let wiped = await this.table.destroy(query)
		Self.$log(`Removed Timezone: ${ guild }`, user, !wiped)
		return Unpack(wiped ? data : false)
	}

	Self.$Timezone = Timezone

}
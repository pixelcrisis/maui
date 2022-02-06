// Storing DB Data to Prevent Calls

module.exports = Maui => {

	Maui.$cache = { config: {} }
	
	Maui.configCache = async function (id, data) {
		let has = this.$cache.config[id]
		if (!has) has = await this.$Configs.get(id)
		if (!data) return has
	
		has = { ...has, ...data }
		this.$Configs.set(id, has)
		return has
	}

}
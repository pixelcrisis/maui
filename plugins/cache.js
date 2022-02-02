// Storing DB Data to Prevent Calls

module.exports = Maui => {

	Maui.$cache = { config: {} }
	
	Maui.configCache = async function (id, data) {
		let curr = this.$cache.config[id]
		if (!curr) {
			let temp = this.$Configs.get(id)
			this.$cache.config[id] = curr = temp
		}
		if (data) {
			this.$cache.config[id] = { ...curr, ...data }
			await this.$Configs.set(id, data)
		}
		return this.$cache.config[id]
	}

}
// Managing The Discord Connection

module.exports = Maui => {

	Maui.serverCount = function () {
		return this.guilds.cache.keyArray().length
	}
	Maui.memberCount = function () {
		const count = (count, guild) => count + guild.memberCount
		return this.guilds.cache.reduce(count, 0)
	}

	Maui.getServer = function (id) {
		return this.guilds.cache.get(id)
	}
	Maui.getMember = function (Guild, id) {
		if (!Guild || !Guild.members) Guild = this.getServer(Guild)
		return Guild.members.cache.get(id)
	}

	Maui.serverInfo = function (Guild) {
		if (!Guild) return false

		let roles = [], channels = [], emojis = []
		let keyed = x => `${ x.id }:${ typed(x) }:${ x.name }`
		let typed = x => x.type || x.animated ? 'animated' : 'null'

		for (let role of Guild.roles.cache) roles.push(keyed(role[1]))
		for (let chan of Guild.channels.cache) channels.push(keyed(chan[1]))
		for (let icon of Guild.emojis.cache) emojis.push(keyed(icon[1]))

		roles = JSON.stringify(roles)
		emojis = JSON.stringify(emojis)
		channels = JSON.stringify(channels)
		return { guild: Guild.id, channels, roles, emojis }
	}

	Maui.getAvatar = function (User) {
		if (!User) return ''
		let base = 'https://cdn.discordapp.com/avatars'
		return `${ base }/${ User.id }/${ User.avatar }.png`
	}

	Maui.linkMessage = function (path) {
		return `https://discordapp.com/channels/${ path }`
	}

	Maui.mention = function (obj, type = 'user') {
		if (!obj || !obj.name) return 'None'
		let text = '`' + obj.name + '`'

		if (type == 'chan') text = `<#${ obj.id }>`
		if (type == 'user') text = `<@${ obj.id }>`
		if (type == 'role') text = `<@&${ obj.id }>`
		return text
	}

	Maui.fullName = function (User) {
		return `${ User.username }#${ User.discriminator }`
	}

	Maui.getUser = async function (Guild, query) {
		let cache = Guild.members.cache
		if (query.indexOf('<') === 0) return await cache.fetch(this._strip(query))
		else return await cache.fetch({ query, limit: 1 })
	}

	Maui.getChannel = async function (Guild, query) {
		let cache = Guild.channels.cache
		let named = (c = {}) => this.matches(query, c.name)
		if (query.indexOf('<') === 0) return await cache.get(this._strip(query))
		else return await cache.find(named)
	}

	Maui.getRole = async function (Guild, query) {
		let cache = Guild.roles.cache
		let getid = r => r.id == this._strip(query)
		let named = r => r.name.toLowerCase() == query.toLowerCase()
		let found = await cache.find(getid)
		return found || await cache.find(named)
	}

	Maui.isEmbed = function (str) {
		try {
			let embed = JSON.parse(str)
			return embed.embed ? embed : { embed }
		} catch(e) { 
			return false 
		}
	}

}
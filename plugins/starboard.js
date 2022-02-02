// Hall o Fame

module.exports = Maui => {

	Maui.getStarboard = async function (React) {
		const guild = React.message.guild.id
		const confs = await this.configCache(guild)

		if (React.self)  React.count -= 1
		const count = React.count >= confs.count
		const emoji = React.name == this.iconName(confs.emoji)
		React.board = React.message.guild.channels.cache.get(confs.board)
		if (!count || !emoji || !React.board) return false

		React.$post = await this.$Starred.get(guild, React.path)
		React.$data = { guild, count: React.count, where: React.path }

		if (!React.$post) return this.addStarboard(React)
		else return this.editStarboard(React)
	}

	Maui.addStarboard = async function (React) {
		let ding = `<@${ React.message.author.id }>`
		let chan = `<#${ React.message.channel.id }>`
		let stat = `**${ React.count }** ${ React.icon}`
		let path = `${ React.$data.guild }/${ React.path }`
		let link = `[View](${ this.linkMessage(path) })`
		let line = `${ stat } - ${ ding } - ${ chan } - ${ link }`
		let User = React.message.author

		let post = {
			icon: User.avatarURL(),
			name: this.fullName(User),
			desc: React.message.content,
			grid: [ { text: line } ],
			image: React.image
		}

		let hall = { channel: React.board }
		let sent = await this.Reply(hall, post)
		React.$data.entry = sent.id
		React.fresh = true

		// Update Database 
		await this.$Starred.new(React.$data)
		await this.starStats(User.id, React)
		this.Log(`Starboard Add: ${ React.$data.guild }`)
	}

	Maui.editStarboard = async function (React) {
		let User = React.message.author
		let curr = React.board.messages.fetch(React.$data.entry)
		if (!curr) return

		// Update Stat Line
		let embed = { ...curr.embeds[0] }
		let stats = embed.fields[0].value.split(' - ')
		stats[0] = `**${ React.count }** ${ React.icon }`
		embed.fields[0].value = stats.join(' - ')
		curr.edit({ embed })

		let update = { ...React.$post, ...React.$star }
		await this.$Starred.set(update)
		await this.starStats(User.id, React)
		this.Log(`Starboard Edit: ${ React.$data.guild }`)
	}

	Maui.starStats = async function (user, React) {
		let member = await this.$Members.get(user)
		let { guild, count } = React.$data

		let starred = this.$list(member.starred)
		let reacted = this.$list(member.reacted)
		let updated = count -= React.$post ? React.$post.count : 0
		let sIndex = starred.findIndex(x => x.guild == guild)
		let rIndex = reacted.findIndex(x => x.guild == guild)

		if (!rIndex) reacted.push({ guild, count })
		else reacted[rIndex].count += updated

		if (React.fresh) {
			if (!sIndex) starred.push({ guild, count: 1 })
			else starred[sIndex].count += 1
		}

		return await this.$Members.set(user, { starred, reacted })
	}

}
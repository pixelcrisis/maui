// Our Custom Embed Manager

module.exports = Maui => {

	Maui.Post = function (Msg, data, values) {
		// Get Plaintext Message, Define Empty Post Object
		let basic = data.text ? this.Parse(Msg, data.text, values) : false
		let embed = { author: {}, fields: [], color: Msg.color || this.base.color }
		// Split Descriptions Are Joined With New Lines
		if (Array.isArray(data.desc)) data.desc = data.desc.join('\n')

		for (let prop in data) {
			let grid = (prop == 'grid')
			let temp = grid ? data[prop] : this.Parse(Msg, data[prop], values)

			if (grid) for (let col of temp) {
				let name = this.Parse(Msg, col.name || "{_}", values)
				let value = this.Parse(Msg, col.text || "{_}", values)
				embed.fields.push({ name, value, inline: !!col.col })
			}

			else if (prop == 'head') embed.title = temp
			else if (prop == 'name') embed.author.name = temp
			else if (prop == 'desc') embed.description = temp
			else if (prop == 'icon') embed.author.icon_url = temp
			else if (prop == 'foot') embed.footer = { text: temp }
			else if (prop == 'image') embed.image = { url: temp }
			else if (prop == 'thumb') embed.thumbnail = { url: temp }

			else embed[prop] = temp
		}

		if (!embed.author.name && !embed.author.icon_url) delete embed.author
		for (let x in embed) if (Object.keys(embed[x]) < 1) delete embed[x]

		let post = basic ? [ basic, { embed } ] : [{ embed }]
		// Make Sure We Split Lengthy Embeds For Discord Limits
		if (JSON.stringify(embed).length < 1995) return [ post ]
		else {
			let posts = []
			let split = embed.description.match(/[\s\S]{1,1800}/g)
			for (let description of split) {
				let copy = { embed: { ...embed, description } }
				// Only Include Basic Message On First
				if (!posts.length && basic) posts.push([ basic, copy ])
				else posts.push([ copy ])
			}
			return posts
		}
	}

}
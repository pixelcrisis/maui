// Parsing Our Strings

module.exports = Maui => {

	Maui.Escape = (str) => str.split('{').join('{/')

	Maui.Parse = function (Msg, data = "", values = {}) {

		const rules = [
			{ from: "{{ ", 	to: "```js\n" },
			{ from: "{{", 	to: "```js\n" },
			{ from: "}} ", 	to: "\n```" },
			{ from: "}}", 	to: "\n```" },
			{ from: " || ", to: "\n" },
			{ from: "||", 	to: "\n" },
			{ from: "{_}", 	to: "\u200b" },
			{ from: "{nl}", to: "\n\u200b" },

			{ from: "{ver}",		to: `v${ this.info.version }` },
			{ from: "{invite}", to: `[Invite Maui](${ this._ENG.links.invite })` },
			{ from: "{website}", to: `[Website](${ this._ENG.links.website })` },
			{ from: "{discord}", to: `[Support Server](${ this._ENG.links.discord })` },
			{ from: "{timezone}", to: `[Timezone Finder](${ this._ENG.links.timezones })` },
			
			{ from: "{hey}",	to: this._rand(this._ENG.hey) },
			{ from: "{hmm}",	to: this._rand(this._ENG.hmm) },
			{ from: "{yay}",	to: this._rand(this._ENG.pos) },
			{ from: "{nay}",	to: this._rand(this._ENG.neg) },

			{ from: "m!", 			to: Msg.prefix || "m!" },
			{ from: "{me}", 		to: `<@${ this.user.id }>` },
			{ from: "{users}", 	to: this.memberCount() },
			{ from: "{guilds}", to: this.serverCount() },

			{ from: "{guild}",	 	to: Msg.guild ? `**${ Msg.guild.name }**` : '' },
			{ from: "{g.id}", 		to: Msg.guild ? Msg.guild.id : '' },
			{ from: "{g.count}", 	to: Msg.guild ? Msg.guild.memberCount : '' },
			{ from: "{g.owner}", 	to: Msg.guild ? `<@${ Msg.guild.ownerID }>` : '' },

			{ from: "{user}", 	to: Msg.author ? `<@${ Msg.author.id }>` : '' },
			{ from: "{u.id}",		to: Msg.author ? Msg.author.id : '' },
			{ from: "{u.name}", to: Msg.author ? Msg.author.username : '' },

			{ from: "{text}", to: Msg.content },
			{ from: "{opts}", to: Msg.args ? Msg.args.join(' ') : '' },
			{ from: "{args}", to: Msg.args ? Msg.args.length : '' }
		]

		for (let rule of rules) {
			data = data.split(rule.from).join(rule.to)
		}

		for (let key in values) {
			data = data.split(`{${ key }}`).join(values[key])
		}

		// Unescape Escaped Strings
		data = data.split("{/").join("{")
		return data
	}

}
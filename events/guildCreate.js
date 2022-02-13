// Added To A Server :)

module.exports = async (Maui, Guild) => {
	let title = `Added to ${ Guild.name }`
  let Owner = await Bot.users.fetch(Guild.ownerID)
	let stats = [
		`Total Users: **${ Guild.memberCount }**`,
		`Server Owner: **${ Owner.username }**`,
		`*Now In **${ Maui.serverCount() }** Servers.*`,
		`*Watching **${ Maui.memberCount() }** Members.*`
	]

	Maui.Note(stats.join('\n'), title)

	let server = Maui.serverInfo(Guild)
	if (server) await Maui.$Servers.set(Guild.id, server)
}
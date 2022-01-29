// Record New Channels

module.exports = async (Maui, Channel) => {
	let server = Maui.serverInfo(Channel.guild)
	if (server) await Maui.$Servers.set(Channel.guild, server)
}
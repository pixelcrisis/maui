// Record New Channels

module.exports = async (Maui, Channel) => {
	let details = Maui.serverInfo(Channel.guild)
	if (details) await Maui.$Servers.set(Channel.guild, details)
}
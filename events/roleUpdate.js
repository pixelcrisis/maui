// Record Updated Roles

module.exports = async (Maui, Role) => {
	let details = Maui.serverInfo(Role.guild)
	if (details) await Maui.$Servers.set(Role.guild.id, details)
}
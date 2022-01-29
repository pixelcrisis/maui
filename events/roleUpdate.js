// Record Updated Roles

module.exports = async (Maui, Role) => {
	let server = Maui.serverInfo(Role.guild)
	if (server) await Maui.$Servers.set(Role.guild, server)
}
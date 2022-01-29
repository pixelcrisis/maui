// Removed From A Server :(

module.exports = async (Maui, Guild) => {

	let title = `Removed From ${ Guild.name }`
	let stats = `*Now In ${ Maui.serverCount() } Servers*`

	Maui.Note(stats, title)
}
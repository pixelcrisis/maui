// Discord.js Error Handling

module.exports = async (Maui, Error) => {
	Maui.Note(Error, `Discord.js Error`, 'warn')
}
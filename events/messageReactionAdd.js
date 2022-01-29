// Handle New Reactions

module.exports = async (Maui, React) => {

	let origin = React.message
	// Attach Our Shorthand Info
	React.name = React._emoji.id || React._emoji.name
	React.icon = React.name.length > 1 ? Maui.emojiTag(React) : React.name
	React.path = `${ origin.channel.id }/${ origin.id }`
	React.self = React.users.cache.get(origin.author.id)

	// Fire Our Reaction Based Checks
	if (origin.guild) Maui.addStarboard(React)
	
}
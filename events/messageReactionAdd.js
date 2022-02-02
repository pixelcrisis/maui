// Handle New Reactions

module.exports = async (Maui, React) => {

	let origin = React.message
	// Attach Our Shorthand Info
	React.name = React._emoji.id || React._emoji.name
	React.icon = React.name.length > 1 ? Maui.emojiTag(React) : React.name
	React.path = `${ origin.channel.id }/${ origin.id }`
	React.self = React.users.cache.get(origin.author.id)

	// Extract An Image
	let embed = origin.embeds[0]
	let thumb = embed && embed.thumbnail ? embed.thumbnail.url : ''
	let added = files.size ? files.entries().next().value[1].url : ''
	let moves = embed && embed.url && embed.url.indexOf('.gif') > 0
	if (moves) moves = `${ embed.url.split('.gif')[0] }.gif`
	React.image = moves || thumb || added

	// Note When Messages Are Empty?
	React.empty = !embed && !files.size && !origin.content

	// Fire Our Reaction Based Checks
	if (origin.guild) Maui.getStarboard(React)
	
}
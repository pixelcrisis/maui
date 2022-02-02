// Processing Discord Emojis

module.exports = Maui => {

	Maui.emojiTag = function (React) {
		let ico = React._emoji
		let pre = ico.animated ? 'a' : ''
		return `<${pre}:${ico.name}:${ico.id}>`
	}

	Maui.iconName = function (str) {
		if (str.length == 1) return str
		return str.split(':')[2]
	}

}
// Require (Load) An Entire Directory

const { promisify } = require('util')
const readDirectory = promisify(require('fs').readdir)

const Loader = module.exports = async (folder, loaded = []) => {
	const files = await readDirectory(folder)
	for (let file of files) {
		let location = `${folder}/${file}`
		let isFolder = file.indexOf('.') < 0
		let isScript = file.indexOf('.js') > 0
		if (isFolder) await Loader(location, loaded)
		else if (isScript) loaded.push({
			name: file.split('.')[0], src: require(`.${location}`)
		})
	}
	return loaded
}
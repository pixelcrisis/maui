// General Query / Database Helpers

module.exports = Self => {

	// Format Our Database Logs
	Self.$log = (text, data, fail) => {
		if (fail) text = `|| ${ text }`
		if (data) text = `${ text } > ${ JSON.stringify(data, 0, 2) }`
		Self.Log(text)
	}

	// General Data Helpers
	Self.$copy = data => JSON.parse(JSON.stringify(data))
	Self.$good = data => data && typeof data !== 'undefined' && data != null

	// Stringified Array Helper
	Self.$list = arr => {
		if (!arr || !arr.indexOf || arr.indexOf('[') !== 0) return arr
		try { let list = JSON.parse(arr)
					return list.indexOf ? list : arr }
		catch (e) { return arr }
	}

	// Pack A Data Object (Arrays)
	Self.$pack = function (data) {
		for (let prop in data) if (Array.isArray(data[prop])) {
			data[prop] = JSON.stringify(data[prop])
		}
		return data
	}

	// Unpack Database Data
	Self.$unpack = function (data, list = []) {
		if (!Array.isArray(data)) return Self.$filter(data)
		else for (let item of data) list.push(Self.$filter(item))
		return list.length ? list : false
	}

	// Turn Data into workable object
	Self.$filter = function (data) {
		if (!Self.$good(data)) return false
		if (data.toJSON) data = data.toJSON()
		if (data.dataValues) data = data.dataValues
		if (data.createdAt) delete data.createdAt
		if (data.updatedAt) delete data.updatedAt
		// Translate Stringified Arrays
		for (let prop in data) data[prop] = Self.$list(data[prop])
		return data
	}
	
}
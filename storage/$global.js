// General Query / Database Helpers
const { Op } = require('sequelize')

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

	// Managing Stringified Arrays
	// Attempt to Parse An Array
	Self.$list = function (arr = []) {
		if (!Array.isArray(arr)) try {
			let list = JSON.parse(arr)
			return list.indexOf ? list : []
		} catch (e) {
			return []
		}
		else return arr
	}
	// Adding, Removing, And Randomizing
	Self.$push = function (arr, val) {
		let list = this.$list(arr)
		let find = list.indexOf(val)
		if (find > -1) return false
		return JSON.stringify([ ...list, val ])
	}
	Self.$pull = function (arr, val) {
		let list = this.$list(arr)
		let find = list.indexOf(val)
		if (find < 0) return false
		list.splice(find, 1)
		return JSON.stringify(list)
	}
	Self.$rand = function (arr) {
		let list = this.$list(arr)
		let rand = Math.floor(Math.random() * list.length)
		return list[rand]
	}

	// Substring Matches, Finds ID in Text Array
	Self.$holds = data => { return { [ Op.substring ]: data } }

	// Translate DB Data into Object
	Self.$send = function (data) {
		if (Array.isArray(data)) {
			let list = []
			for (let item of data) list.push(this.$make(item))
			return list.length ? list : false
		} 
		else return this.$make(data)
	}

	Self.$make = function (data) {
		if (!this.$good(data)) 	return false
		if (data.toJSON) 				data = data.toJSON()
		if (data.dataValues) 		data = data.dataValues
		if (data.updatedAt) 		delete data.updatedAt
		if (data.createdAt) 		delete data.createdAt
		return data
	}

}
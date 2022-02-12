// Global Helpers & Tools

// Toolkits Use Global 'Self' Identifier
module.exports = Self => {

	Self._match = function (a, b) {
		return a && b && a.toLowerCase() == b.toLowerCase()
	}

	Self._holds = function (a, b) {
		if (!a || !b) return false
		return a.toLowerCase().indexOf(b.toLowerCase())
	}

	Self._rand = function (arr) {
		let rand = Math.floor(Math.random() * arr.length)
		return arr[rand]
	}

	Self._keyVal = function (arr) {
		return [ arr.shift().toLowerCase(), arr.join(' ') ]
	}

	Self._arrSort = function (arr, key) {
		const byVal = (a, b) => a > b ? 1 : -1
		const byKey = (a, b) => a[key] > b[key] ? 1 : -1
		return arr.sort(key ? byKey : byVal)
	}

	Self._strip = function (str) {
		if (!str) return ''
		let clip = str.length - 1
		let isID = str.indexOf('<') === 0
		let trim = isID ? 2 : 0

		if (str.indexOf('@&') === 1) trim = 3
		if (str.indexOf('@!') === 1) trim = 3
		if (str.indexOf('<:') === 0) trim = 1

		return isID ? str.substring(trim, clip) : str
	}

}
// We Can Manage Time

const Moment = require('moment')
const TZ = require('moment-timezone').tz

module.exports = Maui => {

	Maui.__clock = /\b([1-9]|1[0-2])(:\d{2})?\s*(a|p|am|pm)\b/i
	Maui.__zones = [ 'africa', 'america', 'asia', 'atlantic', 'austrailia', 'europe', 'indian', 'pacific' ]

	Maui.isTime = str => Maui.__clock.exec(str)
	Maui.nowTime = (...args) => Moment(args)
	Maui.diffTime = (a, b) => Math.ceil(a.diff(b, 'days', true))
	Maui.getDate = (date, format) => Moment(date, format || 'MM/DD/YYYY')

	Maui.timeIn = function (zone, tz) {
		let data = tz ? tz.tz(zone) : TZ(zone)
		let name = zone.split('/')[1].split('_').join(' ')
		let time = data.format('h:mm A')
		return { ...data, name, time }
	}

	Maui.timeCurr = function () {
		let curr = new Date(), next = new Date()
		let hour = parseInt(curr.getHours())
		next.setDate(curr.getDate() + 7)

		curr = curr.toJSON().split('T')[0].split('-').slice(1, 2).join('/')
		next = next.toJSON().split('T')[0].split('-').slice(1, 2).join('/')

		return { curr, next, hour, day: parseInt(curr.split('/')[1]) }
	}

	Maui.getZone = function (str) {
		let name = str.split(' ').join('_').toLowerCase()
		if (name.indexOf('/') > 0) return TZ.zone(name)
		for (let place of this.__zones) {
			let zone = TZ.zone(`${ place }/${ name }`)
			if (zone) return zone
		}
		return false
	}

	Maui.checkTime = function (str, zone) {
		let time = this.isTime(str)
		if (!time) return false

		let date = TZ(zone).format('YYYY-MM-DD')
		let hour = time[1], mins = time[2] || ":00"
		let ampm = time[3].toUpperCase()
		let data = `${ date } ${ hour }${ mins } ${ ampm }`
		return TZ(data, 'YYYY-MM-DD h:mm A', zone)
	}

}
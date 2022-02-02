// Internal Loop / Automated Features

module.exports = Maui => {

	Maui.Loop = function () {
		if (!this.looping) {
			this.Log(`Starting Loop.`)
			const timing = 1000 * 60 * 2 // 2 Minutes
			this.looping = setInterval(this.Loop, timing)
		}

		this.Log(`Running Loop.`)
		this.updateStatus()
	}

	Maui.updateStatus = function () {
		let list = [
			`v${ this.info.version }`,
			`${ this.memberCount() } users`,
			`${ this.serverCount() } servers`
		]

		let type = 'WATCHING'
		let pick = this.$rand(list)
		this.user.setActivity(pick, { type })
	}

}
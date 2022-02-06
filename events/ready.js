// We've Logged In, Let's Start!

module.exports = async Maui => {

	Maui.Log(`Syncing Database...`)
	await Maui.$Sync()
	
	Maui.Log(`Waiting For Discord...`)
	await Maui.wait(1000)

	Maui.Loop()
	Maui.ready = true

	Maui.Note([
		`Total Servers: **${ Maui.serverCount() }**`,
		`Total Users: **${ Maui.memberCount() }**`
	].join(' - '), `Booted **v${ Maui.info.version }**`)
	
}
// We've Logged In, Let's Start!

module.exports = async Maui => {

	Maui.Log(`Syncing Database...`)
	await Maui.$Sync()
	
	Maui.Log(`Waiting For Discord...`)
	await Maui.wait(1000)

	Maui.startPulse()
	Maui.ready = true
	Maui.Note(`Booted - v${ Maui.info.version }`)
	
}
// Message Received!

module.exports = async (Maui, Msg) => {
	// Ignore Bots / Pre-Boot Commands
	if (!Maui.ready || Msg.author.bot) return

	let message = Msg.content
	let guildID = Msg.guild ? Msg.guild.id : false
	let configs = guildID ? await Maui.configCache(guildID) : false

	// Check For Pings
	let ping_A = `<@${ Maui.user.id }>`
	let ping_B = `<@!${ Maui.user.id }>`
	let ping_1 = message.indexOf(ping_A) === 0
	let ping_2 = message.indexOf(ping_B) === 0
	let pinged = ping_1 || ping_2
	// Remove Em If We Got Em
	if (ping_1)  message = message.split(ping_A).join('').trim()
	if (ping_2)  message = message.split(ping_B).join('').trim()

	// Split Trigger From Content
	let content = message.split(' ')
	let trigger = content.shift().toLowerCase()

	// Check For Prefix, Or Not If Not In DMs (no configs)
	let prefixed = false
	let prefix = configs ? configs.prefix : Maui.base.prefix
	if (prefix.length > trigger.length) prefixed = false
	else if (Maui._holds(trigger, prefix) === 0) prefixed = true
	
	// Attach Configs, Get Command Access
	Msg.config = configs
	Msg.access = await Maui.getAccess(Msg)

	// Return If No Prefix Or Mention
	if (!pinged && !prefixed) return Maui.autoTime(Msg)

	// If Prefixed, Removed From Trigger
	if (prefixed) trigger = trigger.split(prefix).join('')

	Msg.trigger = trigger
	Msg.content = content.join(' ')

	// Get Arguments, Tags
	Msg.tags = Msg.content.split('-').map(s => s.trim())
	Msg.args = Msg.tags.shift().split(' ').filter(Boolean)

	// Find A Valid Command
	let Command = await Maui.getCommand(Msg)
	if (Command) return Command.fire(Maui, Msg)
	
}
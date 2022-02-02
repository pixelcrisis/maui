// Handling Discord Permissions

module.exports = Maui => {

	// Default Perm Flag Checker
	Maui.Permissions = function (Msg, flag, Channel) {
		let where = Channel || Msg.channel
		let check = where ? where.guild : false
		if (check) return where.permissionsFor(check.me).has(flag, false)
		else return false
	}

	// Per-Permission Checkers
	Maui.canReply = function (Msg, Channel)	{
		return Maui.Permissions(Msg, 'SEND_MESSAGES', Channel)
	}
	Maui.canManageRoles = function (Msg, Channel)	{
		return Maui.Permissions(Msg, 'MANAGE_ROLES', Channel)
	}
	Maui.canManageChannels = function (Msg, Channel)	{
		return Maui.Permissions(Msg, 'MANAGE_CHANNELS', Channel)
	}
	Maui.canManageMessages = function (Msg, Channel)	{
		return Maui.Permissions(Msg, 'MANAGE_MESSAGES', Channel)
	}

}
// Someone Left A Server

module.exports = async (Maui, Member) => {
	await Maui.$Birthday.rem(Member.id, Member.guild.id)
	await Maui.$Timezone.rem(Member.id, Member.guild.id)
}
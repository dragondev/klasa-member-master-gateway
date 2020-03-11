const { GuildMemberManager } = require('discord.js');

/**
 * Adds our extensions to d.js's MemberStore
 * @extends external:GuildMemberManager
 */
class KlasaGuildMemberStore extends GuildMemberManager {

	async _fetchSingle(...args) {
		const member = await super._fetchSingle(...args);
		await member.settings.sync();
		return member;
	}

	async _fetchMany(...args) {
		const members = await super._fetchMany(...args);
		await Promise.all(members.cache.map(member => member.settings.sync()));
		return members;
	}

}

module.exports = KlasaGuildMemberStore;

module.exports = {
    name: 'unmute',
    description: "unmutes the mentioned member in a guild",
    syntax: '!unmute <user>',
    permissions: ['VIEW_AUDIT_LOG'],
    execute(client, message, args, Discord) {
        if (message.member.permissions.has('MUTE_MEMBERS')) {
            const target = message.mentions.users.first();
            const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
                let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget.roles.cache.has(`${mutedRole.id}`)) {
                    memberTarget.roles.remove(mutedRole.id);

                    const embdMsg = new Discord.MessageEmbed()
                        .setDescription(`${memberTarget}was unmuted.`)
                        .setColor('#00ff00')
                    sLogsChannel.send({ embeds: [embdMsg] })
                    message.channel.send({ embeds: [embdMsg] })
                    console.log("MUTED\n\n\n" + mutedRole)
                } else {
                    message.channel.send("Mentioned user is not muted.")
                }
            }
            else {
                message.channel.send('cant find that member');
            }
        }
        else {
            message.reply('you have no permission');
        }
    }
}
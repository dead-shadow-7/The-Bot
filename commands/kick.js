module.exports = {
    name: 'kick',
    description: "kick command",
    execute(client, message, args, Discord) {
        if (message.member.roles.cache.some(r => r.name === "admin" || message.member.roles.cache.some(r => r.name === "mod"))) {
            const target = message.mentions.users.first();
            if (target) {
                if(args[1]){
                  const memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.kick();

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Kicked:')
                    .setDescription(`<@${memberTarget.user.id}> has been kicked`)
                    .addFields(
                        { name: 'Reason:', value: `${args.slice(1).join(" ")}` }

                    )
                message.channel.send(embedMsg);
                }else{
                  message.channel.send('Provide a good reason.')
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



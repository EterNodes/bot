class commanduba {
    constructor() {
        this.name = "unbanall"
        this.description = "Unban tout les membres."
    }

    async execute(interaction, client) {
                if (interaction.member.hasPermission("ADMINISTRATOR")) {
                    interaction.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {{
                            interaction.reply({ content: "There are no banned members in this guild."})
                        }
                        } else {
                            bans.forEach(ban => {
                                interaction.guild.members.unban(ban.user.id);
                            })
                            const emb = new Discord.MessageEmbed()
	                            .setTitle('Ubanned all')
	                            .setDescription(` All banned users has been Unbanned \n Moderator: <@${interaction.member}> Unbanned All Banned Members. `)
	                            .setColor("GREEN")
                            message.channel.send(emb);
                            
                        }
                    }
                    )
                } else {
                    return await interaction.reply({ content: "You can't user this !", ephemeral: true });
      }
    }
}

module.exports = commanduba
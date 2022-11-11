const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
const config = require("../config");

const statuses = {
    online: ":green_circle: Online",
    offline: ":white_circle: Offline",
    dnd: ":red_circle: Dnd",
    idle: ":yellow_circle: Idle",
  };

class commanduserinfo {
    constructor() {
        this.name = "userinfo"
        this.description = "Montre des infos sur un compte discord."
        this.options = [
            { type: 'USER', name: "account", description: "L'utilisateur.", required: true },
        ]
    }

    async execute(interaction) {
        const account = interaction.options.getUser("account")
        const aid = interaction.guild.members.cache.get(account.id);
        try{
            let rolenames;
            let roles = aid.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
    
                rolenames = roles.join(" ")
                if(aid.roles.cache.size < 1) rolenames = "No Roles";
    
                let status = aid?.presence?.status;
                status = statuses[status] ?? statuses["offline"];
    
    
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('👥ㅤProfile Informationㅤ👥')
                .setDescription(`**Here are ${account.username} Informations** ${interaction.member}`)
                .addFields(
                   { name: '🏷️ㅤNickname ', value: `${account.username}`, inline: false },
                   { name: '🆔ㅤId', value:  `${account.id}`, inline: false },
                   { name: '📆ㅤAccount creation date', value: `${account.createdAt.toLocaleDateString('en-GB')}`, inline: false },
                   { name: '➡️ㅤRoles', value: rolenames},
                   { name: '🌐ㅤStatus', value: `${status}`},
                )
                .setFooter({ text: config.bote })
                .setTimestamp()
    
            interaction.reply({ embeds: [embed] });
    
        } 
        catch (error) {
            const embed2 = new MessageEmbed()
            .setColor('RED')
            .setTitle('UserInfo Fail')
            .setDescription(`Error: **${error.message}**\nYou can't see information of a member that is not in the server !`)
            .setFooter({ text: config.bote })
            .setTimestamp()
            interaction.reply({ embeds: [embed2]})
            console.log(error)
        }
    }
    }



module.exports = commanduserinfo


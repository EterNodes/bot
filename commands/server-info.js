const {MessageEmbed} = require('discord.js')
const config = require('../config.js')
class commandserverinfo {
    constructor() {
        this.name = "server-info"
        this.description = "Gives server informations"
    }

    async execute(interaction, client) {
        let rolemap = interaction.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(", ");
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
        let embed = new MessageEmbed()
            .setColor('#d352ff')
            .setTitle("Informations System")
            .setDescription(`**Voici Les informations du serveur** ${interaction.member}`)
            .addFields(
                { name: "🏷️ㅤServer Name", value: "**" + interaction.guild.name + "**", inline: false },
                { name: '🆔ㅤServer Id', value: `${interaction.guild.id}`},
                { name: '👑ㅤFounder', value: "<@" + interaction.guild.ownerId + ">", inline: false },
                { name: '📊ㅤTotal Members', value: `${interaction.guild.memberCount} members`, inline: false },
                { name: '🗒️ㅤTotal Roles', value: ` ${interaction.guild.roles.cache.size} roles`, inline: false },
                { name: '➡️ㅤRoles List', value: rolemap, inline: false },
                { name: '💜ㅤBoosts', value: `**${interaction.guild.premiumSubscriptionCount}** boost`},
                { name: `💸ㅤBoost Level:`, value: `\`\`\`${formatTier(interaction.guild.premiumTier)}\`\`\``},
                { name: '🧑‍💼ㅤIs a partnered server?', value:  `\`\`\`${interaction.guild.partnered ? 'Yes' : 'No'}\`\`\``},
                { name: `🕵️ㅤIs a verified server?`, value: `\`\`\`${interaction.guild.verified ? 'Yes' : 'No'}\`\`\``},
                { name: '📆ㅤServer Creation Date', value: `${interaction.guild.createdAt.toLocaleDateString()}`, inline: false },
                { name: '🖼️ㅤServer Icon', value: `[View Server Icon here](${interaction.guild.iconURL({ dynamic: true , size: 2048 , format: "png" })})`, inline: false},)
                
            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true , size: 2048 , format: "png" })}`)
            .setFooter({ text: config.bote  })
            .setTimestamp()

        

        function format(str) {
            str = str.replace(/\_/g, " ");
            const split = str.trim().split(" ")
            const splitFixed = [];
            split.forEach((e) => {
                    e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
                    splitFixed.push(e);
            });
            return splitFixed.join(" ");
    }
    
          function formatTier(tier) {
            if (tier == 'NONE') return 'Level 0 (no boosts)'
            else if (tier == 'TIER_1') return 'Level 1'
            else if (tier == 'TIER_2') return 'Level 2'
            else if (tier == 'TIER_3') return 'Level 3'
    }
    interaction.reply({ embeds: [embed] });



    }
    
}

module.exports = commandserverinfo
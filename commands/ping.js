const {MessageEmbed} = require('discord.js')
const config = require('../config')
class commandping {
    constructor() {
        this.name = "ping"
        this.description = "Give the bot's ping."
    }

    async execute(interaction, client ) {  

		const embed = new MessageEmbed()
            .setTitle('⚙️ㅤBot Latencyㅤ⚙️')
            .setDescription(`Here you get the ${interaction.client.user.username} Latency `)
            .addFields(
                { name: "API Latency ", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
                { name: "BotLatency  ", value: `${Math.round(client.ws.ping)}ms`, inline: true }
            )
            .setFooter({ text: config.bote  })
        interaction.reply({ embeds: [embed] });
        

    }
}

module.exports = commandping
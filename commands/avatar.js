const Discord = require("discord.js")
const config = require("../config")

class commandavatar { 
    constructor() {
        this.name = "avatar"
        this.description = "Montre l'avatar d'une personne."
        this.options = [
            { type: 'USER', name: "target", description: "La personne à montre l'avatar.", required: true },

        ]
    }

    async execute(interaction) {
        const member = interaction.options.getUser("target")
        
        const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTimestamp()
            .setTitle(`${member.username}'s avatar`)
            .setDescription(`[View Avatar Here](${member.displayAvatarURL({ dynamic: true, size: 4096 })})`)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFooter({ text: config.bote })
        interaction.reply({ embeds: [embed] }) 
     
    }
}

module.exports = commandavatar
const Discord = require("discord.js")
const config = require("../config");

class commandavatar { 
    constructor() {
        this.name = "setownerticket"
        this.description = "Change l'owner du ticket."
        this.options = [
            { type: 'USER', name: "target", description: "La personne a mettre owner.", required: true },

        ]
    }

    async execute(interaction) {
        if(!interaction.channel.name.startsWith("ticket-")) return interaction.reply({content: ":x: | Il faut utiliser la commande dans un ticket !" })
        const member = interaction.options.getUser("target")
        
        if(!member) return interaction.reply({content: ":x: | Merci de mettre la mention ou l'id de la personne a ajouter au ticket !"})
        await interaction.channel.permissionOverwrites.edit(member, { VIEW_CHANNEL: true, SEND_MESSAGES: true})
        await interaction.channel.permissionOverwrites.edit(interaction.channel.topic, { VIEW_CHANNEL: false, SEND_MESSAGES: false})
        await interaction.channel.setTopic(`${member.id}`)
        await interaction.channel.setName(`ticket-${member.username}`).then(interaction.reply(":white_check_mark: | J'ai bien changé l'owner du ticket a: <@"+member+">"))
     
    }
}

module.exports = commandavatar
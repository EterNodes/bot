const Discord = require("discord.js")
const config = require("../config");

class commandavatar { 
    constructor() {
        this.name = "removeuser"
        this.description = "Retire une personne du ticket."
        this.options = [
            { type: 'USER', name: "target", description: "La personne a retirer.", required: true },

        ]
    }

    async execute(interaction) {
        if(!interaction.channel.name.startsWith("ticket-")) return interaction.reply({content: ":x: | Il faut utiliser la commande dans un ticket !" })
        const member = interaction.options.getUser("target")
        
        if(!member) return interaction.reply({content: ":x: | Merci de mettre la mention ou l'id de la personne a retirer au ticket !"})
        interaction.channel.permissionOverwrites.edit(member, { VIEW_CHANNEL: false, SEND_MESSAGES: false}).then(interaction.reply(":white_check_mark: | J'ai bien retiré <@"+member+"> du ticket !"));
     
    }
}

module.exports = commandavatar
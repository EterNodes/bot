const Discord = require("discord.js")
const config = require("../config");

class commandavatar { 
    constructor() {
        this.name = "adduser"
        this.description = "Ajoute une personne au ticket."
        this.options = [
            { type: 'USER', name: "target", description: "The person to add.", required: true },

        ]
    }

    async execute(interaction) {
        if(!interaction.channel.name.startsWith("ticket-")) return interaction.reply({content: ":x: | Il faut utiliser la commande dans un ticket !" })
        const member = interaction.options.getUser("target")
        
        if(!member) return interaction.reply({content: ":x: | Merci de mettre la mention ou l'id de la personne a ajouter au ticket !"})
        interaction.channel.permissionOverwrites.edit(member, { VIEW_CHANNEL: true, SEND_MESSAGES: true}).then(interaction.reply(":white_check_mark: | J'ai bien ajouté <@"+member+"> au ticket !"));
     
    }
}

module.exports = commandavatar
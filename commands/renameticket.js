const Discord = require("discord.js")
const config = require("../config");

class commandavatar { 
    constructor() {
        this.name = "renameticket"
        this.description = "Change le nom du ticket (il y aura ticket- devant)."
        this.options = [
            { type: 'STRING', name: "msg", description: "Le nom du ticket.", required: true },

        ]
    }

    async execute(interaction) {
        if(!interaction.channel.name.startsWith("ticket-")) return interaction.reply({content: ":x: | Il faut utiliser la commande dans un ticket !" })
        const msg = interaction.options.getString("msg")
        
        interaction.channel.setName(`ticket-${msg}`).then(interaction.reply(":white_check_mark: | J'ai bien renomé le ticket en: `ticket-"+msg+"` !"));
     
    }
}

module.exports = commandavatar
const {MessageEmbed} = require("discord.js")
class commandroles {
    constructor() {
        this.name = "roles"
        this.description = "Montres les roles du serveurs"

    }

    async execute(interaction) {
        let rolemap = interaction.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(", ");
        if (!rolemap) rolemap = "No roles";

        const embed = new MessageEmbed()
            .setTitle("Server Roles")
            .setDescription(rolemap)
            .setColor("#303030")
		interaction.reply({ embeds: [embed] });
        
    }
}

module.exports = commandroles
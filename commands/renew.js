const {MessageEmbed} = require('discord.js');
class commandre {
    constructor() {
        this.name = "renew"
        this.description = "Fait un embed de renew..."
        this.options = [
            { type: 'STRING', name: "date", description: "La date du renew.", required: true }
        ]
    }

    async execute(interaction) {
        const date = interaction.options.getString("date")    

        let embed = new MessageEmbed()
            .setTitle("Renew:")
            .setDescription(`:flag_fr: Pour avoir une meilleure stabilité de nos services, nous avons décidé d’ajouter un système de renouvellement.
Vous devez renouveler vos serveur 1 fois tout les 7 jours (sur le dashboard). Si vous ne renouveler pas votre serveur, il sera suspendu.
Une fois votre serveur suspendu, il peux toujours être renouveler, mais faites attention. Les serveurs suspendu sont supprimé par le staff régulièrement.

:flag_gb: To have a better stability of our services, we decided to add a renewal system.
You must renew your servers once every 7 days (on the dashboard). If you don't renew your server, it will be automatically suspended.
Once your server is suspended, it can still be renewed, but be careful. Suspended servers are removed by the staff regularly.`)
            .setColor("AQUA")
            .addFields([
                { name: "Date of next suspended servers purge:", value: `**${date}**` }
            ])
        
        await interaction.channel.send({embeds: [embed]})

        interaction.reply({ content: "Done !", ephemeral: true})
        
    }
}

module.exports = commandre
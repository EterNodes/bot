const { MessageEmbed } = require('discord.js')
class commandsay {
    constructor() {
        this.name = "sayembed"
        this.description = "Envoie un embed"
        this.options = [
            { type: 'STRING', name: "msg", description: "Le message dans l'embed.", required: true },
            { type: 'STRING', name: "everyone", description: "yes/no.", required: false },
            { type: 'STRING', name: "color", description: "only colors name (RED, BLUE).", required: false },
        ]
    }

    async execute(interaction) {
        let msg = interaction.options.getString("msg")
        const eve = interaction.options.getString("everyone")
        let color = interaction.options.getString("color")
        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: `You don't have the permission \`MODERATE_MEMBERS\` to do this command.`, ephemeral: true});


        msg = await msg.replaceAll('%nl%', '\n')


        if(!color) {
            color = "RED"
        }

        const embed = new MessageEmbed()
            .setDescription(`${msg}`)
            .setColor(`${color}`)


        if(eve === "yes") {
            interaction.channel.send({content: "@everyone", embeds: [embed]})
        } else {
            interaction.channel.send({embeds: [embed]})
        }

        interaction.reply({content: "C bon !", ephemeral: true})

    }
}

module.exports = commandsay
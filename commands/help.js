const Discord = require("discord.js")
const fs = require('fs');
const config = require('../config')


class commandhelp {
    constructor() {
        this.name = "help"
        this.description = "All my commands"
        this.options = [
            { type: 'STRING', name: "command", description: "Command to have infos", required: false },
        ]
    }

    async execute(interaction, client) {
        const command = interaction.options.getString("command")

        if(command) {
            let ress = command+'.js'
            let fileExist = fs.existsSync("./commands/"+ress)

            if(fileExist) {
                try {
                    const commands = require(`./${ress}`)
                    const data = new commands()
                    interaction.reply({embeds: [
                        new Discord.MessageEmbed()
                        .setDescription(` __**Commands Info:**__`)
                        .addFields(
                            { name: `/${data.name}`, value: `${data.description}`},
                        )
                        .setColor(`BLUE`)
                    ]});
                } catch (err) { 
                    console.log(err)
                }
            } else {
                interaction.reply({content: "Cette commande n'existe pas !"})
            }

        } else {
            const commands = fs.readdirSync('./commands/');
            const com = commands.map(file => file.replace(".js", ""))
            interaction.reply({embeds: [
                new Discord.MessageEmbed()
                .setDescription(` __**Commands:**__\n\n \`${com.join(', ')}\``)
                .setColor(`BLUE`)
            ]});
            

        }

    }
}

module.exports = commandhelp
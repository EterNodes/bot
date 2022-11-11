const config = require('../config')
const {MessageEmbed} = require('discord.js')
class commandclear {
    constructor() {
        this.name = "clear"
        this.description = "Clear a certain number of messages"
        this.options = [
            { type: 'NUMBER', name: "number", description: "The number of messages to clear", required: true },

        ]
    }

    async execute(interaction) {
        const num = interaction.options.getNumber("number")
        
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: `You don't have the permission \`MANAGE_MESSAGES\` to do this command.`, ephemeral: true});

        if (num > 100)
            return interaction.reply({content: `The number can't be more than \`100\`.`, ephemeral: true});

        if (num < 1)
            return interaction.reply({content: `Please Supply A Number More Than \`1\`.`, ephemeral: true});

        interaction.channel.bulkDelete(num).catch(() => null)

        

            interaction.reply({ content: "J'ai suprimé "+num+" messages. (msg deleting in 10 seconds)", fetchReply: true}).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 10000);
            }); 
    
    }
}

module.exports = commandclear
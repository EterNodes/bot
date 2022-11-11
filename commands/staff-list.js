const Discord = require("discord.js")
const fs = require('fs');
const config = require('../config')


class commandhelp {
    constructor() {
        this.name = "staff-list"
        this.description = "Staff ?"

    }

    async execute(interaction, client) {
            interaction.reply({embeds: [
                new Discord.MessageEmbed()
                .setDescription(` __**LiteHeberg's Staff**__\n\n<:Owners:1032746742824833044>:\n- Trisout\n- Lefuh/HeyRoz\n- ArcadePrograme\n\n<:Moderator:1032746745702141952>:\n- 0xyToan\\n\n- SundayMC`)
                .setColor(`BLUE`)
            ]});
    }
}

module.exports = commandhelp
const Discord = require("discord.js")
const config = require("../config");

const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("db", true, true, '/' ));


class commandavatar { 
    constructor() {
        this.name = "listwarn"
        this.description = "Montre les warns d'un boug."
        this.options = [
            { type: 'USER', name: "member", description: "The member to warn.", required: true },
        ]
    }

    async execute(interaction) {
        const member = interaction.options.getUser("member")
        try {
            await db.getData(`/${member.id}/warns`).then((a) => {
                interaction.reply(`${member.username} has ${a} warn(s) !`)
            })
        } catch (e) {
            interaction.reply(`${member.username} have 0 warn !`)
        }
        
    }
}

module.exports = commandavatar
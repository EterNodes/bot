const Discord = require("discord.js")
const config = require("../config");

const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("db", true, true, '/' ));


class commandavatar { 
    constructor() {
        this.name = "unwarn"
        this.description = "UnWarn un boug. (retire 1 warn)"
        this.options = [
            { type: 'USER', name: "member", description: "The member to unwarn.", required: true },
            { type: 'NUMBER', name: "number", description: "Number of warn to substract.", required: false },
            { type: 'STRING', name: "reason", description: "The reason.", required: false }
        ]
    }

    async execute(interaction, client) {
        const member = interaction.options.getUser("member")
        const reason = interaction.options.getString("reason")
        let num = interaction.options.getNumber("number")

        if (!num) {
            num = 1
        }

        const channel = client.channels.cache.get("1033376868449128508")

        try {
            await db.getData(`/${member.id}/warns`).then((a) => {
                if(a - num < 0) return interaction.reply(`Ptn mais tes con plus que 0 !`)
                db.push(`/${member.id}/warns`, a - num)
                interaction.reply(`<@${member.id}> is now warned for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}** and has now ${a - num} warn !`)
                channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("YELLOW")
                            .setTitle(":warning: New UnWarn !")
                            .setDescription(`User: ${member} [\`${member.id}\`]
Number of unwarns: **${num}**
Reason: **${reason !== null ? `${reason}` : 'No reason specified'}**
Warn Number: **${a - num}**`)
                    ]
                })
                if (a - num === 0) {
                    db.delete(`/${member.id}/warns`)
                }
            })
        } catch (e) {
            interaction.reply(`He don't have warns !, Sad...`)
        }


        

    }
}

module.exports = commandavatar
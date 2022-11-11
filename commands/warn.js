const Discord = require("discord.js")
const config = require("../config");

const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("db", true, true, '/' ));


class commandavatar { 
    constructor() {
        this.name = "warn"
        this.description = "Warn un boug."
        this.options = [
            { type: 'USER', name: "member", description: "The member to warn.", required: true },
            { type: 'STRING', name: "reason", description: "The reason.", required: false },
        ]
    }

    async execute(interaction, client) {
        const member = interaction.guild.members.cache.get(interaction.options.getUser("member").id)
        const reason = interaction.options.getString("reason")

        const channel = client.channels.cache.get("1033376868449128508")
        
            await db.getData(`/${member.id}/warns`).then((a) => {
                db.push(`/${member.id}/warns`, a + 1)

                if (a + 1 >= 2) {
                    member.timeout(604800000).then(() => { console.log })
                } 
                interaction.reply(`${member} is now warned for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}** and has now ${a + 1} warn !`)
                channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("YELLOW")
                            .setTitle(":warning: New Warn !")
                            .setDescription(`User: ${member} [\`${member.id}\`]
Reason: **${reason !== null ? `${reason}` : 'No reason specified'}**
Warn Number: **${a + 1}**`)
                    ]
                })

        }).catch( async (e) => {
            console.log(e)
            db.push(`/${member.id}/warns`, 1)
            interaction.reply(`<@${member.id}> is now warned for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}** and has now his first warn !`)
            channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("YELLOW")
                            .setTitle(":warning: New Warn !")
                            .setDescription(`User: ${member} [\`${member.id}\`]
Reason: **${reason !== null ? `${reason}` : 'No reason specified'}**
Warn Number: **1**`)
                    ]
                })
        })
        
        
        

        

    }
}

module.exports = commandavatar
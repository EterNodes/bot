const Discord = require("discord.js");
const axios = require('axios')
const config = require('../panelconfig.json');

class commandtest {
    constructor() {
        this.name = "panel-userinfo"
        this.description = "Avoir des informations sur quelqu'un du panel."
        this.options = [
            { type: 'STRING', name: "username", description: "Le nom de la personne.", required: true },
        ]
    }

    async execute(interaction) {

        const user = interaction.options.getString('username');



        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: `You don't have the permission \`MANAGE_MESSAGES\` to do this command.`, ephemeral: true});
        
        return interaction.reply("TGGGGGG")

        const instance = axios.create({
            headers: {
                'Authorization': 'Bearer ' + config.pterodactyl.adminApiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        instance.get("https://panel.liteheberg.com/api/application/users").then((a) => {
            let data = a.data.data
            try {
                let puser = data.find(l => l.attributes.username === user)
                let u = puser.attributes
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${user}'s panel infos`)
                    .setDescription(`UserName: ${u.username}
UuID: ${u.uuid}
ID: ${u.id}
Email: ${u.email}
Created At: ${u.created_at}
Updated At: ${u.updated_at}

Full name: ${u.first_name} ${u.last_name}`)
                .setColor("RED")
                
                interaction.reply({embeds: [embed]})
            } catch (e) {
                interaction.reply({ content: "Panel Error: User Not Foud" })
                console.log(e)
            }

        })


    }
}

module.exports = commandtest
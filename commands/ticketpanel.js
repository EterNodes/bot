const {MessageEmbed} = require("discord.js")
const Discord = require("discord.js")
const yconfig = require('yaml-config');
var text_panel = yconfig.readConfig('./texts-config.yaml', 'ticket_panel');

class commandhelp {
    constructor() {
        this.name = "ticketpanel"
        this.description = "Créer un super panel de ticket !"

    }

    async execute(interaction, client) {
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return message.reply(":x: | Tu n'as pas la permission de faire sa !")
       var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("open-ticket")
                .setLabel(text_panel.buttons.open_ticket)
                .setStyle(text_panel.buttons.open_ticket_style)
            );
        const embed1 = new MessageEmbed()
        .setTitle("Règlement Ticket | Tickets Rules")
        .setDescription(`

:flag_fr: 1. Merci de rester respectueux envers le staff

2. Le <#980064766854844437> s'applique

3. **Si la présence du staff n'est pas obligatoire, merci de vous rendre dans le <#1019662752651952219> .

ticket ne respectant les conditions = timeout 1 semaine**
**~~                                                                                                                 ~~**
:flag_gb: 1. Please be respectful to the staff

2. The <#980064766854844437> applies

3. **If the presence of the staff is not mandatory, please go to <#1019662752651952219> .

ticket not respecting the conditions = timeout 1 week**`)
        .setColor("GREEN")
            const Ticketembed = new MessageEmbed()
                .setColor(text_panel.color)
                .setTitle(text_panel.title)
                .setDescription(`:flag_fr: En cas de problème. Vous pouvez ouvrir un ticket.
**~~                                                                                                                 ~~**
:flag_gb: If you are a problem. You can open a ticket.`)
                .setFooter({ text: text_panel.footer  });
            
            interaction.channel.send({ embeds: [embed1, Ticketembed], components: [row] });
            interaction.reply({content: "C'est bon", ephemeral: true});

    }
}

module.exports = commandhelp
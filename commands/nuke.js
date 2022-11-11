const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');

class commandnuke {
    constructor() {
        this.name = "nuke"
        this.description = "Suprime et recreer un channel pour que les ghosts ping soit delete."

    }

    async execute(interaction) {


        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `You don't have the permission \`ADMINISTRATOR\` to do this command.`, ephemeral: true});

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ouioui')
					.setLabel('Oui')
					.setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('nonnon')
                    .setLabel('Non')
					.setStyle('DANGER'),
                
            )

        const embed1 = new Discord.MessageEmbed()
                .setTitle(`:warning:ㅤNuke systemㅤ:warning:`)
                .setDescription(`Tu veux vraiment delete et recreer le salon ?`)
                .setColor('RED')
                .setTimestamp()
        interaction.reply({embeds: [embed1], components: [row]})

        const filter = i => i.customId === 'ouioui' && i.user.id === interaction.member.id;
        const filter2 = o => o.customId === 'nonnon' && o.user.id === interaction.member.id;
        const collector2 = interaction.channel.createMessageComponentCollector({ filter2, time: 20000 });
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

        collector.on('collect', async i => {
            let positionn = interaction.channel.position
            let msgmgggg = interaction.member
            interaction.channel.clone().then((canal) => {
      
            interaction.channel.setParent("1032753872931917854");
      
            canal.setPosition(positionn)
    
            const embed = new Discord.MessageEmbed()
                .setTitle(`:warning: Nuke system :warning:`)
                .setDescription(`:warning:  | ${msgmgggg} a nuke le salon.`)
                .setTimestamp()
                .setColor("#303030")
            canal.send({
                embeds: [embed]
            })
            })

        });

        collector2.on('collect', async o => {
            const embed2 = new Discord.MessageEmbed()
            .setTitle(`:warning: Nuke system :warning:`)
            .setDescription(`OK !`)
            .setColor('GREEN')
            .setTimestamp()

            o.update({embeds: [embed2], components: []})

        });

    }
}

module.exports = commandnuke





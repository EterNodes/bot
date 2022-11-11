const { Permissions } = require('discord.js')
class commandmute {
    constructor() {
        this.name = "mute"
        this.description = "Mute un membre."
        this.options = [
            { type: 'USER', name: "user", description: "L'utilisateur a mute.", required: true },
            { type: 'STRING', name: "reason", description: "The reason you want to mute.", required: true },
        ]
    }

    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: `You don't have the permission \`MODERATE_MEMBERS\` to do this command.`, ephemeral: true});

        const member = interaction.guild.members.cache.get(user.id)

        if(!user) return interaction.reply({ content: "L'utilisateur doit être sur les serveur."})        

        const mutedRole = interaction.guild.roles.cache.find(
            (role) => role.name === 'mute'
        );

        if (!mutedRole) {
            interaction.reply('Il n\'y a pas de mute role => Je creer un role, merci de ne pas changer son nom.');
            interaction.guild.roles.create({name: 'mute', reason: 'pas de mute role :(', position: interaction.guild.roles.highest.position }).then((nr) => {
                nr.setPermissions([Permissions.FLAGS.VIEW_CHANNEL])
            })
            interaction.channel.send({content: 'J\'ai bien créer le mute role, reexecuter la commande pour mute <@'+member+'> !'});
        } else {
            member.roles.add(mutedRole);
            interaction.reply(`J'ai mute **${member}** \`[${member.id}]\` pour la raison: **${reason !== null ? `${reason}` : 'No reason specified'}**`);
        }



    }
}

module.exports = commandmute
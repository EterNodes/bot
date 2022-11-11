const ms = require('ms');
const { Permissions } = require('discord.js');
class commandunmute {
    constructor() {
        this.name = "unmute"
        this.description = "UnMute un membre."
        this.options = [
            { type: 'USER', name: "user", description: "Le membre a unmute", required: true },
        ]
    }

    async execute(interaction) {
        const user = interaction.options.getUser('user')
        
        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: `You don't have the permission \`MODERATE_MEMBERS\` to do this command.`, ephemeral: true});

        const member = interaction.guild.members.cache.get(user.id)

        if(!user) return interaction.reply({ content: "The user need to be on the server."})        

        try{
            member.timeout(null)

            const mutedRole = interaction.guild.roles.cache.find(
                (role) => role.name === 'mute'
            );
    
            if (!mutedRole) {
                interaction.reply('Il n\'y a pas de mute role => Je creer un role, merci de ne pas changer son nom.');
                interaction.guild.roles.create({name: 'mute', reason: 'Mute Role do to not exist before creation', }).then((nr) => {
                    nr.setPermissions([Permissions.FLAGS.VIEW_CHANNEL])
                })
                interaction.reply({content: 'Successfully created a new muted role.'});
            } else {

            member.roles.remove(mutedRole);
            interaction.reply({content: `${user} \`[${member.id}]\` a été unmute.`});
            
            }
        }
        catch(err){
            interaction.reply(`I am sorry but for some reason I am unable to unmute this member.`);
            console.error(err)
        }

    }
}

module.exports = commandunmute
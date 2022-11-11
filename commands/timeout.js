const ms = require('ms');

class commandtimeout {
    constructor() {
        this.name = "timeout"
        this.description = "Timeout or tempmute a membre."
        this.options = [
            { type: 'USER', name: "user", description: "The member to mute.", required: true },
            { type: 'STRING', name: "time", description: "The time you want to mute.", required: true },
            { type: 'STRING', name: "reason", description: "The reason you want to mute.", required: true },
        ]
    }

    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const time = ms(interaction.options.getString('time'))
        
        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: `You don't have the permission \`MODERATE_MEMBERS\` to do this command.`, ephemeral: true});

        const member = interaction.guild.members.cache.get(user.id)

        if(!time) return interaction.reply({ content: "Given time is not valid, it is necessary that you provide valid time."})

        if(!user) return interaction.reply({ content: "The user need to be on the server."})        



        try{
            member.timeout(time, reason)
            interaction.reply({content: `${user} \`[${member.id}]\` a été timeout pendant: ${ms(time, { long: true })}, et pour la raison: ${reason}`});
        }
        catch(err){
            interaction.reply(`I am sorry but for some reason I am unable to timeout this member.`);
            console.error(err)
        }

    }
}

module.exports = commandtimeout
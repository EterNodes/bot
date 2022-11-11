const config = require("../config")
class commandslowmode {
    constructor() {
        this.name = "slowmode"
        this.description = "Change the channel's slowmode."
        this.options = [
            { type: 10, name: "time", description: "The time.", required: true },
        ]
    }

    async execute(interaction) {
        const temp = interaction.options.getNumber("time")


        if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content: `You don't have the permission \`MANAGE_CHANNELS\` to do this command.`, ephemeral: true});
        
        interaction.channel.setRateLimitPerUser(temp)
        interaction.reply({ content: 'Changement of the slowmode of the channel to: `'+temp+'`' });
        
    }
}

module.exports = commandslowmode
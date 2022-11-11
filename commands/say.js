class commandre {
    constructor() {
        this.name = "say"
        this.description = "0xyToan le boss"
        this.options = [
            { type: 'STRING', name: "msg", description: "Le message a envoyer", required: true },
        ]

    }

    async execute(interaction) {

        const msg = interaction.options.getString("msg")
        interaction.channel.send({content: msg})

        interaction.reply({ content: "Done !", ephemeral: true})

        

    }

}

module.exports = commandre
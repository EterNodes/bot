const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("db", true, true, '/' ));

class commandre {
    constructor() {
        this.name = "reload"
        this.description = "Reload le bot !"

    }

    async execute(interaction) {


        await db.reload()
        
        interaction.reply({ content: "Done !", ephemeral: true})

        

    }

}

module.exports = commandre
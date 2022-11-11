const Discord = require("discord.js")
require("moment-duration-format");
const {
    version
} = require("discord.js");
const moment = require("moment");
let os = require('os');
const { filledBar } = require('string-progressbar');
const bar = filledBar((os.totalmem() / 1024 / 1024).toFixed(2), (os.freemem() / 1024 / 1024).toFixed(2))[0]


class commandbotinfo {
    constructor() {
        this.name = "bot-info"
        this.description = "Afiche des informations sur le bot."
    }

    async execute(interaction, client) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({name: `${interaction.client.user.username} Informations`})
            .setTitle("**Stats:**")
            .addFields(
                { name: "`⌚️` Uptime", value: `${duration}`, inline: true},
                { name: "`⚙️` Node", value: `${process.version}`, inline: true},
                { name: "`👾` Discord.js", value: `v${version}`, inline: true},
                { name: "`🤖` CPU", value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, inline: false},
                { name: "`🤖` CPU Speed", value: `${os.cpus()[0].speed} MHz`, inline: false},
                { name: "`⏳` Mem Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: true},
                { name: "`🎚️` Mem Total", value: `${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps`, inline: true},
                { name: "`⏱️` Mem Bar", value: bar, inline: false},
                { name: "`💻` Platform", value: `\`\`${os.platform()}\`\``, inline: true},
                { name: "`🤖` Arch", value: `\`${os.arch()}\``, inline: true},
                { name: "`🦴` OS", value: `\`${os.version()}\``, inline: true},
            )
            .setTimestamp()
		await interaction.reply({ embeds: [embed] });
        
    }
}

module.exports = commandbotinfo
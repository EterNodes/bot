const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
let hastebin = require('hastebin');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require("./ticket-config.js")
const yconfig = require('yaml-config');
var text_panel = yconfig.readConfig('./texts-config.yaml', 'ticket_panel');
var text_ticket = yconfig.readConfig('./texts-config.yaml', 'in_tickets');
var text_support = yconfig.readConfig('./texts-config.yaml', 'support_control');

const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("db", true, true, '/'));

db.load()


const commands = new Discord.Collection()

const files = readdirSync("./commands")
const filesName = files.map(file => file.replace(".js", ""))
for(const fileName of filesName) {
    const command = require(`./commands/${fileName}`)
    const data = new command()
    commands.set(data.name, data)
    console.log(`Commande ${fileName} chargée`)
}


client.on("ready", () => {
    client.application.commands.set(commands.map(({ execute, ...data }) => data))
    console.log(client.user.tag)
    console.log("bot is ready")
       const embed = new MessageEmbed()
               .setColor("YELLOW")
               .setDescription(`${client.user} has started `)
    client.channels.cache.find(i => i.id === '1032751197838381097').send({ embeds: [embed]});
  
    
    const guild = client.guilds.cache.get("971820242416324668")
     client.channels.cache.get("1032293457580003348").edit({ 
            name: `👥・Members: ${guild.memberCount}`
        })
})

client.on("guildMemberAdd", (member) => {
    client.channels.cache.get("1032293457580003348").edit({
        name: `👥・Members: ${member.guild.memberCount}`
    })
})

client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand()) return
    if(!commands.has(interaction.commandName)) return
    try {
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content:":x: | Tu n'as pas la permission de faire sa !"})
        commands.get(interaction.commandName).execute(interaction, client, commands)
    } catch (error) {
        console.error(error)
    }
})


    client.on("interactionCreate", interaction => {
        if(interaction.isButton()){
            if(interaction.customId === "open-ticket"){     
                interaction.guild.channels.create("ticket-" + interaction.user.username, {
                    parent: config.catopen,
                    topic: `${interaction.user.id}`,
                    permissionOverwrites: [
                       {
                         id: interaction.user.id,
                         type: 'member',
                         allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES']
                       },
                       {
                           id: interaction.guild.id,
                           type: 'role',
                           deny: 'VIEW_CHANNEL'
                         },
                       {
                           id: config.staff,
                           type: 'role',
                           allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                       }  
                     ]
                }).then(channel =>{
                    var row = new Discord.MessageActionRow()
                       .addComponents(new Discord.MessageButton()
                           .setCustomId("close-ticket")
                           .setLabel(text_ticket.buttons.close_ticket)
                           .setStyle(text_ticket.buttons.close_ticket_style)
                       );
                       const embed7 = new MessageEmbed()
                       .setColor(text_ticket.color)
                       .setTitle(text_ticket.title)
                       .setDescription(`:flag_fr: Le ticket à bien été ouvert. Un membre du staff viendra vers vous dans les plus brefs délais. 
:flag_gb: The ticket has been successfully opened. A staff member will come to you as soon as possible`)
                       channel.send({embeds: [embed7], components: [row] }).then(async (msg) => {
                           await msg.reply({content: `<@${interaction.user.id}>`})
                            await msg.pin()
                           await msg.channel.bulkDelete(2)

                        })
                        
   
                       interaction.reply({content: text_panel.confirmation+" (<#"+channel.id+">)", ephemeral: true})
                       
                });
            }
            else if(interaction.customId === "close-ticket"){
                interaction.channel.setParent(config.catclose);
   
                var row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                   .setCustomId("delete-ticket")
                   .setLabel(text_support.buttons.del_ticket)
                   .setStyle(text_support.buttons.del_ticket_style)
                , new Discord.MessageButton()
                    .setCustomId("save-transcript")
                    .setLabel(text_support.buttons.save_trans)
                    .setStyle(text_support.buttons.save_trans_style)
                );
   
                const embed8 = new MessageEmbed()
                    .setColor(text_support.color)
                    .setTitle(text_support.title)
                    .setDescription(`support team control`)
                interaction.reply({ embeds: [embed8], components: [row] });
                   
            }
            else if(interaction.customId === "delete-ticket" ){
                interaction.channel.delete();
            } else if(interaction.customId === "save-transcript"){
                const guild = client.guilds.cache.get(interaction.guildId);
                const chan = guild.channels.cache.get(interaction.channelId);

                if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
                    return interaction.reply("You do not have the permissions to do this.")
                const transcriptCreated = new Discord.MessageEmbed()
                    .setDescription("**Transcript is being created...**")
                    .setColor(text_support.color)
                interaction.reply({
                    embeds: [transcriptCreated]
                });

                chan.messages.fetch().then(async (messages) => {
                    let a = messages.filter(m => m.author.bot !== true).map(m =>
                        `${new Date(m.createdTimestamp).toLocaleString('am-AM')} - ${m.author.username}#${m.author.discriminator} : ${m.content}`
                    ).reverse().join('\n');
                    if (a.length < 1) a = "Nothing"
                    hastebin.createPaste(a, {
                        contentType: 'text/plain',
                        server: 'https://hastebin.eternodes.eu'
                    }, {})
                        .then(function (urlToPaste) {
                            const embed = new Discord.MessageEmbed()
                                .setDescription(`📰 Ticket logged \`${chan.id}\` created by <@${chan.topic}> and deleted by <@!${interaction.user.id}>\n\nLogs: [**Click here to see the logs.**](${urlToPaste})`)
                                .setColor(text_support.color)
                                .setTimestamp();
                            const embed2 = new Discord.MessageEmbed()  
                                .setDescription("You can now safely delete the channel !")
                                .setColor(text_support.color)

                            interaction.editReply({embeds: [embed2]})

                            client.channels.cache.get("1032751197838381097").send({
                                embeds: [embed]
                            });

                            client.users.cache.get(chan.topic).send({
                                embeds: [embed]
                            }).catch(() => { console.log('I cant send it DM') });

                        });
                });
            }}    
});



client.login(config.token).then(() => {
    client.user.setPresence({ activities: [{ name: 'Eternode', type: 'PLAYING' }], status: 'online' });
});



const discord = require('discord.js')
const fs = require('fs')

const client = new discord.Client({
    intents: [ 
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_BANS,
        discord. Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        discord. Intents.FLAGS.GUILD_WEBHOOKS,
        discord.Intents.FLAGS.GUILD_INVITES,
        discord.Intents.FLAGS.GUILD_VOICE_STATES,
        discord.Intents.FLAGS.GUILD_PRESENCES,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS
    ]
});

const loadEvents = () => {
    const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'))
    for (const file of eventFiles) {
        client.on(file.split(".")[0], require(`${process.cwd()}/events/${file}`).bind(null, client))
        console.log(`EVENT: ${file} has been loaded`)
    }
}

const loadSlashCommands = async () => {
    
    const categories = [];
    fs.readdirSync(`${process.cwd()}/slashCommands`).forEach(category => {
        categories.push(category);
    })

    const guild = client.discord.getGuild('848553984988938271', client)

    categories.forEach(async c => {
        
        await fs.readdir(`${process.cwd()}/slashCommands/${c}`, async (err, files) => {
            
            if(err) throw err;

            await files.forEach(f => {

                if(!(f.split(".").pop() === "js")) return
                let slashName = f.split(".")[0];

                guild.commands.create({
                    name: slashName,
                    description: client.slashCommandsConfig[slashName].description,
                    options: client.slashCommandsConfig[slashName].options
                })
                .catch(console.error)

                const settings = require(`${process.cwd()}/slashCommands/${c}/${f}`);
                settings.commandName = slashName
                settings.description = client.slashCommandsConfig[slashName].description
                settings.category = c
                settings.permissions = client.slashCommandsConfig[slashName].permissions
                client.slashCommands.set(slashName, settings);

                console.log(`SLASHCOMMAND: ${slashName} has been loaded`)

            })

        })
    })
}

client.config = require(`${process.cwd()}/config.json`)
client.slashCommandsConfig = require(`${process.cwd()}/slashCommands.json`)
client.slashCommands = new discord.Collection();
client.discord = require(`${process.cwd()}/utils/discord.js`)

loadEvents()
setTimeout(function(){
    loadSlashCommands()
}, 3000);

client.login(client.config.bot_token)

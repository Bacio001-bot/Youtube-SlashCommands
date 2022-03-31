module.exports =  { 
    getCategory(find, guildId, client) {
        try {
            const guild = client.guilds.cache.get(guildId);
            if(find.includes('<#') && find.includes('>')) {
                find = find.replace('<#', '')
                find = find.replace('>', '')
            }
            let ch = guild?.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_CATEGORY") || 
            guild?.channels.cache.find(ch => ch.id === find && ch.type == "GUILD_CATEGORY") ||
            guild?.channels.cache.find(ch => ch.name.toLowerCase().includes(find.toLowerCase()) && ch.name.toLowerCase().startsWith(find.toLowerCase())  && ch.type == "GUILD_CATEGORY")

            if (ch) return ch;
            return null;
        } catch(err) {
            return null;
        }
    },
    
    getTextChannel(find, guildId, client) {
        try {
            const guild = client.guilds.cache.get(guildId);
            if(find.includes('<#') && find.includes('>')) {
                find = find.replace('<#', '')
                find = find.replace('>', '')
            }
            let ch = guild?.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_TEXT") || 
            guild?.channels.cache.find(ch => ch.id === find && ch.type == "GUILD_TEXT") ||
            guild?.channels.cache.find(ch => ch.name.toLowerCase().includes(find.toLowerCase()) && ch.name.toLowerCase().startsWith(find.toLowerCase())  && ch.type == "GUILD_TEXT")

            if (ch) return ch;
            return null;
        } catch(err) {
            return null;
        }
    },

    getVoiceChannel(find, guildId, client) {
        try {
            const guild = client.guilds.cache.get(guildId);
            if(find.includes('<#') && find.includes('>')) {
                find = find.replace('<#', '')
                find = find.replace('>', '')
            }
            let ch = guild?.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_VOICE") || 
            guild?.channels.cache.find(ch => ch.id === find && ch.type == "GUILD_VOICE") ||
            guild?.channels.cache.find(ch => ch.name.toLowerCase().includes(find.toLowerCase()) && ch.name.toLowerCase().startsWith(find.toLowerCase())  && ch.type == "GUILD_VOICE")

            if (ch) return ch;
            return null;
        } catch(err) {
            return null;
        }
    },

    getStageChannel(find, guildId, client) {
        try {
            const guild = client.guilds.cache.get(guildId);
            if(find.includes('<#') && find.includes('>')) {
                find = find.replace('<#', '')
                find = find.replace('>', '')
            }
            let ch = guild?.channels.cache.find(ch => ch.name === find && ch.type == "GUILD_STAGE_VOICE") || 
            guild?.channels.cache.find(ch => ch.id === find && ch.type == "GUILD_STAGE_VOICE") ||
            guild?.channels.cache.find(ch => ch.name.toLowerCase().includes(find.toLowerCase()) && ch.name.toLowerCase().startsWith(find.toLowerCase())  && ch.type == "GUILD_STAGE_VOICE")

            if (ch) return ch;
            return null;
        } catch(err) {
            return null;
        }
    },
    
    getRole(find, guildId, client) {
        const guild = client.guilds.cache.get(guildId);
        if(find.includes('<@&') && find.includes('>')) {
            find = find.replace('<@&', '')
            find = find.replace('>', '')
        }   
             
        let role = 
        guild?.roles.cache.find(rl => rl.name.toLowerCase() === find.toLowerCase()) || 
        guild?.roles.cache.find(rl => rl.name.toLowerCase().includes(find.toLowerCase()) && rl.name.toLowerCase().startsWith(find.toLowerCase())) || 
        guild?.roles.cache.get(find)
        ;


        if (role) return role;
        return null;
    },

    getMember(find, guildId, client) {
        const guild = client.guilds.cache.get(guildId);

        let member = 
        guild?.members.cache.get(find) || guild?.members.cache.find(m => m.user.username.toLowerCase().includes(find.toLowerCase())) ||
        guild?.members.cache.find(m => m.user.username.toLowerCase() === find.toLowerCase()) || 
        guild?.members.cache.find(m => m.displayName.toLowerCase() === find.toLowerCase()) ||
        guild?.members.cache.find(m => m.displayName.toLowerCase().includes(find.toLowerCase()) && m.displayName.toLowerCase().startsWith(find.toLowerCase()));

        if (member) return member;

        if (find.includes("#")) {
            let tag = find.toLowerCase().split("#");
            member = guild?.members.cache.find(m => m.user.username.toLowerCase() == tag[0] && m.user.discriminator == tag[1])      
            if (member) return member;
            return null;
        }

        return null;
    },

    getEvent(find, guildId, client) {
        const guild = client.guilds.cache.get(guildId);
        let event = guild.scheduledEvents.cache.find(ev=> ev.id === find)
        if(event) return event
        return null
    },

    getGuild(guildId, client) {
        return client.guilds.cache.get(guildId);
    }
    
}
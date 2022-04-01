module.exports = {
    async execute(client, interaction) {
        
        let user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')

        try {
            
            let member = client.discord.getMember(user.id, interaction.guild.id, client)
            member.kick({ reason: reason })
            return interaction.reply({ content: `${user.tag} has successfully been kicked`, ephemeral: true })

        } catch (error) {
            
            console.log(error)
            return interaction.reply({ content: `${user.tag} couldn't be kicked reason supplied in console`, ephemeral: true })

        }


    }
}
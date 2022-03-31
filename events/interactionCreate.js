module.exports = async (client, interaction) => {

    if(interaction.isCommand()) {

        client.slashCommands.forEach( async(slashCommand) => {

            if(interaction.commandName != slashCommand.commandName) return

            return slashCommand.execute(			
                client,
                interaction
            )

        })

    }

}
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client){
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;

            const command = commands.get(commandName);

            if(!command) return;

            try{
                await command.execute(interaction,client);
            }catch(error){
                console.log(error);
                await interaction.reply({
                    content: `Something went wrong while using this command... Try again or contact support.`,
                    ephemeral: true
                })
            }
        }
    }
}
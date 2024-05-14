const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;

            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: `Something went wrong while using this command... Try again or contact support.`,
                    ephemeral: true
                });
            }
        } else if (interaction.type === InteractionType.ModalSubmit) {
            if (interaction.customId === 'suggestionModal') {
                const command = client.commands.get('suggest');
                if (!command) return;

                try {
                    await command.handleModal(interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'Hubo un error procesando tu sugerencia.', ephemeral: true });
                }
            }
        }
    }
}

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Elimina un número específico de mensajes en el canal actual.')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('La cantidad de mensajes a eliminar (1-100)')
                .setRequired(true)),
    once: false,
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('cantidad');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Por favor, introduce un número entre 1 y 100.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            return interaction.reply({ content: 'Hubo un error al intentar eliminar los mensajes en este canal.', ephemeral: true });
        });

        await interaction.reply({ content: `Se han eliminado ${amount} mensajes.`, ephemeral: true });
    }
}

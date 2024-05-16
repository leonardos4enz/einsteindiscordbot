const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra la latencia del bot.'),
    once: false,
    async execute(interaction, client) {
        const sent = await interaction.reply({ content: 'Calculando latencia...', fetchReply: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! La latencia es de ${ping}ms. Latencia de API: ${client.ws.ping}ms`);
    }
}

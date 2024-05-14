const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra una lista de todos los comandos disponibles.'),
    once: false,
    async execute(interaction, client) {
        const commands = client.commands.map(cmd => ({
            name: `/${cmd.data.name}`,
            description: cmd.data.description
        }));

        const embed = new EmbedBuilder()
            .setTitle('Lista de Comandos')
            .setDescription('Aquí tienes una lista de todos los comandos disponibles:')
            .addFields(commands.map(cmd => ({ name: cmd.name, value: cmd.description })))
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

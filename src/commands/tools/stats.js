const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Muestra estadísticas del servidor.'),
    once: false,
    async execute(interaction, client) {
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`Estadísticas del Servidor: ${guild.name}`)
            .addFields(
                { name: 'Total de Miembros', value: guild.memberCount.toString(), inline: true },
                { name: 'Total de Canales', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Total de Roles', value: guild.roles.cache.size.toString(), inline: true },
                { name: 'Total de Emojis', value: guild.emojis.cache.size.toString(), inline: true }
            )
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

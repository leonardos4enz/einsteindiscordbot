const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojis')
        .setDescription('Muestra todos los emojis del servidor.'),
    once: false,
    async execute(interaction, client) {
        const emojis = interaction.guild.emojis.cache.map(emoji => emoji.toString()).join(' ');

        const embed = new EmbedBuilder()
            .setTitle(`Emojis del Servidor: ${interaction.guild.name}`)
            .setDescription(emojis || 'Este servidor no tiene emojis.')
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

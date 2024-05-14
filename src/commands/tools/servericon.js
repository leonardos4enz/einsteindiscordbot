const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servericon')
        .setDescription('Muestra el icono del servidor.'),
    once: false,
    async execute(interaction, client) {
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`Icono del Servidor: ${guild.name}`)
            .setImage(guild.iconURL({ dynamic: true, size: 512 }))
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

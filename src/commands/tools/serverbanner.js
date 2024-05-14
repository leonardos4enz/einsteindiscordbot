const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverbanner')
        .setDescription('Muestra el banner del servidor.'),
    once: false,
    async execute(interaction, client) {
        const guild = interaction.guild;
        const bannerURL = guild.bannerURL({ dynamic: true, size: 512 });

        if (!bannerURL) {
            return interaction.reply({ content: 'Este servidor no tiene un banner.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle(`Banner del Servidor: ${guild.name}`)
            .setImage(bannerURL)
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

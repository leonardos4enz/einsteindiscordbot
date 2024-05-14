const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Proporciona un enlace para invitar a otros usuarios al servidor.'),
    once: false,
    async execute(interaction, client) {
        const inviteURL = 'https://discord.gg/zRyG4E9xDp';

        const embed = new EmbedBuilder()
            .setTitle('¡Únete a Nuestro Servidor!')
            .setDescription('Haz clic en el enlace a continuación para unirte a nuestro servidor de Discord:')
            .addFields({ name: 'Enlace de Invitación', value: inviteURL, inline: false })
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

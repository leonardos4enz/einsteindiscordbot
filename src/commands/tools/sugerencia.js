const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Envía una sugerencia al canal de sugerencias.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('El texto de tu sugerencia')
                .setRequired(true)),
    once: false,
    async execute(interaction) {
        const suggestionText = interaction.options.getString('text');
        const suggestionChannelId = '1239391350986637323'; // Reemplaza esto con el ID real del canal de sugerencias.

        // Obtiene el canal de sugerencias.
        const suggestionChannel = await interaction.client.channels.fetch(suggestionChannelId);
        if (!suggestionChannel) {
            await interaction.reply({ content: 'No se encontró el canal de sugerencias.', ephemeral: true });
            return;
        }

        // Crea un embed para la sugerencia.
        const suggestionEmbed = new EmbedBuilder()
            .setColor("#E4E4E4")
            .setTitle('Nueva sugerencia')
            .setDescription(`❝${suggestionText}❞`)
            .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        // Envía la sugerencia en un embed al canal.
        const suggestionMessage = await suggestionChannel.send({
            content: `<@${interaction.user.id}>`,
            embeds: [suggestionEmbed]
        });

        // Añade reacciones al mensaje de la sugerencia.
        await suggestionMessage.react('<:checkmark:1239395180952551465>'); // Like
        await suggestionMessage.react('<:xmark:1239395182177423371>'); // Unlike

        // Crea un embed para la confirmación al usuario.
        const confirmationEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Sugerencia Enviada')
            .setDescription(`Tu sugerencia ha sido enviada con éxito al canal <#${suggestionChannelId}>.`)
            .setTimestamp();

        // Envía el embed de confirmación de manera efímera.
        await interaction.reply({ embeds: [confirmationEmbed], ephemeral: true });
    }
};

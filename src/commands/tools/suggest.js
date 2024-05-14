const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, InteractionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Envía una sugerencia al canal de sugerencias.'),
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const modal = new ModalBuilder()
                .setCustomId('suggestionModal')
                .setTitle('Enviar Sugerencia');

            const suggestionInput = new TextInputBuilder()
                .setCustomId('suggestionInput')
                .setLabel("Escribe tu sugerencia")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);
            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        }
    },
    async handleModal(interaction) {
        const suggestionText = interaction.fields.getTextInputValue('suggestionInput');
        const suggestionChannelId = '1239391350986637323'; // Reemplaza esto con el ID real del canal de sugerencias.

        try {
            const suggestionChannel = await interaction.client.channels.fetch(suggestionChannelId);
            if (!suggestionChannel) {
                await interaction.reply({ content: 'No se encontró el canal de sugerencias.', ephemeral: true });
                return;
            }

            const suggestionEmbed = new EmbedBuilder()
                .setColor("#E4E4E4")
                .setTitle('Nueva sugerencia')
                .setDescription(`${suggestionText}`)
                .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const suggestionMessage = await suggestionChannel.send({
                content: `<@${interaction.user.id}>`,
                embeds: [suggestionEmbed]
            });

            await suggestionMessage.react('<:checkmark:1239395180952551465>'); // Like
            await suggestionMessage.react('<:xmark:1239395182177423371>'); // Unlike

            const confirmationEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Sugerencia Enviada')
                .setDescription(`Tu sugerencia ha sido enviada con éxito al canal <#${suggestionChannelId}>.`)
                .setTimestamp();

            await interaction.reply({ embeds: [confirmationEmbed], ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error procesando tu sugerencia.', ephemeral: true });
        }
    }
};

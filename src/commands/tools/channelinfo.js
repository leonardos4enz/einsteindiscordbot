const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Muestra información sobre un canal específico.')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('El canal del que quieres obtener información')
                .setRequired(true)),
    once: false,
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('canal');

        const embed = new EmbedBuilder()
            .setTitle('Información del Canal')
            .addFields(
                { name: 'Nombre del Canal', value: channel.name, inline: true },
                { name: 'ID del Canal', value: channel.id, inline: true },
                { name: 'Tipo de Canal', value: ChannelType[channel.type], inline: true },
                { name: 'Fecha de Creación', value: channel.createdAt.toDateString(), inline: true },
                { name: 'NSFW', value: channel.nsfw ? 'Sí' : 'No', inline: true },
                { name: 'Tópico', value: channel.topic || 'Ninguno', inline: true }
            )
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

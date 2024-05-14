const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Muestra información detallada sobre el servidor.'),
    once: false,
    async execute(interaction, client) {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setTitle('Información del Servidor')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Nombre del Servidor', value: guild.name, inline: true },
                { name: 'ID del Servidor', value: guild.id, inline: true },
                { name: 'Propietario', value: owner.user.tag, inline: true },
                { name: 'Total de Miembros', value: guild.memberCount.toString(), inline: true },
                { name: 'Total de Canales', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Total de Roles', value: guild.roles.cache.size.toString(), inline: true },
                { name: 'Creado el', value: guild.createdAt.toDateString(), inline: true },
                { name: 'Nivel de Boost', value: guild.premiumTier.toString(), inline: true },
                { name: 'Número de Boosts', value: guild.premiumSubscriptionCount.toString(), inline: true },
            )
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

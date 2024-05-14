const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Muestra información sobre un usuario específico.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario del que quieres obtener información')
                .setRequired(true)),
    once: false,
    async execute(interaction, client) {
        const user = interaction.options.getUser('usuario');
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle('Información del Usuario')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Nombre de Usuario', value: user.username, inline: true },
                { name: 'Discriminador', value: `#${user.discriminator}`, inline: true },
                { name: 'ID del Usuario', value: user.id, inline: true },
                { name: 'Cuenta Creada', value: user.createdAt.toDateString(), inline: true },
                { name: 'Miembro desde', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', '), inline: true }
            )
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

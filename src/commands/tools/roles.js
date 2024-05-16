const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Envía un mensaje con botones para asignar roles.'),
    once: false,
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Selecciona tu rol')
            .setDescription('Haz clic en los botones para obtener o quitar un rol.')
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('role1')
                    .setLabel('Role 1')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('role2')
                    .setLabel('Role 2')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: false });    
    }
}


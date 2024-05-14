const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Muestra información sobre el bot.'),
    once: false,
    async execute(interaction, client) {
        const uptime = moment.duration(client.uptime).humanize();
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const embed = new EmbedBuilder()
            .setTitle('Información del Bot')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Nombre del Bot', value: client.user.username, inline: true },
                { name: 'ID del Bot', value: client.user.id, inline: true },
                { name: 'Fecha de Creación', value: client.user.createdAt.toDateString(), inline: true },
                { name: 'Fecha de Ingreso al Servidor', value: interaction.guild.members.cache.get(client.user.id).joinedAt.toDateString(), inline: true },
                { name: 'Tiempo en Línea', value: uptime, inline: true },
                { name: 'Uso de Memoria', value: `${memoryUsage} MB`, inline: true },
                { name: 'Servidores', value: client.guilds.cache.size.toString(), inline: true },
                { name: 'Usuarios Atendidos', value: client.users.cache.size.toString(), inline: true },
                { name: 'Sistema Operativo', value: `${os.type()} ${os.release()}`, inline: true },
                { name: 'Arquitectura', value: os.arch(), inline: true }
            )
            .setColor('#0099ff')
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}

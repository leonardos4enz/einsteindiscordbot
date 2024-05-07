const moment = require('moment'); // Asegúrate de tener moment instalado
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {


        const embed = new EmbedBuilder()
            .setTitle(`¡Bienvenido a ${member.guild.name}!`)
            .setDescription(`${member} ¡Gracias por unirte! \nTu cuenta fue creada ${moment(member.user.createdTimestamp).fromNow()}. Esperamos que disfrutes tu tiempo aquí.`)
            .setColor("Aqua")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Número actual de miembros', value: `${member.guild.memberCount}`, inline: false }
            )
            .setFooter({ text: `ID del Miembro: ${member.id}` })
            .setTimestamp();

        // Encuentra el canal de bienvenida
        const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
        if (!channel) {
            console.log("No se encontró el canal de bienvenida.");
            return;
        }

        // Enviar el embed al canal
        channel.send({ embeds: [embed] });

    }
};

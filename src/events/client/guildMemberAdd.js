const moment = require('moment'); // Asegúrate de tener moment instalado
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {


        const embed = new EmbedBuilder()
            .setTitle(`¡Bienvenido a ${member.guild.name}!`)
            .setDescription(`${member} ¡Bienvenido! \nTu cuenta fue creada ${moment(member.user.createdTimestamp).fromNow()}, ¡Disfruta tu estancia!`)
            .setColor("Aqua")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `ID: ${member.id}` })
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

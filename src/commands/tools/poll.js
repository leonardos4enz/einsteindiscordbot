const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Crea una encuesta.')
        .addStringOption(option => 
            option.setName('pregunta')
                .setDescription('La pregunta de la encuesta.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion1')
                .setDescription('Primera opción de la encuesta.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion2')
                .setDescription('Segunda opción de la encuesta.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion3')
                .setDescription('Tercera opción de la encuesta (opcional).')
                .setRequired(false))
        .addStringOption(option => 
            option.setName('opcion4')
                .setDescription('Cuarta opción de la encuesta (opcional).')
                .setRequired(false)),
    once: false,
    async execute(interaction, client) {
        const pregunta = interaction.options.getString('pregunta');
        const opciones = [
            interaction.options.getString('opcion1'),
            interaction.options.getString('opcion2'),
            interaction.options.getString('opcion3'),
            interaction.options.getString('opcion4')
        ].filter(option => option !== null);

        let description = '';
        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
        opciones.forEach((opcion, index) => {
            description += `${emojis[index]} ${opcion}\n`;
        });

        const embed = new EmbedBuilder()
            .setTitle(pregunta)
            .setDescription(description)
            .setColor('#0099ff')
            .setFooter({ text: `Encuesta creada por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });

        for (let i = 0; i < opciones.length; i++) {
            await message.react(emojis[i]);
        }
    }
}

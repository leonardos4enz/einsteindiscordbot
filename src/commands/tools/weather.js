const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Muestra el clima actual de una ubicación específica.')
        .addStringOption(option =>
            option.setName('ubicacion')
                .setDescription('La ubicación para la que deseas ver el clima')
                .setRequired(true)),
    once: false,
    async execute(interaction, client) {
        const location = interaction.options.getString('ubicacion');
        const apiKey = process.env.openweather; // Reemplaza con tu clave API de OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                return interaction.reply({ content: 'No se pudo encontrar la ubicación. Por favor, inténtalo de nuevo.', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle(`Clima en ${data.name}, ${data.sys.country}`)
                .addFields(
                    { name: 'Temperatura', value: `${data.main.temp} °C`, inline: true },
                    { name: 'Humedad', value: `${data.main.humidity}%`, inline: true },
                    { name: 'Condición', value: data.weather[0].description, inline: true },
                    { name: 'Viento', value: `${data.wind.speed} m/s`, inline: true }
                )
                .setColor('#0099ff')
                .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: false });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Hubo un error al obtener el clima. Por favor, inténtalo de nuevo más tarde.', ephemeral: true });
        }
    }
}

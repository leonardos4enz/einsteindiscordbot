const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, registerFont } = require('canvas');

const frasesEinstein = [
    "La imaginación es más importante que el conocimiento.",
    "En medio de la dificultad yace la oportunidad.",
    "La vida es como andar en bicicleta. Para mantener el equilibrio, debes seguir adelante.",
    "Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello y maravilloso mundo del saber.",
    "Una persona que nunca ha cometido un error nunca ha intentado algo nuevo.",
    "Locura es hacer la misma cosa una y otra vez esperando obtener diferentes resultados.",
    "El verdadero signo de la inteligencia no es el conocimiento sino la imaginación.",
    "La educación es lo que queda después de olvidar lo que se ha aprendido en la escuela.",
    "Lo importante es no dejar de hacerse preguntas.",
    "Quien nunca ha cometido un error nunca ha probado algo nuevo."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Envía un embed personalizado al usuario que ejecuta el comando'),
    once: false,
    async execute(interaction, client) {
        const member = interaction.member;
        const guild = interaction.guild;

        const fraseAleatoria = frasesEinstein[Math.floor(Math.random() * frasesEinstein.length)];

        const canvas = createCanvas(500, 250);
        const ctx = canvas.getContext('2d');

        // Dibuja un fondo que simula un pizarrón verde
        ctx.fillStyle = '#3e7a47';  // Color verde pizarrón
        ctx.fillRect(0, 0, 500, 250);

        // Agrega un efecto de textura de pizarrón, si tienes una imagen de textura, puedes usarla aquí
        //if (textureImage) {  // Suponiendo que has cargado una imagen de textura previamente
        //    ctx.drawImage(textureImage, 0, 0, 500, 250);
        //}

        // Configura el color blanco y un estilo de letra que simula gis
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px "Comic Sans MS", cursive, sans-serif'; // Fuente más informal como gis
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Agrega un ligero efecto de sombra para simular el gis
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Dibuja el nombre del usuario centrado en el canvas
        ctx.fillText(member.displayName, 250, 125);

        // Convertir el canvas a buffer y crear un adjunto
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome_image.png' });

        const embed = new EmbedBuilder()
            .setTitle(`¡Bienvenido a ${guild.name}!`)
            .setDescription(
                `¡Mucho gusto! ${member.displayName}, :wave:\n` +
                `¡Te damos la bienvenida como miembro número **${guild.memberCount}** de nuestra comunidad de exploradores! :atom:\n\n` +
                `**"${fraseAleatoria}"\n⎯ Albert Einstein**`
            )
            .setColor("#E4E4E4")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setImage('attachment://welcome_image.png')
            .setFooter({ text: `ID del Miembro: ${member.id}` })
            .setTimestamp();

        // Enviar el mensaje con el embed y el archivo adjunto
        await interaction.reply({
            embeds: [embed],
            files: [attachment],
            ephemeral: false
        });
    }
    
};
const c = 'assets/images/welcomeBackground.png'
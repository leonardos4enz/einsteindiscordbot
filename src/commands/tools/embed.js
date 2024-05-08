const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, registerFont } = require('canvas');

// Registra la fuente correctamente
registerFont('assets/fonts/CrimsonText-Regular.ttf', { family: 'Crimson-Text' });

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
        ctx.fillStyle = '#3e7a47';
        ctx.fillRect(0, 0, 500, 250);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px "Crimson Text", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Agrega un ligero efecto de sombra para simular el gis
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Dibuja el nombre del usuario que se une al servidor
        ctx.fillText(`${member.displayName} #${guild.memberCount}`, 250, 30);

        // Funciones matemáticas
        const functions = [
            (x) => 125 + 50 * Math.sin(0.05 * x),
            (x) => 125 + 50 * Math.cos(0.05 * x)
        ];

        // Selecciona una función aleatoria
        const randomIndex = Math.floor(Math.random() * functions.length);
        const selectedFunction = functions[randomIndex];

        // Dibuja la gráfica elegida
        ctx.beginPath();
        ctx.moveTo(0, selectedFunction(0)); // Comienza en el punto inicial adecuado
        for (let x = 0; x < 500; x++) {
            ctx.lineTo(x, selectedFunction(x));
        }
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Texto para indicar qué gráfica es
        const graphNames = ["Seno", "Coseno", "Tangente", "Lineal"];
        ctx.fillText(`Gráfica de ${graphNames[randomIndex]}`, 250, 230);


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
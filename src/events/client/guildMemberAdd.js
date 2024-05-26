
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, registerFont, loadImage } = require('canvas');

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
    name: 'guildMemberAdd',

    async execute(member, client) {

        const guild = member.guild;

        const fraseAleatoria = frasesEinstein[Math.floor(Math.random() * frasesEinstein.length)];

        const canvas = createCanvas(500, 250);
        const ctx = canvas.getContext('2d');

        // Dibuja un fondo que simula un pizarrón verde
        ctx.fillStyle = '#3e7a47';
        ctx.fillRect(0, 0, 500, 250);

        // Dibuja una cuadrícula tenue
        const gridSize = 25; // Tamaño de las celdas de la cuadrícula
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.4)'; // Color gris tenue
        ctx.lineWidth = 1; // Línea delgada

        // Líneas horizontales
        for (let y = gridSize; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Líneas verticales
        for (let x = gridSize; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        ctx.fillStyle = 'white';
        ctx.font = 'bold 22px "Crimson Text", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(`${member.displayName} #${guild.memberCount}`, 250, 25);

        const functions = [
            (x) => 125 + 50 * Math.sin(0.05 * x),
            (x) => 125 + 50 * Math.cos(0.05 * x),
            (x) => 125 + 25 * Math.sin(0.1 * x) + 25 * Math.cos(0.1 * x),
            (x) => 125 - 50 * Math.sin(0.05 * x),
            (x) => 125 + 50 * Math.sin(0.1 * x) - 50 * Math.cos(0.1 * x),
            (x) => 125 + 30 * Math.sin(0.2 * x) + 30 * Math.sin(0.1 * x),
            (x) => 125 - 30 * Math.sin(0.2 * x) - 30 * Math.cos(0.1 * x),
            (x) => 125 + 40 * Math.cos(0.2 * x) + 40 * Math.sin(0.1 * x),
            (x) => 125 - 60 * Math.sin(0.05 * x) + 30 * Math.cos(0.1 * x),
            (x) => 125 + 50 * Math.sin(0.05 * x) + 20 * Math.cos(0.08 * x),
            (x) => 125 + 20 * Math.sin(0.15 * x) - 50 * Math.cos(0.07 * x),
            (x) => 125 - 30 * Math.sin(0.1 * x) + 30 * Math.sin(0.05 * x),
            (x) => 125 - 70 * Math.cos(0.05 * x) + 50 * Math.sin(0.05 * x)
        ];

        const randomIndex = Math.floor(Math.random() * functions.length);
        const selectedFunction = functions[randomIndex];

        ctx.beginPath();
        ctx.moveTo(0, selectedFunction(0));
        for (let x = 0; x < 500; x++) {
            ctx.lineTo(x, selectedFunction(x));
        }
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(250, 125, 60, 0, Math.PI * 2, true); // Centro y radio para el clip circular
        ctx.closePath();
        ctx.clip();

        // Cargar y dibujar el avatar del usuario
        const avatarURL = member.user.displayAvatarURL({ extension: 'jpg', size: 256 });
        const avatar = await loadImage(avatarURL);
        ctx.drawImage(avatar, 190, 65, 120, 120);  // Ajusta estas coordenadas y tamaño según sea necesario

        // Dibuja el borde blanco
        ctx.lineWidth = 5;  // Define el grosor del borde
        ctx.strokeStyle = 'white';  // Define el color del borde
        ctx.stroke();  // Aplica el trazo

        ctx.restore(); // Restaura el contexto para seguir dibujando el resto del canvas

        // Texto para indicar qué gráfica es, usando la fórmula matemática
        const graphNames = [
            "y = 125 + 50 sin(0.05x)",
            "y = 125 + 50 cos(0.05x)",
            "y = 125 + 25 sin(0.1x) + 25 cos(0.1x)",
            "y = 125 - 50 sin(0.05x)",
            "y = 125 + 50 sin(0.1x) - 50 cos(0.1x)",
            "y = 125 + 30 sin(0.2x) + 30 sin(0.1x)",
            "y = 125 - 30 sin(0.2x) - 30 cos(0.1x)",
            "y = 125 + 40 cos(0.2x) + 40 sin(0.1x)",
            "y = 125 - 60 sin(0.05x) + 30 cos(0.1x)",
            "y = 125 + 50 sin(0.05x) + 20 cos(0.08x)",
            "y = 125 + 20 sin(0.15x) - 50 cos(0.07x)",
            "y = 125 - 30 sin(0.1x) + 30 sin(0.05x)",
            "y = 125 - 70 cos(0.05x) + 50 sin(0.05x)"
        ];
        ctx.fillText(graphNames[randomIndex], 250, 220);



        // Convertir el canvas a buffer y crear un adjunto
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome_image.png' });

        const embed = new EmbedBuilder()
            .setTitle(`¡Bienvenido a ${guild.name}!`)
            .setDescription(
                `¡Mucho gusto! ${member.displayName}, :wave:\n` +
                `¡Te damos la bienvenida como miembro número **${guild.memberCount}** de nuestra comunidad de mine exploradores!\n\n` +
                `**"${fraseAleatoria}"\n⎯ Albert Einstein**`
            )
            .setColor("#E4E4E4")
            .setImage('attachment://welcome_image.png')
            .setFooter({ text: `ID del Miembro: ${member.id}` })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTimestamp();

        const channel = client.channels.cache.get('1241878141421490198');

        // Verifica si el miembro no es un bot antes de enviar el mensaje
        if (!member.user.bot) {
            // Envía el mensaje en el canal
            channel.send({
                content: `<@${member.id}>!`,
                embeds: [embed],
                files: [attachment]
            });
        
            // Intenta enviar el mismo mensaje por mensaje privado
            member.send({
                content: `¡Hola ${member.displayName}!`,
                embeds: [embed]
            }).catch(error => {
                console.error(`No se pudo enviar el mensaje privado a ${member.displayName}: ${error}`);
                // Opcional: Informa en algún canal de logs o toma otra acción si el mensaje no pudo ser enviado.
            });
        }


    }
};

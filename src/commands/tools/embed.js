const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

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

        // Carga la imagen de fondo
        const backgroundImage = await loadImage('assets/images/welcomeBackground2.jpg'); // Asegúrate de poner la ruta correcta de tu imagen
        ctx.drawImage(backgroundImage, 0, 0, 500, 250);

        // Configura el color y el tipo de letra para el nombre del usuario
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(member.displayName, 100, 100); // Dibuja el nombre del usuario centrado en el canvas

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
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js') 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create an embed'),
    async execute(interaction, client){
        const embed = new EmbedBuilder()
            .setTitle("This is an embed")
            .setDescription("This is a very cool description.")
            .setColor("Aqua")
            .setImage(client.user.displayAvatarURL())
            
        await interaction.reply({
            embeds: [embed]
        });
    }
}
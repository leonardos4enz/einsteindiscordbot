require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents
    ]
});

client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(process.env.TOKEN);

// Listener para los botones
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const role1 = interaction.guild.roles.cache.find(role => role.name === 'Lego');
    const role2 = interaction.guild.roles.cache.find(role => role.name === 'DaVinci');

    if (interaction.customId === 'role1') {
        if (interaction.member.roles.cache.has(role1.id)) {
            await interaction.member.roles.remove(role1);
            await interaction.reply({ content: `Te he quitado el rol **${role1.name}**.`, ephemeral: true });
        } else {
            await interaction.member.roles.add(role1);
            await interaction.reply({ content: `Te he asignado el rol **${role1.name}**.`, ephemeral: true });
        }
    } else if (interaction.customId === 'role2') {
        if (interaction.member.roles.cache.has(role2.id)) {
            await interaction.member.roles.remove(role2);
            await interaction.reply({ content: `Te he quitado el rol **${role2.name}**.`, ephemeral: true });
        } else {
            await interaction.member.roles.add(role2);
            await interaction.reply({ content: `Te he asignado el rol **${role2.name}**.`, ephemeral: true });
        }
    }
});


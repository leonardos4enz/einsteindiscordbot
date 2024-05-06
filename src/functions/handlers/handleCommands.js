const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        const commandArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);

                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been passed through the handler.`)
            }

        }

        const clientId = '1236817616883154984';
        const guildId = '1080529345946333194';
        const rest = new REST({ version: '9' }).setToken(process.env.token);

        try {
            console.log('Started refreshing applications (/) commands.');
            //console.log(commandArray);
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: commandArray,
            });

            console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.log(error);
        }
    };
};

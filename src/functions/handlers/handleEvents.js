const fs = require("fs");

const path = require('path');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(path.join(__dirname, '..', '..', 'events'));
        //console.log(eventFolders);
        for (const folder of eventFolders) {
            //console.log(folder);
            const eventFiles = fs
                .readdirSync(path.join(__dirname, '..', '..', 'events', folder))
                .filter((file) => file.endsWith(".js"));
            
            //console.log(eventFiles);
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(path.join(__dirname, '..', '..', 'events', folder, file));
                        if (event.once) {
                            client.once(event.name, (...args) => 
                                event.execute(...args, client)
                            );
                        } else {
                            client.on(event.name, (...args) => 
                                event.execute(...args, client)
                            );
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    };
};

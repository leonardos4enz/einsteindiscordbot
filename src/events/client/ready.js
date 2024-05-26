module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const channel = client.channels.cache.get('1241878141870276621');
        channel.send('**:zap: ¡Encendido y listo! :zap:**');
    }
}
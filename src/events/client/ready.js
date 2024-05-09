module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const channel = client.channels.cache.get('1237233690094866563');
        channel.send('**:zap: ¡Encendido y listo! :zap:**');
    }
}
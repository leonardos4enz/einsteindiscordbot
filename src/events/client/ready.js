module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const channel = client.channels.cache.get('1237233690094866563');
        channel.send('**¡Encendido y listo! :white_check_mark:**');
    }
}
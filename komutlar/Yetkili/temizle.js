const Discord = require('discord.js');
exports.run = function(client, message, args) {
    if (!args[0]) return message.channel.send("Ne kadar mesaj silmem gerekli?");
    message.channel.bulkDelete(args[0]).then(() => {
        const botunmesajyonet = new Discord.RichEmbed()
        let messagecount = parseInt(args.join(' '));
        message.channel.fetchMessages({
            limit: messagecount
        }).then(messages => message.channel.bulkDelete(messages));
        message.channel.send(`:white_check_mark: Başarıyla \`${args[0]}\` Adet mesaj silindi.`).then(msg => msg.delete(10000))

    })
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sil'],
    permLevel: 1,
    kategori: "Yetkili"
};

exports.help = {
    name: 'sil',
    description: 'Belirlenen miktarda mesajı siler.',
    usage: 'clear <silinicek mesaj sayısı>'
};

//ItsukaShido© - Berat Koyuncu 2019

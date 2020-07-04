const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json);

exports.run = async(client, message, args) => {

    var request = require('request');
    request(`https://api.warframestat.us/pc/cetusCycle`, function(error, response, body) {

        try {
            var veri = JSON.parse(body);

            let genel = veri

            if (genel.state === "day") {
                var gün = "Gündüz"
            }
            if (genel.state === "night") {
                var gün = "Gece"
            }

            if (genel.isCetus === true) {
                var cetus = "Aktif"
            }
            if (genel.isCetus === false) {
                var cetus = "Kapalı"
            }

            var embed = new Discord.RichEmbed()
                .setDescription(`
ID: ${genel.id}
Aktivasyon: ${genel.activation}
Vade: ${genel.expiry}
Durum: ${gün}
Kalan Zaman: ${genel.timeLeft}
Cetus: ${cetus}
Kısaltılmış Zaman: ${genel.shortString}
`)
                .setColor("BLUE")
                .setFooter("Warframe")
            message.channel.send(embed)
        } catch (err) {
            console.log(err);
            message.reply(`**Warframe** yanıt vermıyor.`).then(msg => msg.delete(5000));
        };
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["w-cetus"],
    permLevel: 0,
    kategori: "oyun",
    oysistem: false
};

exports.help = {
    name: 'warframe-cetus-istatistik',
    description: 'açıklama',
    usage: `kullanım`
};

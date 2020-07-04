const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json);

exports.run = async(client, message, args) => {

    var request = require('request');
    request(`https://api.warframestat.us/pc/constructionProgress`, function(error, response, body) {

        try {
            var veri = JSON.parse(body);

            let genel = veri


            var embed = new Discord.RichEmbed()
                .setDescription(`
ID: ${genel.id}
Fomorian İlerleme: ${genel.fomorianProgress}
Razorback İlerleme: ${genel.razorbackProgress}
Diğer İlerlemeler: ${genel.unknownProgress}
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
    aliases: ["w-rfkurulum"],
    permLevel: 0,
    kategori: "oyun",
    oysistem: false
};

exports.help = {
    name: 'warframe-razorback-fomorians-kurulum',
    description: 'açıklama',
    usage: `kullanım`
};

const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../../ayarlar.json');
// hissediyorum burada bir neptune komutu
exports.run = (client, message, args) => {
message.channel.send(new Discord.RichEmbed().setDescription('N-nEEEEEEEEEEEEEEEEEEEE?').setThumbnail("https://cdn.glitch.com/adcca4f2-4739-4bb1-a7b2-b9af4a2ba8c4%2Fce520176-a16c-4b04-97c2-a4f797e5a20b.image.png?v=1574791924720").setColor(ayarlar.renk)).then(message => {
      console.log(`Reboot Komutu Kullanıldı... `) 
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
      process.exit(1);
    }).catch(console.error)
  message.delete()
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot"],
  permLevel: 5
};

exports.help = {
  name: 'yenile',
  description: '[Admin Komutu]',
  usage: 'reboot'
};
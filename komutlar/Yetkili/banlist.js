const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json");

exports.run = (bot, message, args) =>
{
   let Discord = require('discord.js');
    var userlist = message.guild.fetchBans();
   userlist.then(collection =>
   {
     if(collection.first() == null)
     {
       const embed = new Discord.RichEmbed()
       .setTitle(`Banlanan Kullanıcı bulunamadı!!!`)
       .setColor(ayarlar.renk);
       message.channel.send({embed});
     }
     else
     {
       const embed = new Discord.RichEmbed()
       .setTitle("--------------Kurallara Uymayıp Banlananlar--------------")
       .setColor(ayarlar.renk);
       for(userlist of collection)
       {
           var user = userlist[1];
           embed.addField(` **${user.tag}**`, `_________ _____________`);
       }
       message.channel.send({embed});
     }
   });
 }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banlılar","banlist","banlananlar","cezalandırılanlar","banlist"],
  permLevel: 3,
  kategori: "Yetkili"
};
module.exports.help = {
  name: 'Cezalandırılanlar',
  description: 'Sunucundan Banlanan üyeleri gösterir.',
  usage: 'Cezalandırılanlar'
};

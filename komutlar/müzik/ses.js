const Discord = require('discord.js');
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core')
const ayarlar = require('../../ayarlar.json');
const youtube = new YouTube(ayarlar.API);

exports.run = async(client, msg, args) => {
let searchString = args.slice(0).join(' ');
let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
let serverQueue = client.queue.get(msg.guild.id);
  let i = args[0];
 
if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          "<:no:642658047390384128> | Lütfen öncelikle sesli bir kanala katılınız!"
        );
    if (!serverQueue)
      return msg.channel.send(
        "<:no:642658047390384128> | Hiç bir müzik çalmamakta!"
      );
    //msg.channel.send("**Doğru Kullanım:** ``a!ses [1/7]``");
    var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    if (!args[0] && !number.some(word => msg.content.includes(word)))
      return msg.channel.send(
        `<:no:642658047390384128> | Şuanki ses seviyesi: \`${serverQueue.volume}\``
      );
    serverQueue.volume = args[0];
    if (isNaN(i))
      return msg.channel.send(
        `<:no:642658047390384128> | Ses seviyesi harflerden değil, rakamlardan oluşmaktadır!`
      );
    if (i > 100)
      return msg.channel.send(
        `<:no:642658047390384128> | Ses seviyesi en fazla \`100\` olabilir!`
      );
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return msg.channel.send(
      `<:yessss:642657995272093706> | Ses seviyesi başarıyla \`%${i}\` olarak ayarlandı.`
    );
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["volume"], 
  permLevel: 0 
};

exports.help = {
  name: 'ses', 
  description: 'Şarkının sesini arttırır. (Ses bozulmalarına neden olabilir!)', 
  usage: `${ayarlar.prefix}ses 1/100` 
};
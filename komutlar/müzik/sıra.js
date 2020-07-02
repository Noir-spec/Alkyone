const Discord = require('discord.js');
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core')
const ayarlar = require('../../ayarlar.json');
const youtube = new YouTube(ayarlar.API);
const moment = require('moment')
require('moment-duration-format');

exports.run = async(client, msg, args) => {
let searchString = args.slice(0).join(' ');
let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
let serverQueue = client.queue.get(msg.guild.id);
    let index = 0;
  
    if (!serverQueue)
      return msg.channel.send(
        "<:no:642658047390384128> | Sırada Müzik Bulunmamakta!"
      );
    let sayi = 1;
    const embed = new Discord.RichEmbed()
      .setColor(ayarlar.renk)
      .setAuthor(`${msg.guild.name} | Şarkı Kuyruğu`, msg.guild.iconURL)
      .setDescription(
        serverQueue.songs
          .map(
            song =>
              `\`${sayi++}\` ${song.title} \`[${song.durationh}s ${song.durationm}m ${
                song.durations
              }s]\` \n\`İsteyen: ${client.users.get(`${song.kullanıcı}`).tag}\``
          )
          .join("\n")
      );
    return msg.channel.send(embed).catch(err => {
            console.log(err)
            return msg.channel.send(`<:no:642658047390384128> | Sırada çok fazla müzik var!`);
        });
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["queue"], 
  permLevel: 0 
};

exports.help = {
  name: 'sıra', 
  description: 'Şarkı listesini gösterir.', 
  usage: `${ayarlar.prefix}sıra` 
};
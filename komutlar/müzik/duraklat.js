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

    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(
        "<:yessss:642657995272093706> | Müzik durduruldu."
      );
    }
    if (!serverQueue)
      return msg.channel.send(
        "<:no:642658047390384128> | Hiç bir müzik çalmamakta!"
      );
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["stop"], 
  permLevel: 0 
};

exports.help = {
  name: 'duraklat', 
  description: 'Çalan müziği duraklatır.', 
  usage: `${ayarlar.prefix}duraklat`
};
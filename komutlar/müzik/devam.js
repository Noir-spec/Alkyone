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

if (!msg.member.voiceChannel)
      return msg.channel.send(
        "<:no:642658047390384128> | Lütfen öncelikle sesli bir kanala katılınız!"
      );
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(
        "<:yessss:642657995272093706> | Müzik devam ediyor."
      );
    }
    return msg.channel.send(
      "<:no:642658047390384128> | Hiç bir müzik çalmamakta!"
    );
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["continue"], 
  permLevel: 0 
};

exports.help = {
  name: 'devam', 
  description: 'Duraklattığınız müziği devam ettirir.', 
  usage: `${ayarlar.prefix}devam` 
};
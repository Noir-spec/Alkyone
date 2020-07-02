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
    if (!serverQueue)
      return msg.channel.send(
        "<:no:642658047390384128> | Hiç bir müzik çalmamakta!"
      );
    msg.channel.send(
      `<:yessss:642657995272093706> **|** \`${serverQueue.songs[0].title}\` adlı müzik başarıyla durduruldu.`
    );
    serverQueue.songs = [];
    //serverQueue.textChannel.sendEmbed(new Discord.RichEmbed().setDescription("Müzik Bitti. \n\n<a:dikkat:608055586185019412> Bana bir iki dakikanı ayırıp alttaki linkten oy verirmisin? \n\n[OYVER](https://discordbots.org/bot/590668105341206529/vote)").setColor(ayarlar.renk));
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
  
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["leave"], 
  permLevel: 0 
};

exports.help = {
  name: 'durdur', 
  description: 'Dinlediğiniz müziği durdurur ve kanaldan ayrılır.', 
  usage: `${ayarlar.prefix}durdur`
};
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

    if (msg.member.hasPermission("ADMINISTRATOR")) {
      serverQueue.connection.dispatcher.end(`Şarkı geçildi.`);
      return msg.channel.send(
        "<:yessss:642657995272093706> | Başarıyla müziği geçtim."
      );
    } else {
      if (msg.member.voiceChannel.members.size === 3) {
        serverQueue.connection.dispatcher.end(`Şarkı geçildi.`);
        return msg.channel.send(
          "<:yessss:642657995272093706> | Başarıyla müziği geçtim."
        );
      } else {
        let geçoy
        if (msg.member.voiceChannel.members.size === 4) geçoy = 2;
        if (msg.member.voiceChannel.members.size === 5) geçoy = 2;
        if (msg.member.voiceChannel.members.size === 6) geçoy = 3;
        if (msg.member.voiceChannel.members.size === 7) geçoy = 4;
        if (msg.member.voiceChannel.members.size === 8) geçoy = 5;
        if (msg.member.voiceChannel.members.size > 8) geçoy = 6;
        let ms23 = await msg.channel.send(
          `<:yessss:642657995272093706> Geçmek için \`1/${geçoy}\``
        );
        ms23.react("➡").then(r => {
          const backwardsFilter = (reaction, user) =>
            reaction.emoji.name === "➡";
          const backwards = ms23.createReactionCollector(backwardsFilter, {
            time: 0
          });

          backwards.on("collect", r => {
            ms23.edit(
              `Geçmek için **${
                ms23.reactions.filter(a => a.emoji.name == "➡").first().count
              }/${geçoy}**`
            );
            if (
              ms23.reactions.filter(a => a.emoji.name == "➡").first().count ===
              geçoy
            ) {
              serverQueue.connection.dispatcher.end(`Şarkı geçildi.`);
              return ms23.edit(
                `<:yessss:642657995272093706> | Başarıyla müziği geçtim.`
              );
            }
          });
        });
      }
    }
    return undefined;
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["skip"], 
  permLevel: 0 
};

exports.help = {
  name: 'geç', 
  description: 'Şarkıyı geçersiniz.', 
  usage: `${ayarlar.prefix}geç`
};
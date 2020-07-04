const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json');
const bot = require('../../bot.js');

exports.run = async (client, msg, args) => {
  
   msg.channel.send(
      `**Gecikme Süresi:** **[**\`${client.ping}ms\`**]**`
    )
  
  msg.channel.send(`**Mesaj Gecikme Süresi:** **[**\`${Date.now() - msg.createdTimestamp}ms\`**]**`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong", "ping"],
  permLevel: 0
};

exports.help = {
  name: 'gecikme',
  description: 'Botun gecikme süresini gösterir.',
  usage: `${ayarlar.prefix}ping`
};
   
1

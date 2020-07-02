const Discord = require('discord.js');
exports.run = (client, message, args, msg) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Ne Yaptığını Zannediyorsun!?').setDescription(`Sunucu yöneticisi değilsin!`).setColor('RED'));
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Kimi atayım?').setDescription('Kimi atacağımı belirtsen daha iyi olur hani hani.').setColor('#0a0a0a')).then(msg => msg.delete(5000));
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Sebepsiz Yeremi Atılıyor?').setDescription('Sunucudan atma sebebini yazmak zorundasın!').setColor('BLUE')).catch(console.error);

  if (!message.guild.member(user).kickable) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('...Pekala').setDescription('Sanırım bilmiyorsun. Yetkilileri atamam.').setColor("RED")).then(msg => msg.delete(5000));
  message.guild.member(user).kick();
  message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Başarıyla Atıldı!').setDescription(`${message.author} Başarıyla Atıldı!`).setColor("GREEN"))
  
  const özelmesajbilgi = new Discord.RichEmbed()
  .setTitle('Sunucudan Atıldın!')
  .setDescription(`${message.guild.name} Adlı Sunucudan atıldın. \n\nÇünkü:\`${reason}\``)
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL)
  return client.users.get(user.id).sendEmbed(özelmesajbilgi)


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};
const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args, msg) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Ne Yaptığını zannediyorsun!?').setDescription(`Yetkin yetmiyor iken kimseyi banlayamazsın.`).setColor('RED'));
  let guild = message.guild
  let sebep = args.slice(1).join(' ') || `Sebepsiz.`
  let kisi = message.mentions.users.first();
  if (!kisi) return message.channel.send(new Discord.RichEmbed().setTitle('Kimi hedef alacağımı Söylesen Hani?').setDescription('**Hedef belirtilmedi.**').setColor(`#0a0a0a`)).then(msg => msg.delete(5000));
if (!sebep) return message.channel.send(new Discord.RichEmbed().setTitle('Sebep Yazmalısın.').setDescription('**Sebepsiz yere mi banlanıyor?**').setColor(`#ffd500`)).catch(console.error);
if (!message.guild.member(kisi).bannable) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('⚠️ | **Sen yetkilileri değil, yetkililer seni banlayabilir.**').setColor("RED")).then(msg => msg.delete(5000));
  message.guild.member(kisi).ban();
client.users.get(kisi.id).sendEmbed(new Discord.RichEmbed().setTitle(`${message.guild.name} adlı sunucudan banlandın. Umarım yakın zamanda banın açılır. :)`).setDescription(`Banlanma nedenin ise:'${sebep}'`).setColor("RANDOM"))
message.channel.sendEmbed(new Discord.RichEmbed().setTitle('İzi :smiling_imp:').setDescription(`${kisi} adlı kişi başarı ile sunucudan banlandı.`).setColor("GREEN"))

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0 //wtf
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};
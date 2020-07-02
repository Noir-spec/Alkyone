const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
exports.run = async (client, message, args) => {
  if (!message.guild) return
if (message.author.bot) return
    
  let guild = message.guild
  let user = message.mentions.users.first();
  let muterole = message.guild.roles.find(`name`, "Susturuldu.");    
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply("⚠️ | Yeterli iznim yok \n```Rolleri Yönet``` iznini vermediğin sürece birilerini susturmamı bekleme benden.").catch(console.error);
else if (!user) return message.reply("Konuşturulacak kişiyi etiketleyin.");

  if (message.guild.members.get(user.id).roles.has(muterole.id)) {
    message.guild.members.get(user.id).removeRole(muterole)
       message.channel.send(`<@${user.id}> artık konuşabilir.`);
   
  }
const özelmesajbilgi = new Discord.RichEmbed()
.setTitle('Yazı yazma engelin açıldı. Şimdilik...')
.setDescription(`**${message.guild.name}** isimli sunucuda artık konuşabilirsin.`)
.setColor(ayarlar.renk)
.setThumbnail(message.guild.iconURL)
.setFooter(`${client.user.username}© Copyright`,) //buranın nere olduğu hakkında hiç bi fikrim yok.
return client.users.get(user.id).send(özelmesajbilgi);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unmute'],
  permLevel: 1,
  kategori: "Yetkili"
};

exports.help = {
  name: 'susturaç',
  description: 'İstediğiniz kişiyi susturmaz.',
  usage: 'susturaç [kullanıcı] [sebep]'
};
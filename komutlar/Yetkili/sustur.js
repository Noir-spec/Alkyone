const Discord = require('discord.js');
exports.run = async (client, message, args) => {

  if (!message.guild) return;
   if (message.author.bot) return;
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let muterole = message.guild.roles.find(`name`, "Susturuldu.");
  
  //rol olusturmaya baslayalım.
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Susturuldu.",
        color: "#000707",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  };
if (!user) return message.reply("Susturmam gereken kişiyi etiketlemelisin.");
  if (!reason) return message.reply("Sebep yazmalısın!");
  if (!message.guild.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return message.reply("⚠️ | Yeterli iznim yok \n```Rolleri Yönet``` iznini vermediğin sürece birilerini susturmamı bekleme benden.").catch(console.error);

  if (message.guild.member(user).roles.has(muterole.id)) {
   await message.guild.member.get(user.id).removeRole(muterole)
  } else {
    await message.guild.members.get(user.id).addRole(muterole)
      message.channel.send(`<@${user.id}> başarıyla susturuldu`);
   
  }
const özelmesajbilgi = new Discord.RichEmbed()
.setTitle(':warning: Sunucudan susturuldun.')
.setDescription(`${message.guild.name} isimli sunucusundan susturuldun. En yakın zamanda susturulmanın açılmasını dilerim.  \n\nNeden mi susturuldun? Çünkü:\`${reason}\``)
.setColor("RANDOM")
.setThumbnail(message.guild.iconURL)
return client.users.get(user.id).sendEmbed(özelmesajbilgi).catch(e=>{return false});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sustur'],
  permLevel: 1,
  kategori: "Yetkili"
};

exports.help = {
  name: 'mute',
  description: 'İstediğiniz kişiyi  susturur.',
  usage: 'Mute [kullanıcı] [sebep]'
};
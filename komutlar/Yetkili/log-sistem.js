const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let yazı = args[0];
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!yazı) return message.channel.send(new Discord.RichEmbed().setTitle('Bir işlem seçiniz!').setDescription(`\`${prefix}kayıtkanalı #kanal\` ve ya \`${prefix}kayıtkanalı kapat\``).setColor(ayarlar.renk))
     if (yazı === "kapat" || yazı === "sıfırla") {
      if (!db.get(`log_${message.guild.id}`)) return message.channel.send(new Discord.RichEmbed().setAuthor(`Hey ${message.author.tag}!`).setDescription(`Kayıtkanalı zaten ayarlanmamış ve ya kapatılmış.`).setColor(ayarlar.renk))
          await db.delete(`log_${message.guild.id}`)
         const embed2 = new Discord.RichEmbed()
  .setTitle("✅ | Başarılı")
  .setDescription(`Log sistemi kapatıldı!`)
  .setColor(ayarlar.renk)
  .setTimestamp()
  .setFooter(`${client.user.username}© Copyright 2019`, client.user.avatarURL)
  return message.channel.send(embed2);
        } else {
  
          let logkanali = message.mentions.channels.first();
     if (!logkanali) return message.channel.send(new Discord.RichEmbed().setTitle('Hangi Kanal?').setDescription(`Mod Log'u Ayarlamak İçin İlk Önce Kanal Etiketleyiniz! \n\nÖrnek: \`${prefix}log #kanal\``).setColor(ayarlar.renk))
    await db.set(`log_${message.guild.id}`, logkanali.id)

  const embed = new Discord.RichEmbed()
  .setTitle("✅ | Başarılı")
  .setDescription(`Log Kanalı Başarıyla ${logkanali} Olarak Ayarlandı.`)
  .setColor(ayarlar.renk)
  .setTimestamp()
  .setFooter(`${client.user.username}© Copyright 2019`, client.user.avatarURL)
  message.channel.send(embed);
    }  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["modlog","logkanalı", "log" ],
 permLevel: 4,
  kategori: "Yetkili"
};

exports.help = {
 name: 'kayıtkanalı',
 description: 'Denetim Kaydı Kanalı Ayarlarsınız.',
 usage: 'kayıtkanalı'
};

//ScheneYazılım

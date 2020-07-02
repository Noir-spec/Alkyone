const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const a = require('../package.json');


var prefix = ayarlar.prefix;

module.exports = async client => {
  
  console.log(`
---------------------HOŞGELDİN Noir---------------------

> ${client.user.username} Aktif!
> ${client.ping}ms
> ${client.guilds.size} sunucuya hizmet vermektedir.
> ${client.users.size} kullanıcıya hizmet vermektedir.
> Versiyon: ${a.version}v
> ScheneYazılım
------------------------------${client.user.username}-------------------------
`);
  client.user.setStatus("idle");// Online / idle / dnd (Seç beğen yaz)
 client.user.setActivity("Ata iblisi", { type: "WATCHING"});//Oynuyor kısmı bu
}
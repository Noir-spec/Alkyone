const fs = require("fs");
const Discord = require("discord.js");
const db = require("quick.db");
const chalk = require("chalk");
const ayarlar = require("../ayarlar.json");

module.exports = async message => {
  let client = message.client;
  //let prefix = ayarlar.prefix;
  let prefix =
    (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;

  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);

  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command))
    cmd = client.commands.get(client.aliases.get(command));

  if (cmd) {
    var karaliste = await db.fetch(`karalist_${message.author.id}`);
    var clk = await db.fetch(`botuncalismamakanali_${message.channel.id}`);
    
  }
    
    //Komut aç kapat
    if (cmd.conf.enabled === false) {
      message.reply(`Bu komut kullanıma kapalıdır!`);
      return;
    }
////////////////////////////
    
    ////////////////////Yetkiler (PermLvl)
    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply(
          `Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkinin olması gerekli!`
        );
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.reply(
          `Bu komutu kullanabilmek için \`Üyeleri At\` yetkinin olması gerekli!`
        );
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply(
          `Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkinin olması gerekli!`
        );
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply(
          `Bu komutu kullanabilmek için sunucu yetkilisi olman gerek!`
        );
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (
        !ayarlar.sahip.includes(message.author.id)
      ) {
        message.reply(`Sadece sahiplerim bu komutu kullanabilir!`);
        return;
      }
    }
////////////////////////////////////////////
    cmd.run(client, message, params);
  };

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

/////////////////////////Hiçbir boka yaramayan ama müzik sistemini çalıştıran fantazili fonksiyon
client.queue = new Map()
////////////////////////

///////////// KOMUTLAR BAŞ

///Noir'e özel cevap sistemi

client.on('message', async msg => {
    if (msg.content.toLowerCase() === ':black_heart:') {
        await
        msg.channel.send(`Hoşgeldin Efendim`)
    }

});

//Bunu bot.js ve ya index.js ye sallayacaksın


////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.helps = new Discord.Collection();
/*fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});*/

fs.readdir('./komutlar/', (err, categories) => {
        if (err) console.log(err);
        console.log(`Found total ${categories.length} category.`);
        categories.forEach(category => {
            let moduleConf = require(`./komutlar/${category}/module.json`);
            moduleConf.path = `./komutlar/${category}`;
            moduleConf.cmds = [];
            client.helps.set(category, moduleConf);
            if (!moduleConf) return;
            fs.readdir(`./komutlar/${category}`, (err, files) => {
                console.log(`Found total ${files.length - 1} command from ${category}.`)
                if (err) console.log(err);
                let komutlar = new Array();
                files.forEach(file => {
                    if (!file.endsWith('.js')) return;
                    let prop = require(`./komutlar/${category}/${file}`);
                    let cmdName = file.split('.')[0];
                    client.commands.set(prop.help.name, prop);
                    prop.conf.aliases.forEach(alias => {
                        client.aliases.set(alias, prop.help.name);
                    });
                    client.helps.get(category).cmds.push(prop.help.name)
                });
            });
        });
    });

/*client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};*/

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);





//log sistemi

//DİKKAT! BU KISMI BOT.JS VE YA İNDEX.JS HANGİSİ VARSA ONUN İÇİNE EN ALT KISMA ATACAKSIN


client.on("guildMemberAdd", member => {

    var user = member.user;
    var tarih = ''
    if (moment(user.createdAt).format('MM') === '01') {
        var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '02') {
        var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '03') {
        var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '04') {
        var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '05') {
        var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '06') {
        var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '07') {
        var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '08') {
        var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '09') {
        var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '10') {
        var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '11') {
        var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '12') {
        var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }

    var tarih2 = ''
    if (moment(user.joinedAt).format('MM') === '01') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '02') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '03') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '04') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '05') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '06') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '07') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '08') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '09') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '10') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '11') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '12') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }

    if (db.has(`log_${member.guild.id}`) === false) return;

    var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
        .addField("Kullanıcı Tag", member.user.tag, true)
        .addField("ID", member.user.id, true)
        .addField("Discord Kayıt Tarihi", tarih, true)
        .addField("Sunucuya Katıldığı Tarih", tarih2, true)
        .setThumbnail(member.user.avatarURL)
    kanal.send(embed);

});

client.on("guildMemberRemove", member => {

    var user = member.user;
    var tarih = ''
    if (moment(user.createdAt).format('MM') === '01') {
        var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '02') {
        var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '03') {
        var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '04') {
        var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '05') {
        var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '06') {
        var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '07') {
        var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '08') {
        var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '09') {
        var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '10') {
        var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '11') {
        var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.createdAt).format('MM') === '12') {
        var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
    }

    var tarih2 = ''
    if (moment(user.joinedAt).format('MM') === '01') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '02') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '03') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '04') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '05') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '06') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '07') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '08') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '09') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '10') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '11') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }
    if (moment(user.joinedAt).format('MM') === '12') {
        var tarih2 = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
    }

    if (db.has(`log_${member.guild.id}`) === false) return;

    var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
        .addField("Kullanıcı Tag", member.user.tag, true)
        .addField("ID", member.user.id, true)
        .addField("Discord Kayıt Tarihi", tarih, true)
        .addField("Sunucuya Katıldığı Tarih", tarih2, true)
        .setThumbnail(member.user.avatarURL)
    kanal.send(embed);

});

client.on("messageDelete", message => {

    if (message.author.bot) return;

    var user = message.author;

    if (db.has(`log_${message.guild.id}`) === false) return;

    var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
        .addField("Kullanıcı Tag", message.author.tag, true)
        .addField("ID", message.author.id, true)
        .addField("Silinen Mesaj", "```" + message.content + "```")
        .setThumbnail(message.author.avatarURL)
    kanal.send(embed);

});

client.on("messageUpdate", async(oldMsg, newMsg) => {

    if (oldMsg.author.bot) return;


    var user = oldMsg.author;


    if (db.has(`log_${oldMsg.guild.id}`) === false) return;

    var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
        .addField("Kullanıcı Tag", oldMsg.author.tag, true)
        .addField("ID", oldMsg.author.id, true)
        .addField("Eski Mesaj", "```" + oldMsg.content + "```")
        .addField("Yeni Mesaj", "```" + newMsg.content + "```")
        .setThumbnail(oldMsg.author.avatarURL)
    kanal.send(embed);

});

client.on("roleCreate", role => {


    if (db.has(`log_${role.guild.id}`) === false) return;

    var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal.send(embed);

});

client.on("roleDelete", role => {


    if (db.has(`log_${role.guild.id}`) === false) return;

    var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal.send(embed);

});

client.on("roleUpdate", role => {


    if (db.has(`log_${role.guild.id}`) === false) return;

    var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    const embed = new Discord.RichEmbed()
        .setColor(ayarlar.renk)
        .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal.send(embed);

});

client.on('voiceStateUpdate', (oldMember, newMember) => {


    if (db.has(`log_${oldMember.guild.id}`) === false) return;

    var kanal = oldMember.guild.channels.get(db.fetch(`log_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined && newUserChannel !== undefined) {

        const embed = new Discord.RichEmbed()
            .setColor(ayarlar.renk)
            .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
        kanal.send(embed);

    } else if (newUserChannel === undefined) {

        const embed = new Discord.RichEmbed()
            .setColor(ayarlar.renk)
            .setDescription(`${newMember.user.tag} adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
        kanal.send(embed);

    }
});

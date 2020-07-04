const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../.././ayarlar.json');

exports.run = async (client, msg, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${msg.guild.id}`) || ayarlar.prefix
  let user = msg.author;
  let background = "https://cdn.glitch.com/92b550cf-dd45-4208-94d5-4f3c736941d8%2Fbackground.jpg?v=1584370747058";
  
  msg.delete(5000)
  msg.reply("Özel (DM)'ni kontrol et!").then(msg => msg.delete(5000))
  
 /* ///////////////////////////////////////    
  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = user.username;
    var jadim = namam.length > 16 ? namam.substring(0, 16) + "..." : namam;
    var yazı = "Hoşgeldin";
    var {body: avatar} = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size128").replace('.gif','.png'));
    var {body: background1} = await get(background)
    var {body: dIcon} = await get('https://orig00.deviantart.net/2133/f/2016/200/f/a/discord_token_icon_dark_by_flexo013-daaj71i.png')
    
     async function getWrapText(text, length){
	const temp = [];
	for(let i = 0; i < text.length; i+= length){
		temp.push(text.slice(i, i+length));
	}
	return temp.map(x => x.trim());
}
    
  return new Canvas(750, 600)
    .setColor('#000000')
    .addImage(background1, 0,0,750,600)
    //.addImage(dIcon, 25,545,55,55)
    .setTextFont('45px Impact') 
    .addText(`${yazı}`, 300, 250)
    .addText(`${jadim}`, 300, 320)
    //.addImage(avatar, 25, 500, 55, 55)
    .toBufferAsync();
  }
    */
  //////////////////////////////////////
  const yetkili = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setDescription(
        "**Yetkili Komutlarım**"
      )
      .addField("Yasakla", `Kullanım: \`${prefix}yasakla @kullanıcı sebep\``)
      .addField("Yasak Kaldır", `Kullanım: \`${prefix}yasak-kaldır ID\``)
      .addField("Sustur", `Kullanım: \`${prefix}sustur @kullanıcı sebep\``)
      .addField("Sustur Aç", `Kullanım: \`${prefix}sustur-aç @kullanıcı\``)
      .addField("Süreli Sustur", `Kullanım: \`${prefix}sürelisustur @kullanıcı 1m\``)
      .addField("At", `Kullanım: \`${prefix}at @kullanıcı sebep\``)
      .addField("Küfür Engel", `Kullanım: \`${prefix}küfür-engel aç/kapat sunucu/kanal\``)
      .addField("Link Engel", `Kullanım: \`${prefix}link-engel aç/kapat sunucu/kanal\``)
      .addField("Caps Engel", `Kullanım: \`${prefix}caps-engel aç/kapat sunucu/kanal\``)
      .addField("Yavaş Mod", `Kullanım: \`${prefix}yavaş-mod 0/20\``)
      .addField("Sil", `Kullanım: \`${prefix}sil 0/100\``)
      .addField("Kayıt Kanalı (Log)", `Kullanım: \`${prefix}kayıt-kanalı #kanal/kapat\``)
      .addField("Giriş Çıkış", `Kullanım: \`${prefix}giriş-çıkış aç #kanal/kapat\``)
      .addField("Otorol", `Kullanım: \`${prefix}otorol ayarla @rol/sıfırla\``)
      .addField("Seviye Sistemi", `Kullanım: \`${prefix}seviye-sistemi aç/kapat\``)
      .setColor(ayarlar.renk);
  
  /////////////////////////////////////
  
  const müzik = new Discord.RichEmbed()
      .setDescription(
        "**Müzik Komutlarım**"
      )
      .addField("Çal", `Kullanım: \`${prefix}çal müzik ismi\``)
      .addField("Ara", `Kullanım: \`${prefix}ara müzik ismi\``)
      .addField("Ayrıl", `Kullanım: \`${prefix}ayrıl\``)
      .addField("Geç", `Kullanım: \`${prefix}geç\``)
      .addField("Ses", `Kullanım: \`${prefix}ses [1/100]\``)
      .addField("Durdur", `Kullanım: \`${prefix}durdur\``)
      .addField("Devam", `Kullanım: \`${prefix}devam\``)
      .addField("Çalan", `Kullanım: \`${prefix}çalan\``)
      .addField("Sıra", `Kullanım: \`${prefix}sıra\``)
      .addField("Tekrar", `Kullanım: \`${prefix}tekrar\``)
      .addField("Radyo", `Kullanım: \`${prefix}radyo\``)
      .addField("Lyrics", `Kullanım: \`${prefix}şarkısözü\``)
      .setColor(ayarlar.renk);
  
  /////////////////////////////////////
  
  const eğlence = new Discord.RichEmbed()
      .setDescription(
        "**Eğlence Komutlarım**"
      )
      .addField("Anime", `Kullanım: \`${prefix}anime\``)
      .addField("Sarıl", `Kullanım: \`${prefix}sarıl @kullanıcı\``)
      .addField("Vur", `Kullanım: \`${prefix}vur @kullanıcı\``)
      .addField("Dürt", `Kullanım: \`${prefix}dürt @kullanıcı\``)
      .addField("Öp", `Kullanım: \`${prefix}öp @kullanıcı\``)
      .addField("Kanna", `Kullanım: \`${prefix}kanna yazı\``)
      .addField("Fal", `Kullanım: \`${prefix}fal\``)
      .addField("Yazdır", `Kullanım: \`${prefix}yazdır <mesaj>\``)
      .addField("Yazı Tura", `Kullanım: \`${prefix}yazı-tura\``)
      .addField("Triggered", `Kullanım: \`${prefix}triggered\``)
      .addField("Anime Avatar", `Kullanım: \`${prefix}anime-avatar\``)
      .setColor(ayarlar.renk);
      
  /////////////////////////////////////
  
  const diğer = new Discord.RichEmbed()
      .setDescription(
        "**Kullanıcı Komutlarım**"
      )
      .addField("Afk", `Kullanım: \`${prefix}afk sebep\``)
      .addField("Avatar", `Kullanım: \`${prefix}avatar\``)
      .addField("Hava Durumu", `Kullanım: \`${prefix}havadurumu şehir\``)
      .addField("Profil", `Kullanım: \`${prefix}profil\``)
      .addField("[Profil] Açıklama",`Kullanım: \`${prefix}açıklama Cocoa en iyi bot.\``)
      .addField("Kredi", `Kullanım: \`${prefix}kredi\``)
      .addField("Beğen", `Kullanım: \`${prefix}beğen @kullanıcı\``)
      .setColor(ayarlar.renk);
      
  /////////////////////////////////////
  
  const ayar = new Discord.RichEmbed()
      .setDescription(
        "**Ayar Komutlarım**"
      )
      .addField("Çalışmakanal", `Kullanım: \`${prefix}çalışmakanal #kanal\``)
      .addField("Çalıştır", `Kullanım: \`${prefix}çalıştır #kanal\``)
      .addField("Prefix", `Kullanım: \`${prefix}prefix l!\``)
      .addField("İstatistik", `Kullanım: \`${prefix}istatistik\``)
      .addField("Bildirim", `Kullanım: \`${prefix}bildirim\``)
      .addField("Güncelleme Notu", `Kullanım: \`${prefix}güncelleme-notu\``)
      .setColor(ayarlar.renk);
  
  /////////////////////////////////////
  
  const mesaj = new Discord.RichEmbed()
      .setDescription(
        `Linkler
\n\n[Web Site](https://cocoa-bot-tr.glitch.me)
\n~~[Destek Sunucumuz]~~
\n[Oy Ver](https://top.gg/bot/683098088965275675/vote)`
      )
      .setColor(ayarlar.renk);
  
  //await client.users.get(`${msg.author.id}`).send({file: new Discord.Attachment(await createCanvas(), 'profil.png')})
  await client.users.get(`${msg.author.id}`).send(yetkili);
  await client.users.get(`${msg.author.id}`).send(müzik);
  await client.users.get(`${msg.author.id}`).send(eğlence);
  await client.users.get(`${msg.author.id}`).send(diğer);
  await client.users.get(`${msg.author.id}`).send(ayar);
  await client.users.get(`${msg.author.id}`).send(mesaj);
  await client.users.get(`${msg.author.id}`).send(`${client.user.username}'nın sunucunuzda daha hızlı çalışmasınız istiyorsanız lütfen sunucu bölgesini :flag_eu: Europe olarak ayarlayınız!`)
    
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "bot",
  oysistem: false
};

exports.help = {
  name: 'yardım',
  description: 'Yardım listesini gösterir.',
  usage: `${ayarlar.prefix}yardım`
};

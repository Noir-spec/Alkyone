const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../../ayarlar.json');

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
      .addField("ban", `Kullanım: \`${prefix}ban @kullanıcı sebep\``)
      .addField("mute", `Kullanım: \`${prefix}mute @kullanıcı sebep\``)
      .addField("unmute", `Kullanım: \`${prefix}unmute @kullanıcı\``)
      .addField("kick", `Kullanım: \`${prefix}kick @kullanıcı sebep\``) 
      .addField("clear", `Kullanım: \`${prefix}clear 0/100\``)
      .addField("Kayıt Kanalı (Log)", `Kullanım: \`${prefix}log #kanal/kapat\``)
      .addField("Giriş Çıkış", `Kullanım: \`${prefix}giriş-çıkış aç #kanal/kapat\``) (hazır değil) 
      .addField("Otorol", `Kullanım: \`${prefix}otorol ayarla @rol/sıfırla\``) (hazır değil) 
      .setColor(ayarlar.renk);
  
  /////////////////////////////////////
  
  const müzik = new Discord.RichEmbed()
      .setDescription(
        "**Müzik Komutlarım**"
      )
      .addField("play", `Kullanım: \`${prefix}play müzik ismi\``)
      .addField("search", `Kullanım: \`${prefix}search müzik ismi\``)
      .addField("leave", `Kullanım: \`${prefix}leave\``) (eklenmedi) 
      .addField("skip", `Kullanım: \`${prefix}skip\``)
      .addField("volume", `Kullanım: \`${prefix}volume [1/100]\``)
      .addField("pause", `Kullanım: \`${prefix}pause\``)
      .addField("resume", `Kullanım: \`${prefix}resume\``)
      .addField("np", `Kullanım: \`${prefix}np\``)
      .addField("queue", `Kullanım: \`${prefix}queue\``)
      .addField("loop", `Kullanım: \`${prefix}loop\``)
      .setColor(ayarlar.renk);
  
  /////////////////////////////////////
  
  const eğlence = new Discord.RichEmbed()
      .setDescription(
        "**Eğlence Komutlarım**"
      )
      .addField("server-icon", `Kullanım: \`${prefix}server-icon\``)
      .addField("afk", `Kullanım: \`${prefix}afk\``)
      .addField("Yazı Tura", `Kullanım: \`${prefix}yazı-tura\``)
      .addField("Avatar", `Kullanım: \`${prefix}avatar\``)
      .setColor(ayarlar.renk);
      
  /////////////////////////////////////
  
  const diğer = new Discord.RichEmbed()
      .setDescription(
        "**Warframe Komutlarım**"
      )
      .addField("w-cetus", `Kullanım: \`${prefix}w-cetus\``)
      .addField("w-arbit", `Kullanım: \`${prefix}w-arbit\``)
      .addField("w-rfbuild", `Kullanım: \`${prefix}w-rfbuild\``)
      .setColor(ayarlar.renk);
      
  /////////////////////////////////////
eklenenlerin listesi
  
  /////////////////////////////////////
  
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

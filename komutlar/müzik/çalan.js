const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core')
const ayarlar = require('../../ayarlar.json');
const youtube = new YouTube(ayarlar.API);

exports.run = async(client, msg, args) => {
let searchString = args.slice(0).join(' ');
let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
let serverQueue = client.queue.get(msg.guild.id);

const voiceChannel = msg.member.voiceChannel
    if (!voiceChannel) return msg.channel.send( "<:no:642658047390384128> **| İlk olarak sesli bir kanala giriş yapmanız gerek.**");
    if (!serverQueue) return msg.channel.send("<:no:642658047390384128> **| Hiç Bir Müzik Çalmamakta**");
   
  let zaman = await db.fetch(`surecik.${msg.guild.id}`)
let neblm = moment.duration(new Date().getTime() - zaman).format("HH:mm:ss")
if (!neblm.includes(':')) neblm = '0:'+moment.duration(new Date().getTime() - zaman).format("HH:mm:ss")
let barProg = moment.duration(new Date().getTime() - zaman).format("s")
let hours = serverQueue.songs[0].durationh == 0 ? 0 : serverQueue.songs[0].durationh*3600
let minutes = serverQueue.songs[0].durationm == 0 ? 0 : serverQueue.songs[0].durationm*60
let seconds = serverQueue.songs[0].durations
let rTime = hours + minutes + seconds
let bar = new Array('───────────────────'.length).fill('─')
let prog = barProg/rTime*100
for (var i = 20; i >= 0; i--) {
  bar = new Array('───────────────────'.length).fill('─')
  if (Math.round(prog) >= i*5) {
    bar[i-1] = '🔘'
    break;
  }
}
  
  let uhuu = moment.duration(rTime*1000).format("HH:mm:ss")
  if (!uhuu.includes(':')) uhuu = '0:'+moment.duration(rTime*1000).format("HH:mm:ss")
  
  return msg.channel.send(new Discord.RichEmbed()
    .setColor(ayarlar.renk)
    .setAuthor('Şuan Oynatılıyor', `https://images-ext-1.discordapp.net/external/0O8M-0Q93aKVqx6tonQInp6W7QRDjlLkH1E6mHMaCeM/%3Fv%3D1/https/cdn.discordapp.com/emojis/475822981277286400.gif`, 'https://discordapp.com/oauth2/authorize?client_id='+client.user.id+'&scope=bot&permissions=-1')
    .setThumbnail(serverQueue.songs[0].thumbnail)
    .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n**[** ${neblm} **/** ${uhuu} **]**\n\`\`\`[${bar.includes('🔘') ? bar.join("") : '🔘──────────────────'}]\`\`\`\nİsteyen **>** <@${serverQueue.songs[0].kullanıcı}>`))
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['çalınan',"np"], 
  permLevel: 0 
};

exports.help = {
  name: 'çalan', 
  description: 'Çalan şarkıyı gösterir.', 
  usage: `${ayarlar.prefix}çalan`
};
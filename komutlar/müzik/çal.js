const Discord = require('discord.js');
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core')
const ayarlar = require('../../ayarlar.json');
const bot = require("../../bot.js");
const fetchVideoInfo = require("youtube-info");
const superagent = require("superagent");
const youtube = new YouTube(ayarlar.API);

exports.run = async(client, msg, args) => {
let searchString = args.slice(0).join(' ');
let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
let serverQueue = client.queue.get(msg.guild.id);

    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        "<:no:642658047390384128> | İlk olarak sesli bir kanala giriş yapmanız gerek!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "<:no:642658047390384128> | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "<:no:642658047390384128> | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız!"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
    } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 5);
            let index = 0;
            var video = await youtube.getVideoByID(videos[0].id);
           await msg.channel.send(`<a:loading:647351420776873984> \`${searchString || ''}\` aranıyor...`).then(msg => msg.delete(5000));
          } catch (err) {
          if(err.message === "Cannot read property 'id' of undefined") return msg.channel.send( "<:no:642658047390384128> | Herhangi bir arama sonucu elde edemedim.")
          if(err.message === "Bad Request") { msg.channel.send('Youtube Api key geçersiz api key değiştiriliyor').then(msg => msg.delete(10000)); await process.exit(0) }
          if(err.message === `The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>`) { msg.channel.send('Youtube Api key geçersiz api key değiştiriliyor').then(msg => msg.delete(10000)); await process.exit(0) }
            else if(err) return msg.channel.send(`Bir hata oluştu: ${err.message}`).then(msg => msg.delete(10000));
            console.error(err);
       /*     return msg.channel.send(
              "**<:no:642658047390384128> | Herhangi bir arama sonucu elde edemedim.**"
            );*/
            
          }
        }
        return handleVideo(video, msg, voiceChannel);
      }
  }
 
                  
////////////////////////////////////////////////////////////////////////  
async function handleVideo(video, msg, voiceChannel, playlist = false) {
        const serverQueue = client.queue.get(msg.guild.id);
        console.log(video);
        const song = {
                id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    eyad: `${video.thumbnails.high.url}`,
    best: `${video.channel.title}`,
    bees: `${video.raw.snippet.publishedAt}`,
    shahd: `${video.raw.kind}`,
    zg: `${video.raw.snippet.channelId}`,
    views: `${video.raw.views}`,
    like: `${video.raw.likeCount}`,
    dislike: `${video.raw.dislikeCount}`,
    hi: `${video.raw.id}`,
    kullanıcı: `${msg.author.id}`
        };
        if (!serverQueue) {
                const queueConstruct = {
                        textChannel: msg.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 30,
                        playing: true,
                        loop: true
                };
                client.queue.set(msg.guild.id, queueConstruct);
 
                queueConstruct.songs.push(song);
 
                try {
                        var connection = await voiceChannel.join();
                         msg.guild.me.setDeaf(true)
                        queueConstruct.connection = connection;
                        play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                        console.error(` **Şarkı başlatılamadı. Hata Nedeni: ${error}`);
                  msg.channel.send("<:no:642658047390384128> | **Müziği oynatırken hata oluştu!**").then(msg => msg.delete(10000))
      client.queue.delete(msg.guild.id);
      return  
                  
                    msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setDescription(
            `<:no:642658047390384128> Şarkı başlatılamadı. Hata Nedeni: \`${error}\` \nLütfen Tekrar Deneyiniz.`
          )
          .setColor(ayarlar.renk)
      ).then(msg => msg.delete(10000));
                }
          
        } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
          //return 
         
            serverQueue.textChannel.send(
      `<:yessss:642657995272093706> |  \`${song.title}\` adlı müzik başarıyla kuyruğa eklendi!`
    );
        }
 
        return undefined;
}
 
function play(guild, song) {
  setInterval(() => {
var sayı = serverQueue.voiceChannel.members.size

if(sayı === 1 && serverQueue.voiceChannel.members.has(client.user.id)) {
  serverQueue.voiceChannel.leave()
  serverQueue.textChannel.send("⚠️ | Tüm üyeler kanaldan ayrıldı. Oynatma listesi temizlendi").then(msg => msg.delete(30000))
client.queue.delete(msg.guild.id)
}
  
}, 10000)
    const serverQueue = client.queue.get(guild.id);
    if (!song) {
      db.delete(`tekrar.tek.${guild.id}`)
      db.delete(`tekrar.hepsi.${guild.id}`)
           serverQueue.voiceChannel.leave();
           client.queue.delete(guild.id);
           return;
          }
       // console.log(serverQueue.songs);
  
 if(serverQueue.end) return
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                        if (reason === 'Akış yeterince hızlı değil.') console.log('Şarkı Durduruldu.');
                        else console.log(reason);
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 50);
  
  db.set(`surecik.${guild.id}`, new Date().getTime())
  fetchVideoInfo(`${song.hi}`, function(err, ssss) {
  /*serverQueue.textChannel.send({
      embed: new Discord.RichEmbed()
        .setTitle(`**${song.title}**`)
        .setURL(song.url)
        .addField(
          "Video Süresi:",
          `${song.durationh}:${song.durationm}:${song.durations}`,
          true
        )
        .addField(
          "Kanal İsmi:",
          `[${song.best}](https://www.youtube.com/channel/${song.zg})`,
          true
        )
        //.addField("Kanal Linki:", `[${song.best}](https://www.youtube.com/channel/${song.zg})`, true)
        //.addField("Video Yüklenme Tarihi:", `${ssss.datePublished}`)
        .addField("Görüntülemeler:", `${ssss.views}`)
        .addField("Beğeniler👍:", `${ssss.likeCount}`)
        .addField("Beğenmeyenler👎:", `${ssss.dislikeCount}`)
        .addField("Yorumlar:", `${ssss.commentCount}`)
        .addField("İsteyen:", `<@${song.kullanıcı}>`)
        .setImage(
          `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
        )
        .setThumbnail("https://i.postimg.cc/kghbkMWz/ytohbot.gif")
        .setColor(ayarlar.renk)
        .setFooter(
          `${client.user.username} Müzik Sistemi`,
          client.user.avatarURL
        )
        .setTimestamp()
    });*/
    serverQueue.textChannel.send(`<a:NeptuneNota:656983932184821760> | \`${song.title}\` adlı müzik şu an oynatılıyor.`)
  })
    
};


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["play"], 
  permLevel: 0 
};

exports.help = {
  name: 'çal', 
  description: 'İsmini yazdığınız şarkıyı ve ya linkini yazdığınız şarkıyı oynatır.', 
  usage: `${ayarlar.prefix}çal ` 
};
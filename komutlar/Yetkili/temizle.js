exports.run = async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("Yetkin yok.").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Şey.... Acaba numara girmeyi mi unuttunuz? 0 mesajı silmem mümkün değilde...").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Üzgünüm... Messajları silemiyorum. ;-;").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`\`${deleted.size}\` kadar mesajı başarıyla imha ettim.`))
            .catch(err => message.reply(`Nedenini bilmediğim bir şekilde hata verdi. \n Hata: ${err}`));
    };
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['temizle', 'sil', 'clear'],
  permLevel: 0
};

exports.help = {
  name: 'temizle',
};

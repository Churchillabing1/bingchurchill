const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "slap",
    version: "1.1",
    role: 0,
    hasPrefix: true,
    aliases: [],
    description: "Buttslap image",
    usage: "buttslap @tag",
    credits: "KSHITIZ",
  },

  langs: {
    vi: {
      noTag: ""
    },
    en: {
      noTag: "You must tag the person you want to slap"
    }
  },

  run: async function({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];

    if (!uid2) {
      return message.reply(getLang("noTag"));
    }

    const avatarURL1 = await usersData.getAvatarUrl(uid1);
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Spank().getImage(avatarURL1, avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid1}_${uid2}spank.png`;
    
    fs.writeFileSync(pathSave, Buffer.from(img));

    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");

    message.reply({
      body: `${content || "hehe boii"}`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};

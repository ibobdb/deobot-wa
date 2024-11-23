const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
  authStrategy: new LocalAuth()
})
client.once('ready', () => {
  console.log('Client is ready');
  query()
})
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
})
client.on('message', msg => {
  console.log(msg.body);
})

client.initialize();

const sendMessage = async (data) => {

  const state = await client.getState();
  // if (data.label == null || data.to == null || data.body == null) {
  //   throw new Error('Something went wrong');
  // }
  if (state == "PAIRING" || state == undefined || state == null) {
    return {
      msg: "Masih menghubungkan, coba lagi dalam beberapa saat..."
    }
  }
  console.log(data);
  const validate = await validateMessage(data)
  try {

    await client.sendMessage(validate.to, validate.body);
    return {
      msg: 'Pesan terkirim'
    }
  } catch (error) {
    console.log(error);
  }
}
const validateMessage = async (data) => {
  //// data 
  // "label":"Notifikasi grafana", Nama dari pesan
  // "to":"6282169072681" || "Grup Testing 1" Nomor atau grup tujuan
  // "isGroup":false, Jika grup true, maka berikan kode @g.us jika tidak @c.us
  // "body":"Isi dari pesan",

  return new Promise(async (resolve, reject) => {
    if (data.label == null || data.to == null || data.body == null) { return reject }

    if (data.isGroup) {
      const isGroup = await validateGroup(data.to)
      if (!isGroup.status) { reject }
      data.to = isGroup.id + "@g.us"
    } else {
      const check = data.to.toString();
      if (check.startsWith("0")) {
        data.to = data.to.replace("0", "62");
      }
      data.to = data.to + "@c.us"
    }
    resolve(data)
  })
}

const validateGroup = async (label) => {
  return new Promise(async (resolve, reject) => {
    const chats = await client.getChats();
    const chat = chats.find(chat => chat.name === label);
    if (chat != null || chat != undefined) {
      resolve({
        // label: group.label,
        id: chat.id.user,
        status: true
      })
    }
    resolve({ msg: 'Tidak ditemukan', status: false })
  })
}
module.exports = { sendMessage }
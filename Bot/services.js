const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const initialize = () => {
  return new Promise(async (resolve, reject) => {
    let status = false;
    const client = new Client({
      authStrategy: new LocalAuth()
    })
    client.once('ready', () => {
      console.log('Client is ready');
      status = true
    })
    client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    })
    // client.on('disconnected',(dc)=>{
    //   reject(client)
    // })
    await client.initialize();
    return resolve(client)
  })
}
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

const sendMessage = async () => {
  const chats = await client.getChats(); // Ambil semua chat
  const groupChats = chats.filter(chat => chat.isGroup);
  console.log(groupChats);



  const state = await client.getState();
  if (state == "CONNECTED") {
    // await client.sendMessage('6282169072681@c.us', 'HHHasHH');
    const chats = await client.getChats(); // Ambil semua chat
    const groupChats = chats.filter(chat => chat.isGroup);
    console.log(chats);
    return {
      msg: 'Pesan berhasil dikirim'
    }
  } else if (state == "PAIRING") {
    return {
      msg: "Masih menghubungkan, coba lagi dalam beberapa saat..."
    }
  } else {
    return {
      msg: "Masih menghubungkan, coba lagi dalam beberapa saat..."
    }
  }
}
module.exports = { sendMessage }
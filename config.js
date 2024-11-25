const mongoose = require('mongoose');
const conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log('DB Connected');
    });
  } catch (err) {
    console.log(`Failed to Connect ${err}`)
  }
}
module.exports = conn
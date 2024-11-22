const mongoose = require('mongoose');
const conn = async () => {
  try {
    await mongoose.connect('mongodb+srv://ibobdb:ibobdb@cluster0.ivxav.mongodb.net/deobot?retryWrites=true&w=majority&appName=Cluster0').then(() => {
      console.log('DB Connected');
    });
  } catch (err) {
    console.log(`Failed to Connect ${err}`)
  }
}
module.exports = conn
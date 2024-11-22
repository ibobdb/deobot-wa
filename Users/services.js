const { UserModel } = require('./schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// create user
const CreateUser = async (data) => {
  const { name, email, password } = data;
  console.log(name);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      bot_token: ''
    });

    const saveUser = await user.save();
    const bot_token = jwt.sign({ userId: saveUser._id, email: saveUser.email },
      process.env.JWT_SECRET,
    );
    const res = await UserModel.updateOne({
      _id: saveUser._id
    }, { $set: { bot_token: bot_token } });
    return {
      msg: 'User berhasil dibuat'
    }
  } catch (err) {
    return {
      msg: 'User berhasil dibuat'
    }
    return err
  }
}
// login
const Login = async (data) => {
  try {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        status: false,
        msg: 'user tidak terdaftar'
      }
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
      return {
        status: false,
        msg: 'password salah'
      }
    }

    const token = jwt.sign({ userId: user._id, email: user.email },
      process.env.JWT_SECRET, { expiresIn: '1h' }
    );

    return {
      status: true,
      msg: 'Login Berhasil',
      token: token,
      bot_token: user.bot_token
    }
  } catch (error) {
    return {
      statu: false,
      msg: error
    }
  }
}
module.exports = { CreateUser, Login }
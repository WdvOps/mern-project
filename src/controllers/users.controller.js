const User = require("../models/user.model");

module.exports = {
  async index(req, res) {
    res.json({ message: "coming from the users controller " });
  },
  async create(req, res) {
    const {
      user_name,
      user_email,
      user_phone_number,
      user_password,
      user_address,
    } = req.body;

    let data = {};

    let users = await User.findOne({ user_email });
    if (!users) {
      data = {
        user_name,
        user_email,
        user_phone_number,
        user_password,
        user_address,
      };
      users = await User.create(data);

      return res.status(400).json(users);
    } else {
      return res.status(200).json(users);
    }
  },
};

const User = require("../models/user.model");

module.exports = {
  async index(req, res) {
    const user = await User.find();
    res.json(user);
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

    let user = await User.findOne({ user_email });
    if (!user) {
      data = {
        user_name,
        user_email,
        user_phone_number,
        user_password,
        user_address,
      };
      user = await User.create(data);

      return res.status(200).json(user);
    } else {
      return res.status(500).json(user);
    }
  },

  async details(req, res) {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    res.json(user);
  },

  async delete(req, res) {
    const { _id } = req.params;
    const user = await User.findByIdAndDelete({ _id });
    res.json(user);
  },
};
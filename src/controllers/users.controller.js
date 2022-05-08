const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const { response } = require("express");
const secret = "secretKey";

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
      password_confirm,
      user_type,
    } = req.body;

    let data = {};

    let user = await User.findOne({ user_email });
    if (!user) {
      data = {
        user_name,
        user_email,
        user_phone_number,
        user_password,
        password_confirm,
        user_type,
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

  async update(req, res) {
    const {
      _id,
      user_name,
      user_email,
      user_phone_number,
      user_password,
      password_confirm,
      user_type,
    } = req.body;

    const data = {
      user_name,
      user_email,
      user_phone_number,
      user_password,
      password_confirm,
      user_type,
    };

    const user = await User.findOneAndUpdate({ _id }, data, { new: true });

    res.json(user);
  },

  async login(req, res) {
    const { email, password } = req.body;
    User.findOne(
      {
        user_email: email,
        user_type: 1,
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ erro: "Erro no servidor. Por favor, tente novamente" });
        } else if (!user) {
          res.status(200).json({
            status: 2,
            error: "E-mail não encontrado no banco de dados",
          });
        } else {
          user.isCorrectPassword(password, async function (err, same) {
            if (err) {
              res.status(200).json({
                error: "Erro no servidor. Por favor, tente novamente",
              });
            } else if (!same) {
              res.status(200).json({ status: 2, error: "A senha não confere" });
            } else {
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: "24h",
              });
              res.cookie("token", token, { httpOnly: true });
              res.status(200).json({
                status: 1,
                auth: true,
                token: token,
                id_client: user._id,
                user_name: user.user_name,
              });
            }
          });
        }
      }
    );
  },

  async checkToken(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.cookies.token ||
      req.headers["x-acces-token"];
    req.token = token;
    if (!token) {
      res.json({ status: 401, msg: "Não autorizado: Token inexistente!" });
    } else {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.json({ status: 401, msg: "Não autorizado: Token inválido!" });
        } else {
          res.json({ status: 200 });
        }
      });
    }
  },
  async destroyToken(req, res) {
    const token = req.headers.token;
    if (token) {
      res.cookie("token", null, { httpOnly: true });
    } else {
      res.status(401).send("Logout não autorizado!");
    }
    res.send("Sessão finalizada com sucesso!");
  },
};

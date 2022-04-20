const Visit = require("../models/visit.model");

module.exports = {
  async index(req, res) {
    const visit = await Visit.find();
    res.json(visit);
  },
  async create(req, res) {
    const { visit_type, visit_address, visit_data, visit_description } =
      req.body;

    let data = {};

    let visit = await Visit.findOne({ visit_type });
    if (!visit) {
      data = {
        visit_type,
        visit_address,
        visit_data,
        visit_description,
      };
      visit = await Visit.create(data);

      return res.status(200).json(visit);
    } else {
      return res.status(500).json(visit);
    }
  },

  async details(req, res) {
    const { _id } = req.params;
    const visit = await Visit.findOne({ _id });

    res.json(visit);
  },

  async delete(req, res) {
    const { _id } = req.params;
    const visit = await Visit.findByIdAndDelete({ _id });
    res.json(visit);
  },

  async update(req, res) {
    const { _id, visit_type, visit_address, visit_data, visit_description } =
      req.body;

    const data = {
      visit_type,
      visit_address,
      visit_data,
      visit_description,
    };

    const visit = await Visit.findOneAndUpdate({ _id }, data, { new: true });

    res.json(visit);
  },
};

const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    visit_type: String,
    visit_address: String,
    visit_data: String,
    visit_description: String,
  },
  {
    timestamps: true,
  }
);

const visit = mongoose.model("Visit", DataSchema);
module.exports = visit;

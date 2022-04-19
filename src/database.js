const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("MongoDB CONNECTION SUCCSSES"));
};

module.exports = connectToDatabase;

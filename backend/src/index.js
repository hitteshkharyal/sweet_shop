const path = require("path");

require("dotenv").config({
  path: process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "../.env.test")
    : path.resolve(__dirname, "../.env")
});

const mongoose = require("mongoose");
const app = require("./server");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

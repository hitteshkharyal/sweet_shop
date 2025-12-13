require("dotenv").config();
const app = require("./server");
const connectDB = require("./db");

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

const PORT = process.env.b_port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

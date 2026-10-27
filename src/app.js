const express = require("express");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicine.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

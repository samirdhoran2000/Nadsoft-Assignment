const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require('./routes/markRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);
app.use('/api', markRoutes); 


sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err));

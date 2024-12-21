const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require('./routes/markRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);
app.use('/api', markRoutes); 


sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.log(err));

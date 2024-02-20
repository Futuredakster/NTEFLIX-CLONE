const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const db = require("./models");

const userRouter = require("./routes/users");
app.use("/users", userRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });
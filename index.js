const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRoutes = require("./routes/tools.route");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./utils/dbConnect");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

dbConnection.connectToServer();

// app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  res.send("Sopnomoy Server");
});

app.all("*", (req, res) => {
  res.send("NO route found.");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

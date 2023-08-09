const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRoutes = require("./routes/tools.route");
const userRoute = require("./routes/user.route");
const chatRoute = require("./routes/chat.route");
const blogRoute = require("./routes/blog.route");
const jobblogRoute = require("./routes/jobBox.route");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./utils/dbConnect");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.static("public"));

dbConnection.connectToServer();

app.use("/api/v1/tools", toolsRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/job", jobblogRoute);

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

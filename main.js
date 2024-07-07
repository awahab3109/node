const express = require("express");
const app = express();
const Connection = require("./db");
const authRoute = require("./routes/route");
const bodyParser = require("body-parser")

const PORT = 8000;

Connection();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", authRoute); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
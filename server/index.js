const express = require("express");
const shortestPathRoute = require("./api/shortest-path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/shortest-path", shortestPathRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

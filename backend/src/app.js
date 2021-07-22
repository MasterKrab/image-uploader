const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/", require("./router/images"));

app.listen(port, () => {
  console.log("Server working", port);
});
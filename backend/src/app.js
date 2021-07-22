const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

// Cors
const cors = require("cors");

const corsConfig = {
  origin: "https://image-uploader-orcin.vercel.app",
};

app.use(cors(corsConfig));

// Routes
app.use("/", require("./router/images"));

app.get("/", (req, res) => {
  res.status(404).json({
    state: false,
    message: "Not found",
  });
});

app.listen(port, () => {
  console.log("Server working", port);
});

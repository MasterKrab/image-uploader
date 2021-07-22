const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

// Cors
const cors = require("cors");

const corsConfig = {
  origin: "https://image-uploader-orcin.vercel.app",
  // origin: "http://localhost:5000",
};

app.use(cors(corsConfig));

// Routes
app.use("/", require("./router/images"));

app.get("/", (req, res) => {
  res.json({
    state: true,
    message: "test",
  });
});

app.listen(port, () => {
  console.log("Server working", port);
});

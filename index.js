const http = require("http");
const express = require("express");
const dox = require("node-ipdox");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const IpDox = new dox.IPDox({
  cacheMaxItems: 5000,
  cacheMaxAge: 43200000,
  maxRetries: 10,
});
app.get("/", (req, res) => {
  res.status(200).json("Server Running");
});
app.get("/reqLoc", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const result = await IpDox.doxIP({ ip });
    return res.status(200).json({
      success: true,
      ip,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      ip,
    });
  }
});


server.listen(8001,()=>{
    console.log("Server started on port 3000")
})
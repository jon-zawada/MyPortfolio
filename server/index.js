const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();
const HTTP_PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

const clientBuild = path.join(__dirname, "..", "chester", "build");

// SSL Certificate Configuration
const privateKey = fs.readFileSync(path.join(__dirname, "..", "privatekey.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "..", "certificate.pem"), "utf8");
const ca = fs.readFileSync(path.join(__dirname, "..", "csr.pem"), "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use((req, res, next) => {
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    next();
  } else {
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.use(express.static(clientBuild));

app.get("/alive", (req, res) => {
  res.send("Server is alive!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuild, "index.html"));
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Portfolio listening on ${HTTP_PORT} ---> mapped to 80`);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Portfolio listening on port ${HTTPS_PORT} ---> mapped to 443`);
});

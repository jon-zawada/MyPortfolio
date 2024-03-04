const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

const clientBuild = path.join(__dirname, "..", "chester", "build");

app.use(express.static(clientBuild));

app.get('/alive', (req, res) => {
  res.send('Server is alive!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio listening on port ${PORT}`);
});

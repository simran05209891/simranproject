const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ ok: true, message: "Hello from server" });
});

// /get?file=info.txt  → serve file
app.get('/get', (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).send("file query param required");

  const safe = path.basename(file);
  const filePath = path.join(__dirname, "public", safe);

  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  res.sendFile(filePath);
});

// fallback route for everything else
app.use((req, res) => {
  const index = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(index)) {
    return res.sendFile(index);
  }
  res.status(404).send("Not found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});



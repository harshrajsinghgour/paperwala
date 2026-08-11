const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ... tere saare routes yaha ...

// VERCEL KE LIYE YE 2 LINE IMPORTANT
module.exports = app;

// app.listen(5000)  <- is line ko hata de ya comment kar de
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// YE ROUTE ADD KAR DE
app.get('/', (req, res) => {
  res.json({ message: "Paperwala API is live 🚀" });
});

app.get('/api/test', (req, res) => {
  res.json({ status: "ok" });
});

// ... tere saare routes yaha ...

module.exports = app;

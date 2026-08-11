const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// TEST ROUTES
app.get('/', (req, res) => {
  res.json({ message: "Paperwala API is live 🚀" });
});

app.get('/api/test', (req, res) => {
  res.json({ status: "ok" });
});

// ... tere saare routes yaha daal ...
// Example: app.post('/login', ...)
// Example: app.get('/users', ...)


// VERCEL KE LIYE YE LINE IMPORTANT
module.exports = app;

// app.listen(5000)  <- is line ko comment me hi rehne de

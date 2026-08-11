const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ... tere saare routes yaha ...

// VERCEL KE LIYE YE 2 LINE IMPORTANT
module.exports = app;

// app.listen(5000)  <- is line ko hata de ya comment kar de

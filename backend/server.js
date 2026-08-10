const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pool = require('./config/db'); // ✅ Postgres pool
const connectDB = require('./config/dbMongo'); // ✅ MongoDB - iska naam alag rakh lena

// Env
dotenv.config();

// DB Connect
connectDB(); // MongoDB connect

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // JSON data padhne ke liye

// Serve Static Admin Web Panel
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// 🚀 API Endpoint: OTP bhejne ke liye - Teri wali detail
app.post('/api/auth/send-otp', (req, res) => {
    const { mobileNumber } = req.body;

    // Check 10 digit
    if (!mobileNumber || mobileNumber.length !== 10) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid mobile number" 
        });
    }

    // Dummy OTP generate
    const mockOtp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

    console.log(`[BACKEND LOG] OTP ${mockOtp} generated for +91 ${mobileNumber}`);

    // Production me isko DB me save karna hai, frontend ko nahi bhejna
    res.status(200).json({
        success: true,
        message: "OTP sent successfully!",
    });
});

// All Integrated API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/extra', require('./routes/extraRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('🚀👑 Paper Wala Backend API Running on PORT 5000...');
});

// Server Start
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Paper Wala Backend active on http://localhost:${PORT}`);
});

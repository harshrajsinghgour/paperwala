const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); // ✅ connectDB ki jagah pool

// Env
dotenv.config();
// connectDB(); <-- YE LINE HATA DI

const app = express();
const PORT = process.env.PORT || 5000; // ✅ 443 ki jagah 5000 kar diya

// Middlewares
app.use(cors());
app.use(express.json()); // JSON डेटा पढ़ने के लिए

// 🚀 API Endpoint: OTP भेजने के लिए - Teri wali detail
app.post('/api/auth/send-otp', (req, res) => {
    const { mobileNumber } = req.body;

    // चेक करें कि नंबर 10 डिजिट का है या नहीं
    if (!mobileNumber || mobileNumber.length !== 10) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid mobile number" 
        });
    }

    // (यहाँ हम भविष्य में Twilio या MSG91 का कोड डालेंगे असली SMS भेजने के लिए)
    // अभी के लिए हम एक डमी OTP जनरेट कर रहे हैं
    const mockOtp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

    console.log(`[BACKEND LOG] OTP ${mockOtp} generated for +91 ${mobileNumber}`);

    // Frontend को रिस्पॉन्स भेजना
    res.status(200).json({
        success: true,
        message: "OTP sent successfully!",
        // mockOtp: mockOtp (Production में इसे frontend को वापस नहीं भेजते, डेटाबेस में सेव करते हैं)
    });
});

// All Integrated API Routes - Teri baaki routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/extra', require('./routes/extraRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Paper Wala Backend API Running on PORT 5000...'); // ✅ yaha bhi 5000
});

// सर्वर स्टार्ट करना
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀👑 Paper Wala Backend active on http://localhost:${PORT}`); // ✅ https ki jagah http
});

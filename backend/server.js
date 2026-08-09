const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // JSON डेटा पढ़ने के लिए

// 🚀 API Endpoint: OTP भेजने के लिए
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

// सर्वर स्टार्ट करना
app.listen(PORT, () => {
    console.log(`👑 Paper Wala Backend is running on http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Add this with existing routes
app.use('/api/extra', require('./routes/extraRoutes'));
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// All Integrated API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/extra', require('./routes/extraRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Paper Wala Backend API Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Paper Wala Backend active on port ${PORT}`);
});

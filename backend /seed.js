const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Test.deleteMany(); // पुराना टेस्ट डेटा क्लियर करने के लिए

    await Test.create({
      title: "SSC CGL Tier-1 Full Mock Test 01",
      category: "SSC CGL",
      durationMinutes: 60,
      totalMarks: 200,
      questions: [
        {
          questionText: "भारतीय संविधान का कौन सा अनुच्छेद राष्ट्रपति को क्षमादान की शक्ति प्रदान करता है?",
          options: ["अनुच्छेद 72", "अनुच्छेद 52", "अनुच्छेद 123", "अनुच्छेद 356"],
          correctOptionIndex: 0,
          explanation: "अनुच्छेद 72 के तहत राष्ट्रपति को क्षमादान की शक्ति प्राप्त है।"
        },
        {
          questionText: "यदि किसी संख्या का 40%, 80 है, तो वह संख्या क्या होगी?",
          options: ["150", "200", "250", "300"],
          correctOptionIndex: 1,
          explanation: "संख्या x = (80 * 100) / 40 = 200"
        }
      ]
    });

    console.log("Sample Mock Test Added Successfully!");
    process.exit();
  } catch (err) {
    console.error("Error Seeding Data:", err);
    process.exit(1);
  }
};

seedData();

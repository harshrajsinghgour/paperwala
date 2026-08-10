const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const makeUserAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found. Pehle Flutter app ya register API se user banayein.');
      process.exit(1);
    }

    user.isAdmin = true;
    user.isProUser = true;
    await user.save();

    console.log(` SUCCESS: ${user.name} (${user.email}) ko Admin bana diya gaya hai.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Apna Registered Email yahan likhein:
makeUserAdmin('YOUR_EMAIL_HERE@example.com');

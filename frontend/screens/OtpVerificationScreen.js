import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function OtpVerificationScreen({ navigation, route }) {
  // पिछले पेज से भेजा गया मोबाइल नंबर (अगर नहीं है तो डिफ़ॉल्ट दिखाएगा)
  const mobileNumber = route?.params?.mobileNumber || "9876543210"; 
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Resend OTP के लिए 30 सेकंड का टाइमर
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // अगले बॉक्स में ऑटो-फोकस
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // बैकस्पेस दबाने पर पिछले बॉक्स में फोकस जाए
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      alert("Please enter the complete 4-digit OTP.");
      return;
    }
    // यहाँ से सीधा मेन डैशबोर्ड पर भेजेंगे (जिसे हम आगे बनाएंगे)
    console.log("Verifying OTP:", enteredOtp);
    alert("Login Successful! Welcome to PaperWala 👑");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardView}
      >
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#DCA73E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify Details</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* Middle Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>OTP Verification</Text>
          <Text style={styles.subText}>
            Enter the 4-digit code sent to <Text style={styles.highlightText}>+91 {mobileNumber}</Text>
          </Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.otpBox, 
                  { borderColor: digit ? '#DCA73E' : '#334155' } // भरने पर बॉर्डर गोल्ड हो जाएगा
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => inputRefs.current[index] = ref}
              />
            ))}
          </View>

          {/* Resend Timer */}
          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend code in <Text style={styles.timerHighlight}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(30)}>
                <Text style={styles.resendText}>Resend OTP Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bottom Action Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={handleVerify}
            style={styles.buttonShadow}
          >
            <LinearGradient
              colors={['#DCA73E', '#D4AF37', '#B8860B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Verify & Enter App</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  keyboardView: { flex: 1, justifyContent: 'space-between' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#1E293B',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  formContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 25 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#DCA73E', marginBottom: 8 },
  subText: { fontSize: 16, color: '#94A3B8', marginBottom: 40, lineHeight: 24 },
  highlightText: { color: '#FFFFFF', fontWeight: 'bold' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  otpBox: {
    width: 65, height: 65, backgroundColor: '#1E293B',
    borderRadius: 16, borderWidth: 2,
    fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center',
  },
  timerContainer: { alignItems: 'center' },
  timerText: { color: '#94A3B8', fontSize: 16 },
  timerHighlight: { color: '#DCA73E', fontWeight: 'bold' },
  resendText: { color: '#DCA73E', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
  bottomContainer: { paddingHorizontal: 25, paddingBottom: 40 },
  buttonShadow: {
    shadowColor: '#DCA73E', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  button: { width: '100%', paddingVertical: 18, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#0B0F19', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
});
              

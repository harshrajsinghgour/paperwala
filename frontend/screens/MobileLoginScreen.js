import React, { useState } from 'react';
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

export default function MobileLoginScreen() {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOTP = () => {
    if(mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    // यहाँ से Backend को OTP भेजने की रिक्वेस्ट जाएगी
    console.log("Sending OTP to:", mobileNumber);
    alert(`OTP sent to +91 ${mobileNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardView}
      >
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color="#DCA73E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Secure Login</Text>
          <View style={{ width: 40 }} /> {/* Dummy view for center alignment */}
        </View>

        {/* Middle Form Section */}
        <View style={styles.formContainer}>
          
          {/* Added Brand Logo/Icon Section */}
          <View style={styles.logoContainer}>
             <View style={styles.iconCircle}>
               <FontAwesome5 name="newspaper" size={34} color="#0B0F19" />
             </View>
          </View>

          <Text style={styles.welcomeText}>Welcome to PaperWala 👑</Text>
          <Text style={styles.brandSubText}>Your Local Newspaper Delivery Partner</Text>
          <Text style={styles.subText}>Enter your mobile number to continue</Text>

          {/* Input Box */}
          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit number"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>
        </View>

        {/* Bottom Action Button & T&C */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={handleSendOTP}
            style={styles.buttonShadow}
          >
            <LinearGradient
              colors={['#DCA73E', '#D4AF37', '#B8860B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Send Verification OTP</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Added Terms & Conditions text */}
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.linkText}>Terms</Text> & <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19', // Deep Midnight Navy Theme
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logoContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#DCA73E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DCA73E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DCA73E', // Royal Gold
    marginBottom: 4,
  },
  brandSubText: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
    marginBottom: 25,
  },
  subText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B', // Card Background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: 'rgba(220, 167, 62, 0.1)', // Light gold tint
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  countryCodeText: {
    fontSize: 18,
    color: '#DCA73E',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  buttonShadow: {
    shadowColor: '#DCA73E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0B0F19', // Dark text on gold button
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  termsText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
  },
  linkText: {
    color: '#DCA73E',
    fontWeight: 'bold',
  },
});
    

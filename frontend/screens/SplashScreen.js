import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
  
  const handleGetStarted = () => {
    // यह बटन क्लिक करते ही यूजर को Mobile Login स्क्रीन पर भेज देगा
    navigation.navigate('MobileLogin');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C4079" />
      <LinearGradient
        colors={['#1C4079', '#132B52']} // Logo based Royal Blue Background
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.spacer} />

          {/* Center Content: Logo & Branding */}
          <View style={styles.centerContent}>
            
            {/* Logo: Book & Crown */}
            <View style={styles.logoCircle}>
              <Text style={styles.crown}>👑</Text>
              <FontAwesome5 name="book-open" size={54} color="#FFFFFF" />
            </View>
            
            {/* App Name */}
            <Text style={styles.appName}>
              Paper<Text style={styles.appHighlight}>Wala</Text>
            </Text>
            
            {/* Tagline */}
            <Text style={styles.tagline}>
              Your Ultimate Exam & Job Partner
            </Text>
          </View>

          {/* Bottom Action Button */}
          <View style={styles.bottomContent}>
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={handleGetStarted}
              style={styles.buttonShadow}
            >
              <LinearGradient
                colors={['#DCA73E', '#D4AF37', '#B8860B']} // Royal Gold Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  spacer: {
    flex: 0.5,
  },
  centerContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#DCA73E', // Royal Gold Border
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(220, 167, 62, 0.1)', 
    shadowColor: '#DCA73E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  crown: {
    fontSize: 36,
    position: 'absolute',
    top: -24, 
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 10,
  },
  appHighlight: {
    color: '#DCA73E', 
  },
  tagline: {
    fontSize: 18,
    color: '#E2E8F0',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  bottomContent: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 20,
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  buttonShadow: {
    shadowColor: '#DCA73E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
    

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// अपनी दोनों स्क्रीन्स को यहाँ इम्पोर्ट करें
import SplashScreen from './screens/SplashScreen';
import MobileLoginScreen from './screens/MobileLoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* headerShown: false करने से ऊपर का डिफ़ॉल्ट नेविगेशन बार छिप जाएगा */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* पहली स्क्रीन - Splash */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* दूसरी स्क्रीन - Mobile Login (जो कोड मैंने पिछले मैसेज में दिया था) */}
        <Stack.Screen name="MobileLogin" component={MobileLoginScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

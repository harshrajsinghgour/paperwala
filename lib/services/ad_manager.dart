import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_data_provider.dart';
import '../providers/auth_provider.dart';

class AdManager {
  static int _clickCounter = 0;

  // Check if Ads should be shown for the current user
  static bool shouldShowAds(BuildContext context) {
    final appConfig = Provider.of<AppDataProvider>(context, listen: false).appConfig;
    final user = Provider.of<AuthProvider>(context, listen: false).user;

    if (appConfig == null || !appConfig.isAdsEnabled) return false;
    
    // If user is Pro and "Disable Ads for Pro" is active
    if (user != null && user.isProUser && appConfig.disableAdsForPro) {
      return false;
    }

    return true;
  }

  // Trigger Interstitial Ad based on click frequency set from Admin Panel
  static void onUserAction(BuildContext context, VoidCallback onAdComplete) {
    if (!shouldShowAds(context)) {
      onAdComplete();
      return;
    }

    final appConfig = Provider.of<AppDataProvider>(context, listen: false).appConfig;
    _clickCounter++;

    if (_clickCounter >= (appConfig?.interstitialAdFrequency ?? 3)) {
      _clickCounter = 0;
      // Show Google AdMob Interstitial Ad here using appConfig.admobInterstitialId
      print("Showing Interstitial Ad (ID: ${appConfig?.admobInterstitialId})");
      onAdComplete();
    } else {
      onAdComplete();
    }
  }
}

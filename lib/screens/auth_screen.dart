import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'main_dashboard_screen.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool isOtpSent = false;
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Secure Login', style: TextStyle(color: AppTheme.royalGold))),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAlignment.start,
          children: [
            Text(
              isOtpSent ? 'Verify OTP Code' : 'Enter Your Mobile Number',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              isOtpSent ? 'Enter 6-digit OTP sent to your phone' : 'We will send a 6-digit code for verification',
              style: const TextStyle(color: AppTheme.textMuted, fontSize: 14),
            ),
            const SizedBox(height: 32),
            if (!isOtpSent) ...[
              TextField(
                controller: phoneController,
                keyboardType: TextInputType.phone,
                style: const TextStyle(color: AppTheme.textWhite),
                decoration: InputDecoration(
                  prefixText: '+91 ',
                  prefixStyle: const TextStyle(color: AppTheme.royalGold, fontWeight: FontWeight.bold),
                  hintText: 'Enter 10-digit Mobile Number',
                  hintStyle: const TextStyle(color: AppTheme.textMuted),
                  filled: true,
                  fillColor: AppTheme.cardBackground,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: const BorderSide(color: AppTheme.cardBorder),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.royalGold),
                  onPressed: () {
                    if (phoneController.text.isNotEmpty) {
                      setState(() => isOtpSent = true);
                    }
                  },
                  child: const Text('SEND VERIFICATION OTP', style: TextStyle(color: AppTheme.darkBackground, fontWeight: FontWeight.bold)),
                ),
              ),
            ] else ...[
              TextField(
                controller: otpController,
                keyboardType: TextInputType.number,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 20, letterSpacing: 8, color: AppTheme.royalGold),
                decoration: InputDecoration(
                  hintText: '000000',
                  hintStyle: const TextStyle(color: AppTheme.textMuted, letterSpacing: 8),
                  filled: true,
                  fillColor: AppTheme.cardBackground,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.royalGold),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => const MainDashboardScreen()),
                    );
                  },
                  child: const Text('VERIFY & ENTER APP', style: TextStyle(color: AppTheme.darkBackground, fontWeight: FontWeight.bold)),
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}

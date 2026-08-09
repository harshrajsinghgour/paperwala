import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GroupChatScreen extends StatelessWidget {
  const GroupChatScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Paper Wala Aspirants Hub', style: TextStyle(color: AppTheme.royalGold, fontSize: 18)),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: Center(child: Text('1,420 Online', style: TextStyle(color: AppTheme.accentGreen, fontSize: 12))),
          )
        ],
      ),
      body: Column(
        children: [
          // AI Safety Banner Notice
          Container(
            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            color: AppTheme.royalGold.withOpacity(0.15),
            child: Row(
              children: const [
                Icon(Icons.security, color: AppTheme.royalGold, size: 16),
                SizedBox(width: 8),
                Expanded(child: Text('AI Protected: Messages auto-delete after 24 hours. Keep discussions strictly educational.', style: TextStyle(fontSize: 10, color: AppTheme.textWhite))),
              ],
            ),
          ),

          // Message Feed
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildChatMessage('Admin (Harshraj)', 'Welcome to the official study group! Today\'s Daily Challenge is live now.', isAdmin: true),
                _buildChatMessage('Rahul_SSC', 'Can anyone explain Question #14 from today\'s Maths quiz?'),
                _buildChatMessage('Priya_Railway', 'Yes, use the shortcut formula for compound interest: Difference = P(R/100)^2.'),
              ],
            ),
          ),

          // Message Input Box
          Container(
            padding: const EdgeInsets.all(12),
            color: AppTheme.cardBackground,
            child: Row(
              children: [
                IconButton(icon: const Icon(Icons.mic, color: AppTheme.royalGold), onPressed: () {}),
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Type your doubt or question...',
                      hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(icon: const Icon(Icons.send, color: AppTheme.royalGold), onPressed: () {}),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildChatMessage(String sender, String text, {bool isAdmin = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isAdmin ? AppTheme.royalGold.withOpacity(0.1) : AppTheme.cardBackground,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isAdmin ? AppTheme.royalGold : AppTheme.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text(sender, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isAdmin ? AppTheme.royalGold : AppTheme.textMuted)),
          const SizedBox(height: 4),
          Text(text, style: const TextStyle(fontSize: 13, color: AppTheme.textWhite)),
        ],
      ),
    );
  }
}

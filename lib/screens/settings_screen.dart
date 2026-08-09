import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("App Settings", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSectionHeader("Account Preferences"),
          _buildSwitchTile("Enable Notifications", true),
          _buildSwitchTile("Enable Dark Mode", true),
          _buildListTile("Change Language", "English (Default)", Icons.language),
          
          const SizedBox(height: 20),
          _buildSectionHeader("Data Usage"),
          _buildSwitchTile("Download over Wi-Fi only", false),
          _buildListTile("Clear Cache", "124 MB", Icons.cleaning_services),
          
          const SizedBox(height: 20),
          _buildSectionHeader("About"),
          _buildListTile("Privacy Policy", "", Icons.privacy_tip),
          _buildListTile("Version", "v 1.0.4 (Beta)", Icons.info_outline),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Text(title, style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold, fontSize: 13)),
    );
  }

  Widget _buildSwitchTile(String title, bool value) {
    return SwitchListTile(
      value: value,
      onChanged: (val) {},
      title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 14)),
      activeColor: const Color(0xFFEAB308),
      contentPadding: EdgeInsets.zero,
    );
  }

  Widget _buildListTile(String title, String subtitle, IconData icon) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, color: Colors.grey),
      title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 14)),
      subtitle: subtitle.isNotEmpty ? Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)) : null,
      trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
    );
  }
}

import 'package:flutter/material.dart';

class UserProfileScreen extends StatelessWidget {
  const UserProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("My Profile", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // User Header Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 35,
                    backgroundColor: Color(0xFFEAB308),
                    child: Text("H", style: TextStyle(fontSize: 28, color: Colors.black, fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text("Harshraj Singh Gour", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 4),
                        Text("Target: SSC CGL & Defense Exams", style: TextStyle(color: Colors.grey, fontSize: 12)),
                        SizedBox(height: 8),
                        Chip(
                          backgroundColor: Colors.amber,
                          label: Text("Pro Member", style: TextStyle(color: Colors.black, fontSize: 10, fontWeight: FontWeight.bold)),
                          padding: EdgeInsets.zero,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Statistics Row
            Row(
              children: [
                Expanded(child: _buildStatCard("Tests Given", "48", Icons.assessment)),
                const SizedBox(width: 12),
                Expanded(child: _buildStatCard("Saved Qs", "120", Icons.bookmark)),
                const SizedBox(width: 12),
                Expanded(child: _buildStatCard("Accuracy", "78%", Icons.insights)),
              ],
            ),
            const SizedBox(height: 20),

            // Menu Options List
            _buildMenuTile(Icons.workspace_premium, "Pro Subscription Plan", "Active till Dec 2026", () {}),
            _buildMenuTile(Icons.download_rounded, "Offline Downloaded Notes", "14 Files Saved", () {}),
            _buildMenuTile(Icons.bookmark_border_rounded, "My Saved Questions", "View bookmarked questions", () {}),
            _buildMenuTile(Icons.settings_outlined, "App Settings & Language", "Hindi / English", () {}),
            _buildMenuTile(Icons.support_agent_rounded, "Help & Support / Feedback", "Contact AI Study Assistant", () {}),
            _buildMenuTile(Icons.logout_rounded, "Log Out", "Exit from account", () {}, isLogout: true),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: [
          Icon(icon, color: const Color(0xFFEAB308), size: 20),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 4),
          Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildMenuTile(IconData icon, String title, String subtitle, VoidCallback onTap, {bool isLogout = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(10)),
    get child: ListTile(
        leading: Icon(icon, color: isLogout ? Colors.redAccent : const Color(0xFFEAB308)),
        title: Text(title, style: TextStyle(color: isLogout ? Colors.redAccent : Colors.white, fontWeight: FontWeight.w500, fontSize: 14)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey, size: 14),
        onTap: onTap,
      ),
    );
  }
}

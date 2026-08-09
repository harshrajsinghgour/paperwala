import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Student Profile & Pass", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // User Info Header Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 30,
                  backgroundColor: Color(0xFFEAB308),
                  child: Text("H", style: TextStyle(color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text("Harshraj Singh Gour", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                    SizedBox(height: 4),
                    Text("+91 98765 43210", style: TextStyle(color: Colors.grey, fontSize: 12)),
                    SizedBox(height: 6),
                    Text("Target: SSC CGL / Rajasthan Exams", style: TextStyle(color: Color(0xFFEAB308), fontSize: 11)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Pro Pass Banner
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFFEAB308), Color(0xFFCA8A04)]),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("PAPER WALA PRO PASS", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 12)),
                const SizedBox(height: 6),
                const Text("Unlock Unlimited Mock Tests, AI Notes & PYQs", style: TextStyle(color: Colors.black, fontSize: 16, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.black, foregroundColor: Colors.white),
                  onPressed: () {},
                  child: const Text("Upgrade Now @ ₹299/year"),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Menu Options
          _buildMenuTile(Icons.bookmark, "My Bookmarked Questions", () {}),
          _buildMenuTile(Icons.download, "Downloaded Offline Notes", () {}),
          _buildMenuTile(Icons.analytics, "Detailed Analytics Report", () {}),
          _buildMenuTile(Icons.settings, "App Settings & Theme", () {}),
          _buildMenuTile(Icons.logout, "Log Out", () {}, isLogout: true),
        ],
      ),
    );
  }

  Widget _buildMenuTile(IconData icon, String title, VoidCallback onTap, {bool isLogout = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: Icon(icon, color: isLogout ? Colors.redAccent : const Color(0xFFEAB308)),
        title: Text(title, style: TextStyle(color: isLogout ? Colors.redAccent : Colors.white, fontWeight: FontWeight.w500, fontSize: 14)),
        trailing: const Icon(Icons.arrow_forward_ios, color: Colors.grey, size: 14),
        onTap: onTap,
      ),
    );
  }
}

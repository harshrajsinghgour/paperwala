import 'package:flutter/material.dart';

class HelpScreen extends StatelessWidget {
  const HelpScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Help & Support", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text("Frequently Asked Questions", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          
          _buildFAQ("How to join Live Tests?", "Go to Live Test section and click on the 'Join' button 10 minutes before start."),
          _buildFAQ("Are these notes free?", "Most basic notes are free. Premium notes require a Pro Pass."),
          _buildFAQ("Can I download videos?", "Yes, you can download content for offline viewing within the app."),

          const SizedBox(height: 30),
          const Text("Still need help?", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          
          _buildContactButton(Icons.whatsapp, "Chat on WhatsApp", Colors.green),
          _buildContactButton(Icons.email, "Email Support", Colors.blue),
        ],
      ),
    );
  }

  Widget _buildFAQ(String q, String a) {
    return ExpansionTile(
      collapsedIconColor: const Color(0xFFEAB308),
      iconColor: const Color(0xFFEAB308),
      title: Text(q, style: const TextStyle(color: Colors.white, fontSize: 14)),
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Text(a, style: const TextStyle(color: Colors.grey, fontSize: 13)),
        )
      ],
    );
  }

  Widget _buildContactButton(IconData icon, String label, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Icon(icon, color: color),
        title: Text(label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
      ),
    );
  }
}

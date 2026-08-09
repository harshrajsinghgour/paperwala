import 'package:flutter/material.dart';

class ExamCountdownScreen extends StatelessWidget {
  const ExamCountdownScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Exam Countdown & Alerts", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Countdown Hero Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFEAB308), Color(0xFFCA8A04)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text("TARGET EXAM COUNTDOWN", style: TextStyle(color: Colors.black, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
                SizedBox(height: 8),
                Text("SSC CGL Tier-1 2026", style: TextStyle(color: Colors.black, fontSize: 22, fontWeight: FontWeight.bold)),
                SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _CountdownBox(count: "45", label: "Days"),
                    _CountdownBox(count: "12", label: "Hours"),
                    _CountdownBox(count: "34", label: "Mins"),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          const Text("Active Exam Alerts", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),

          _buildAlertCard("Agniveervayu Notification Out", "Last Date to Apply: 25 August 2026", Icons.notification_important, Colors.redAccent),
          _buildAlertCard("Rajasthan CET Exam City Slip", "Admit card expected by next week", Icons.event_available, Colors.blueAccent),
          _buildAlertCard("Railway RRB NTPC Form Status", "Check your application status online", Icons.verified_user, Colors.green),
        ],
      ),
    );
  }

  Widget _buildAlertCard(String title, String subtitle, IconData icon, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: CircleAvatar(backgroundColor: color.withOpacity(0.2), child: Icon(icon, color: color)),
        title: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey, size: 14),
      ),
    );
  }
}

class _CountdownBox extends StatelessWidget {
  final String count;
  final String label;

  const _CountdownBox({required this.count, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.15),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(count, style: const TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
          Text(label, style: const TextStyle(color: Colors.black87, fontSize: 11)),
        ],
      ),
    );
  }
}

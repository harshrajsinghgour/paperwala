import 'package:flutter/material.dart';

class LiveTestsScreen extends StatelessWidget {
  const LiveTestsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Live Maha-Sangram Tests", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildLiveCard("All India SSC CGL Live Mock Test #04", "Starts in: 02h 15m", "14,200+ Students Enrolled", true),
          const SizedBox(height: 16),
          _buildLiveCard("Rajasthan CET & REET Mega Live Test", "Live Now (Ends in 40 mins)", "22,500+ Active Aspirants", false),
          const SizedBox(height: 16),
          _buildLiveCard("Agniveervayu Special Defense Test", "Scheduled for Tomorrow, 10:00 AM", "8,100+ Enrolled", false),
        ],
      ),
    );
  }

  Widget _buildLiveCard(String title, String timeStatus, String subtitle, bool isUpcoming) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isUpcoming ? Colors.blueAccent.withOpacity(0.4) : Colors.redAccent.withOpacity(0.6)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isUpcoming ? Colors.blueAccent.withOpacity(0.2) : Colors.redAccent.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(isUpcoming ? "UPCOMING" : "LIVE NOW", style: TextStyle(color: isUpcoming ? Colors.blueAccent : Colors.redAccent, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
              Text(timeStatus, style: const TextStyle(color: Color(0xFFEAB308), fontSize: 12, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 6),
          Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: isUpcoming ? Colors.white12 : const Color(0xFFEAB308),
                foregroundColor: isUpcoming ? Colors.white : Colors.black,
              ),
              onPressed: () {},
              child: Text(isUpcoming ? "Set Reminder" : "Join Live Test Now"),
            ),
          ),
        ],
      ),
    );
  }
}

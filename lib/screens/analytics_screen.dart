import 'package:flutter/material.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Performance Analytics", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Overall Accuracy Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text("Overall Accuracy", style: TextStyle(color: Colors.grey, fontSize: 13)),
                      SizedBox(height: 8),
                      Text("82.4%", style: TextStyle(color: Color(0xFFEAB308), fontSize: 28, fontWeight: FontWeight.bold)),
                      SizedBox(height: 4),
                      Text("Based on last 15 mock tests", style: TextStyle(color: Colors.white70, fontSize: 11)),
                    ],
                  ),
                  const CircleAvatar(
                    radius: 35,
                    backgroundColor: Color(0xFFEAB308),
                    child: Icon(Icons.insights, color: Colors.black, size: 30),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text("Subject Wise Strength", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),

            _buildSubjectBar("Quantitative Aptitude", 0.85, Colors.blue),
            _buildSubjectBar("Reasoning & Logic", 0.92, Color(0xFFEAB308)),
            _buildSubjectBar("General Awareness", 0.65, Colors.orange),
            _buildSubjectBar("English Language", 0.78, Colors.green),

            const SizedBox(height: 24),
            const Text("Time Management Insights", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.timer_outlined, color: Color(0xFFEAB308)),
                      SizedBox(width: 8),
                      Text("Average Time per Question: 42 Sec", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  SizedBox(height: 8),
                  Text("• You spend extra time on Maths word problems.\n• Reasoning section is your fastest scoring area.", style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.4)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSubjectBar(String title, double progress, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: const TextStyle(color: Colors.white, fontSize: 13)),
              Text("${(progress * 100).toInt()}%", style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: Colors.white10,
            color: color,
            minHeight: 6,
            borderRadius: BorderRadius.circular(3),
          ),
        ],
      ),
    );
  }
}

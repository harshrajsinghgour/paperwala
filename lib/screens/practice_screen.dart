import 'package:flutter/material.dart';

class PracticeScreen extends StatelessWidget {
  const PracticeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List practiceTopics = [
      {"title": "Quantitative Aptitude", "sets": "120 Sets", "icon": Icons.calculate},
      {"title": "Reasoning & Logic", "sets": "95 Sets", "icon": Icons.psychology},
      {"title": "General Awareness & GS", "sets": "150 Sets", "icon": Icons.public},
      {"title": "English Language", "sets": "80 Sets", "icon": Icons.menu_book},
      {"title": "Computer Knowledge", "sets": "45 Sets", "icon": Icons.computer},
      {"title": "Current Affairs Sets", "sets": "60 Sets", "icon": Icons.trending_up},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Unlimited Practice Zone", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.1,
        ),
        itemCount: practiceTopics.length,
        itemBuilder: (context, index) {
          var item = practiceTopics[index];
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white10),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(item['icon'], color: const Color(0xFFEAB308), size: 30),
                const SizedBox(height: 12),
                Text(item['title'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 4),
                Text(item['sets'], style: const TextStyle(color: Colors.grey, fontSize: 11)),
              ],
            ),
          );
        },
      ),
    );
  }
}

import 'package:flutter/material.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("All India Leaderboard", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: Column(
        children: [
          // Top Podium Header
          Container(
            padding: const EdgeInsets.all(20),
            color: const Color(0xFF1E293B),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: const [
                _PodiumUser(name: "Rahul S.", rank: "2", score: "980 Marks", height: 80, color: Colors.grey),
                _PodiumUser(name: "Harshraj S.", rank: "1", score: "1040 Marks", height: 110, color: Color(0xFFEAB308)),
                _PodiumUser(name: "Amit V.", rank: "3", score: "950 Marks", height: 65, color: Colors.brown),
              ],
            ),
          ),
          // Rankings List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: 10,
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(10)),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.white10,
                      child: Text("${index + 4}", style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                    title: Text("Aspirant User #${index + 4}", style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    subtitle: const Text("Score: 920 Marks | Accuracy: 84%", style: TextStyle(color: Colors.grey, fontSize: 11)),
                    trailing: const Text("920 Pts", style: TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold)),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _PodiumUser extends StatelessWidget {
  final String name;
  final String rank;
  final String score;
  final double height;
  final Color color;

  const _PodiumUser({required this.name, required this.rank, required this.score, required this.height, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        CircleAvatar(backgroundColor: color, radius: 22, child: Text(rank, style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold))),
        const SizedBox(height: 6),
        Text(name, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
        Text(score, style: const TextStyle(color: Colors.grey, fontSize: 10)),
        const SizedBox(height: 6),
        Container(
          width: 70,
          height: height,
          decoration: BoxDecoration(color: color.withOpacity(0.3), borderRadius: const BorderRadius.vertical(top: Radius.circular(8))),
        ),
      ],
    );
  }
}

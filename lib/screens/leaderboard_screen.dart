import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({Key? key}) : super(key: key);

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isLoading = true;
  List<dynamic> _leaderboardData = [];

  final String baseUrl = 'https://paper-wala-backend.onrender.com/api'; // अपना Backend URL

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this); // 4 tabs: Daily, Weekly, Monthly, All
    _fetchLeaderboard('daily');

    _tabController.addListener(() {
      if (_tabController.indexIsChanging) return;
      String filter = 'daily';
      if (_tabController.index == 1) filter = 'weekly';
      if (_tabController.index == 2) filter = 'monthly';
      if (_tabController.index == 3) filter = 'all';
      _fetchLeaderboard(filter);
    });
  }

  Future<void> _fetchLeaderboard(String timeframe) async {
    setState(() => _isLoading = true);
    try {
      final res = await http.get(Uri.parse('$baseUrl/extra/leaderboard?timeframe=$timeframe'));
      if (res.statusCode == 200) {
        final body = jsonDecode(res.body);
        setState(() {
          _leaderboardData = body['data']?? []; // Backend se {success, data} aa raha hai
          _isLoading = false;
        });
      } else {
        setState(() => _isLoading = false);
      }
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // Dark BG
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("All India Leaderboard 🏆", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: const Color(0xFFEAB308), // Gold
          indicatorWeight: 3,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.grey,
          tabs: const [
            Tab(text: "Daily"),
            Tab(text: "Weekly"),
            Tab(text: "Monthly"),
            Tab(text: "All Time"),
          ],
        ),
      ),
      body: _isLoading
         ? const Center(child: CircularProgressIndicator(color: Color(0xFFEAB308)))
          : _leaderboardData.isEmpty
             ? const Center(child: Text("अभी कोई डेटा उपलब्ध नहीं है", style: TextStyle(color: Colors.white70)))
              : Column(
                  children: [
                    // TOP 3 PODIUM SECTION
                    if (_leaderboardData.isNotEmpty) _buildTopThreePodium(),

                    // REST OF THE RANKS
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: _leaderboardData.length > 3? _leaderboardData.length - 3 : 0,
                        itemBuilder: (context, index) {
                          final item = _leaderboardData[index + 3];
                          final rank = index + 4;

                          return Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            decoration: BoxDecoration(
                              color: const Color(0xFF1E293B),
                              borderRadius: BorderRadius.circular(10)
                            ),
                            child: ListTile(
                              leading: CircleAvatar(
                                backgroundColor: Colors.white10,
                                child: Text(
                                  "#$rank",
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)
                                ),
                              ),
                              title: Row(
                                children: [
                                  Text(
                                    item['name']?? 'Student',
                                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)
                                  ),
                                  if(item['isProUser'] == true)
                                    const Padding(
                                      padding: EdgeInsets.only(left: 4),
                                      child: Icon(Icons.verified, color: Color(0xFFEAB308), size: 14)
                                    )
                                ],
                              ),
                              subtitle: Text(
                                "${item['testsAttempted']?? 0} Tests Attempted",
                                style: const TextStyle(color: Colors.grey, fontSize: 11)
                              ),
                              trailing: Text(
                                "${item['totalScore']} Pts",
                                style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold)
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
    );
  }

  // TOP 3 SPECIAL PODIUM CARD
  Widget _buildTopThreePodium() {
    final first = _leaderboardData.isNotEmpty? _leaderboardData[0] : null;
    final second = _leaderboardData.length > 1? _leaderboardData[1] : null;
    final third = _leaderboardData.length > 2? _leaderboardData[2] : null;

    return Container(
      padding: const EdgeInsets.all(20),
      color: const Color(0xFF1E293B),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (second!= null) _PodiumUser(
            name: second['name'],
            rank: "2",
            score: "${second['totalScore']} Pts",
            height: 80,
            color: Colors.grey
          ),
          if (first!= null) _PodiumUser(
            name: first['name'],
            rank: "1",
            score: "${first['totalScore']} Pts",
            height: 110,
            color: const Color(0xFFEAB308),
            isGold: true
          ),
          if (third!= null) _PodiumUser(
            name: third['name'],
            rank: "3",
            score: "${third['totalScore']} Pts",
            height: 65,
            color: Colors.brown
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
  final bool isGold;

  const _PodiumUser({
    required this.name,
    required this.rank,
    required this.score,
    required this.height,
    required this.color,
    this.isGold = false
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if(isGold) const Text("👑", style: TextStyle(fontSize: 20)),
        Stack(
          alignment: Alignment.bottomRight,
          children: [
            CircleAvatar(
              backgroundColor: color,
              radius: 22,
              child: Text(
                (name.isNotEmpty? name[0] : 'U').toUpperCase(),
                style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold)
              )
            ),
            Container(
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(color: color, shape: BoxShape.circle),
              child: Text(rank, style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 10)),
            ),
          ],
        ),
        const SizedBox(height: 6),
        SizedBox(
          width: 80,
          child: Text(
            name,
            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          )
        ),
        Text(score, style: const TextStyle(color: Colors.grey, fontSize: 10)),
        const SizedBox(height: 6),
        Container(
          width: 70,
          height: height,
          decoration: BoxDecoration(
            color: color.withOpacity(0.3),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(8))
          ),
        ),
      ],
    );
  }
}

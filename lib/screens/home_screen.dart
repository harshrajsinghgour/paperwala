import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/app_data_provider.dart';
import '../providers/test_provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final user = Provider.of<AuthProvider>(context, listen: false).currentUser;
      if (user != null) {
        Provider.of<AppDataProvider>(context, listen: false)
            .fetchDashboardData(user.id, user.targetExam);
        Provider.of<TestProvider>(context, listen: false)
            .loadTests(user.targetExam);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AuthProvider>(context).currentUser;
    final appData = Provider.of<AppDataProvider>(context);
    final testData = Provider.of<TestProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Paper Wala', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.indigo,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => Provider.of<AuthProvider>(context, listen: false).logout(),
          )
        ],
      ),
      body: appData.isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: () async {
                if (user != null) {
                  await appData.fetchDashboardData(user.id, user.targetExam);
                  await testData.loadTests(user.targetExam);
                }
              },
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // User Header Card
                    Card(
                      color: Colors.indigo.shade50,
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Colors.indigo,
                          child: Text(user?.name[0].toUpperCase() ?? 'U',
                              style: const TextStyle(color: Colors.white)),
                        ),
                        title: Text('नमस्ते, ${user?.name ?? "Student"}'),
                        subtitle: Text('टार्गेट: ${user?.targetExam} | कुल स्कोर: ${user?.totalScore}'),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Feature Grid / Quick Navigation
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildFeatureTile(Icons.assignment, 'मॉक टेस्ट', Colors.orange, () {
                          // Navigate to Test Series Screen
                        }),
                        _buildFeatureTile(Icons.menu_book, 'PDF नोट्स', Colors.blue, () {
                          // Navigate to Notes Screen
                        }),
                        _buildFeatureTile(Icons.newspaper, 'करंट अफेयर्स', Colors.green, () {
                          // Navigate to Current Affairs Screen
                        }),
                        _buildFeatureTile(Icons.question_answer, 'Ask Doubt', Colors.purple, () {
                          _showAskDoubtDialog(context, user?.id ?? '');
                        }),
                      ],
                    ),
                    const SizedBox(height: 25),

                    // Test Series Section
                    const Text('उपलब्ध मॉक टेस्ट (Mock Tests)',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 10),
                    testData.tests.isEmpty
                        ? const Text('कोई टेस्ट उपलब्ध नहीं है।')
                        : ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: testData.tests.length,
                            itemBuilder: (context, index) {
                              final test = testData.tests[index];
                              return Card(
                                child: ListTile(
                                  title: Text(test.title),
                                  subtitle: Text('${test.durationMinutes} मिनट | ${test.totalMarks} मार्क्स'),
                                  trailing: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor: Colors.indigo),
                                    onPressed: () {
                                      // Start Test Logic
                                    },
                                    child: const Text('स्टार्ट', style: TextStyle(color: Colors.white)),
                                  ),
                                ),
                              );
                            },
                          ),
                    const SizedBox(height: 25),

                    // Daily Current Affairs Section
                    const Text('आज का करंट अफेयर्स',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 10),
                    appData.currentAffairs.isEmpty
                        ? const Text('अभी कोई न्यूज़ नहीं है।')
                        : ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: appData.currentAffairs.length > 5 ? 5 : appData.currentAffairs.length,
                            itemBuilder: (context, index) {
                              final ca = appData.currentAffairs[index];
                              return Card(
                                child: ListTile(
                                  leading: const Icon(Icons.bolt, color: Colors.amber),
                                  title: Text(ca['title'] ?? ''),
                                  subtitle: Text(ca['description'] ?? '', maxLines: 2, overflow: TextOverflow.ellipsis),
                                ),
                              );
                            },
                          ),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildFeatureTile(IconData icon, String label, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Column(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: color.withOpacity(0.15),
            child: Icon(icon, color: color, size: 28),
          ),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
        ],
      ),
    );
  }

  void _showAskDoubtDialog(BuildContext context, String userId) {
    final textController = TextEditingController();
    String selectedSubject = 'Maths';

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('अपना सवाल/डाउट पूछें'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButton<String>(
              value: selectedSubject,
              isExpanded: true,
              items: ['Maths', 'Reasoning', 'GK/GS', 'English'].map((s) {
                return DropdownMenuItem(value: s, child: Text(s));
              }).toList(),
              onChanged: (val) {
                if (val != null) selectedSubject = val;
              },
            ),
            TextField(
              controller: textController,
              decoration: const InputDecoration(hintText: 'अपना प्रश्न यहाँ लिखें...'),
              maxLines: 3,
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('रद्द करें')),
          ElevatedButton(
            onPressed: () async {
              if (textController.text.isNotEmpty) {
                await Provider.of<AppDataProvider>(context, listen: false)
                    .askDoubt(userId, selectedSubject, textController.text);
                Navigator.pop(ctx);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('आपका डाउट सबमिट हो गया है!')),
                );
              }
            },
            child: const Text('सबमिट करें'),
          ),
        ],
      ),
    );
  }
}
ListTile(
  leading: const Icon(Icons.emoji_events, color: Colors.amber, size: 30),
  title: const Text("Live Leaderboard", style: TextStyle(fontWeight: FontWeight.bold)),
  subtitle: const Text("Check Daily, Weekly & Monthly Ranks"),
  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const LeaderboardScreen()),
    );
  },
)
  

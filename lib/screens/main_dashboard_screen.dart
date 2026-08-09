import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/app_models.dart';
import '../widgets/pro_plan_modal.dart';
import 'job_info_screen.dart';
import 'current_affairs_screen.dart';
import 'group_chat_screen.dart';
import 'notes_vault_screen.dart';

class MainDashboardScreen extends StatefulWidget {
  const MainDashboardScreen({Key? key}) : super(key: key);

  @override
  State<MainDashboardScreen> createState() => _MainDashboardScreenState();
}

class _MainDashboardScreenState extends State<MainDashboardScreen> {
  int _currentNavIndex = 0; // Index 0 = Test Series / Dashboard

  final UserProfile mockUser = UserProfile(
    userId: 'ID: 7890',
    name: 'Harshraj Singh Gour',
    isPro: true,
    proDaysRemaining: 15,
  );

  final List<TestSeriesItem> enrolledTests = [
    TestSeriesItem(id: '1', title: 'SSC CGL Tier-1 Full Mock', category: 'SSC', progress: 0.65, totalTests: 20, completedTests: 13),
    TestSeriesItem(id: '2', title: 'Railway NTPC CBT-2 Special', category: 'Railway', progress: 0.40, totalTests: 15, completedTests: 6),
    TestSeriesItem(id: '3', title: 'Rajasthan Police SI Mock', category: 'State', progress: 0.20, totalTests: 10, completedTests: 2),
  ];

  final List<String> otherTestCategories = [
    'SSC CGL & CHSL 2026 Tests',
    'Railway Recruitment Board (RRB) Mock Pack',
    'State PSC & Sub-Inspector Special',
    'Defence & Agniveer Vayu Test Series',
    'Central Armed Police Force (CAPF) Series'
  ];

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      _buildCoreTestSeriesHome(),
      const JobInfoScreen(),
      const CurrentAffairsScreen(),
      const GroupChatScreen(),
      const NotesVaultScreen(),
    ];

    return Scaffold(
      body: SafeArea(child: pages[_currentNavIndex]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentNavIndex,
        onTap: (index) => setState(() => _currentNavIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Test Series'),
          BottomNavigationBarItem(icon: Icon(Icons.work), label: 'Job Info'),
          BottomNavigationBarItem(icon: Icon(Icons.newspaper), label: 'Current Affairs'),
          BottomNavigationBarItem(icon: Icon(Icons.forum), label: 'Group Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.folder), label: 'Notes'),
        ],
      ),
    );
  }

  Widget _buildCoreTestSeriesHome() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          // Top Header Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: const [
                  Icon(Icons.description_rounded, color: AppTheme.royalGold, size: 28),
                  SizedBox(width: 8),
                  Text('PAPER WALA', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.royalGold)),
                ],
              ),
              Row(
                children: [
                  Text('#${mockUser.userId}', style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () {
                      showModalBottomSheet(
                        context: context,
                        backgroundColor: Colors.transparent,
                        builder: (_) => ProPlanModal(daysRemaining: mockUser.proDaysRemaining),
                      );
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.royalGold.withOpacity(0.2),
                        border: Border.all(color: AppTheme.royalGold),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.workspace_premium, color: AppTheme.royalGold, size: 14),
                          const SizedBox(width: 4),
                          Text('Pro: ${mockUser.proDaysRemaining}d Left', style: const TextStyle(color: AppTheme.royalGold, fontSize: 11, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Universal Search Bar
          TextField(
            decoration: InputDecoration(
              hintText: 'Search exams, job alerts, test series...',
              prefixIcon: const Icon(Icons.search, color: AppTheme.royalGold),
              filled: true,
              fillColor: AppTheme.cardBackground,
              contentPadding: const EdgeInsets.symmetric(vertical: 0),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppTheme.cardBorder)),
            ),
          ),
          const SizedBox(height: 16),

          // AI Progress Insight Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [AppTheme.cardBackground, Color(0FF1A2436)]),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.royalGold.withOpacity(0.5)),
            ),
            child: Row(
              children: [
                const Icon(Icons.psychology, color: AppTheme.royalGold, size: 36),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAlignment.start,
                    children: const [
                      Text('YOUR PROGRESS & AI INSIGHT', style: TextStyle(color: AppTheme.royalGold, fontSize: 11, fontWeight: FontWeight.bold)),
                      SizedBox(height: 4),
                      Text('AI Suggestion: Focus on Mathematics & Reasoning mock sets today to boost overall accuracy by 14%.', style: TextStyle(fontSize: 12, color: AppTheme.textWhite)),
                    ],
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Enrolled Test Series Header & Horizontal List
          const Text('Enrolled Test Series', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.textWhite)),
          const SizedBox(height: 12),
          SizedBox(
            height: 130,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: enrolledTests.length,
              itemBuilder: (context, index) {
                final item = enrolledTests[index];
                return Container(
                  width: 240,
                  margin: const EdgeInsets.only(right: 12),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.cardBackground,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppTheme.cardBorder),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(item.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      Text('${item.completedTests}/${item.totalTests} Tests Completed', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                      LinearProgressIndicator(value: item.progress, backgroundColor: AppTheme.darkBackground, color: AppTheme.royalGold),
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {},
                          child: const Text('Resume Test', style: TextStyle(color: AppTheme.royalGold, fontSize: 12)),
                        ),
                      )
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 20),

          // 5 Quick Test Features Grid (Below Enrolled Tests)
          const Text('Quick Test Features', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 3,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            children: [
              _buildQuickFeatureCard(Icons.local_fire_department, 'Daily Challenge', Colors.orange),
              _buildQuickFeatureCard(Icons.quiz, 'Quiz Practice', Colors.blue),
              _buildQuickFeatureCard(Icons.live_tv, 'Live Test', Colors.red),
              _buildQuickFeatureCard(Icons.menu_book, 'Study Material', Colors.green),
              _buildQuickFeatureCard(Icons.emoji_events, 'Leaderboard', AppTheme.royalGold),
            ],
          ),
          const SizedBox(height: 24),

          // Other Test Series (Explore Section)
          const Text('Other Test Series & Categories', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: otherTestCategories.length,
            itemBuilder: (context, index) {
              return Card(
                color: AppTheme.cardBackground,
                margin: const EdgeInsets.only(bottom: 8),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: const BorderSide(color: AppTheme.cardBorder)),
                child: ListTile(
                  leading: const Icon(Icons.star_outline, color: AppTheme.royalGold),
                  title: Text(otherTestCategories[index], style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMuted),
                  onTap: () {},
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildQuickFeatureCard(IconData icon, String label, Color iconColor) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardBackground,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.cardBorder),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: iconColor, size: 26),
          const SizedBox(height: 6),
          Text(label, textAlign: TextAlign.center, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}

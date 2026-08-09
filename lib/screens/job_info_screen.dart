import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/app_models.dart';

class JobInfoScreen extends StatefulWidget {
  const JobInfoScreen({Key? key}) : super(key: key);

  @override
  State<JobInfoScreen> createState() => _JobInfoScreenState();
}

class _JobInfoScreenState extends State<JobInfoScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<JobAlert> mockJobs = [
    JobAlert(id: '1', title: 'SSC CHSL 2026 Recruitment', category: 'New Vacancies', totalPosts: '4,500 Posts', lastDate: '28 Aug 2026', qualification: '12th Pass'),
    JobAlert(id: '2', title: 'Railway RRB ALP Admit Card 2026', category: 'Admit Card', totalPosts: 'N/A', lastDate: 'Exam: 15 Sep', qualification: '10th + ITI'),
    JobAlert(id: '3', title: 'Rajasthan Police Constable Result 2026', category: 'Result', totalPosts: '3,578 Posts', lastDate: 'Declared Today', qualification: '10th Pass'),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Paper Wala Info (Job Alerts)', style: TextStyle(color: AppTheme.royalGold, fontSize: 18)),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: AppTheme.royalGold,
          labelColor: AppTheme.royalGold,
          unselectedLabelColor: AppTheme.textMuted,
          tabs: const [
            Tab(text: 'New Vacancies'),
            Tab(text: 'Admit Card'),
            Tab(text: 'Answer Key'),
            Tab(text: 'Result'),
            Tab(text: 'Syllabus'),
          ],
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: mockJobs.length,
        itemBuilder: (context, index) {
          final job = mockJobs[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.cardBackground,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.cardBorder),
            ),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(child: Text(job.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15))),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(color: AppTheme.royalGold.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                      child: const Text('AI Verified', style: TextStyle(color: AppTheme.royalGold, fontSize: 10)),
                    )
                  ],
                ),
                const SizedBox(height: 8),
                Text('Total Posts: ${job.totalPosts} | Qualification: ${job.qualification}', style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Last Date: ${job.lastDate}', style: const TextStyle(fontSize: 12, color: AppTheme.accentRed, fontWeight: FontWeight.bold)),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: AppTheme.royalGold, padding: const EdgeInsets.symmetric(horizontal: 16)),
                      onPressed: () {},
                      child: const Text('Apply Now', style: TextStyle(color: AppTheme.darkBackground, fontWeight: FontWeight.bold, fontSize: 12)),
                    )
                  ],
                )
              ],
            ),
          );
        },
      ),
    );
  }
}

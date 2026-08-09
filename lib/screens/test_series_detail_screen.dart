import 'package:flutter/material.dart';
import 'cbt_exam_screen.dart';

class TestSeriesDetailScreen extends StatefulWidget {
  final String testTitle;

  const TestSeriesDetailScreen({Key? key, required this.testTitle}) : super(key: key);

  @override
  State<TestSeriesDetailScreen> createState() => _TestSeriesDetailScreenState();
}

class _TestSeriesDetailScreenState extends State<TestSeriesDetailScreen> with SingleTickerProviderStateMixin {
  late TabController _stageTabController;
  String selectedSubject = 'All Subjects';

  final List<String> subjects = ['All Subjects', 'Reasoning', 'Maths', 'General Awareness', 'English'];

  @override
  void initState() {
    super.initState() ;
    _stageTabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFA0B0F18), // Dark Royal Navy
      appBar: AppBar(
        title: Text(widget.testTitle, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
        backgroundColor: const Color(0xFF10172A),
        bottom: TabBar(
          controller: _stageTabController,
          indicatorColor: const Color(0xFFEAB308), // Gold accent
          labelColor: const Color(0xFFEAB308),
          unselectedLabelColor: Colors.grey,
          tabs: const [
            Tab(text: "Tier-1 / Pre (Objective)"),
            Tab(text: "Tier-2 / Mains (Subjective)"),
            Tab(text: "Interview Guide"),
          ],
        ),
      ),
      body: TabBarView(
        controller: _stageTabController,
        children: [
          _buildObjectiveTestsTab(),
          _buildSubjectiveMainsTab(),
          _buildInterviewTab(),
        ],
      ),
    );
  }

  // Tier 1 / Pre Objective Tests Area
  Widget _buildObjectiveTestsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Most Saved Questions
          _buildCategoryCard(
            title: "1. Most Saved Questions",
            count: "120 Questions",
            subtitle: "Subject-wise high priority saved questions",
            icon: Icons.bookmark_added_rounded,
            color: Colors.amber,
            onTap: () => _openInstructionDialog("Most Saved Questions Practice"),
          ),
          const SizedBox(height: 12),

          // 2. Previous Years Questions (PYQs)
          _buildCategoryCard(
            title: "2. Previous Years Questions (PYQ)",
            count: "45 Tests",
            subtitle: "Part 1: Subject Wise | Part 2: Full PYQ Mock",
            icon: Icons.history_edu_rounded,
            color: Colors.blue,
            onTap: () => _showPYQSubOptionBottomSheet(),
          ),
          const SizedBox(height: 12),

          // 3. Chapter Tests with Subject Selector
          _buildChapterTestSection(),
          const SizedBox(height: 12),

          // 4. Subject Tests
          _buildCategoryCard(
            title: "4. Subject Tests",
            count: "28 Tests",
            subtitle: "Sectional Speed Tests (Line-by-line unlocked)",
            icon: Icons.menu_book_rounded,
            color: Colors.purple,
            onTap: () => _openInstructionDialog("Subject Test - Reasoning"),
          ),
          const SizedBox(height: 12),

          // 5. Full Tests Breakdown (Easy, Moderate, Hard, Mix)
          _buildFullTestSection(),
        ],
      ),
    );
  }

  // Category Expandable Card
  Widget _buildCategoryCard({
    required String title,
    required String count,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      color: const Color(0xFF1E293B),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        onTap: onTap,
        leading: CircleAvatar(backgroundColor: color.withOpacity(0.2), child: Icon(icon, color: color)),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(child: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15))),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(12)),
              child: Text(count, style: const TextStyle(color: Color(0xFFEAB308), fontSize: 11, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey, size: 16),
      ),
    );
  }

  // Chapter Test Header Selector + List
  Widget _buildChapterTestSection() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("3. Chapter Tests", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
              Text("Total: 85 Tests", style: TextStyle(color: Colors.amber.shade400, fontSize: 12, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 8),
          // Scrollable Subject Filter Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: subjects.map((subj) {
                final isSelected = selectedSubject == subj;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: ChoiceChip(
                    label: Text(subj, style: TextStyle(color: isSelected ? Colors.black : Colors.white, fontSize: 12)),
                    selected: isSelected,
                    selectedColor: const Color(0xFFEAB308),
                    backgroundColor: const Color(0xFF0F172A),
                    onSelected: (val) {
                      setState(() => selectedSubject = subj);
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 8),
          ListTile(
            dense: true,
            title: Text("$selectedSubject - Chapter 01: Basics & Logic", style: const TextStyle(color: Colors.white)),
            subtitle: const Text("15 Qs | 15 Mins | +2 / -0.5", style: TextStyle(color: Colors.grey, fontSize: 11)),
            trailing: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black),
              onPressed: () => _openInstructionDialog("$selectedSubject Chapter Test"),
              child: const Text("Start", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  // Full Test Grid / Column (5 Easy, 5 Moderate, 5 Hard, 5 Mix)
  Widget _buildFullTestSection() {
    return ExpansionTile(
      collapsedBackgroundColor: const Color(0xFF1E293B),
      backgroundColor: const Color(0xFF1E293B),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      collapsedShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      leading: const Icon(Icons.assessment_rounded, color: Colors.greenAccent),
      title: const Text("5. Full Length Mock Tests", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
      subtitle: const Text("20 Full Mock Tests (Line-wise Unlocked)", style: TextStyle(color: Colors.grey, fontSize: 12)),
      children: [
        _buildFullTestSubCategory("5 Easy Tests", Colors.green, 5),
        _buildFullTestSubCategory("5 Moderate Tests", Colors.orange, 5),
        _buildFullTestSubCategory("5 Hard Tests", Colors.redAccent, 5),
        _buildFullTestSubCategory("5 Mixed Level Tests", Colors.purpleAccent, 5),
      ],
    );
  }

  Widget _buildFullTestSubCategory(String title, Color color, int count) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(color: const Color(0xFF0F172A), borderRadius: BorderRadius.circular(8)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(radius: 4, backgroundColor: color),
              const SizedBox(width: 8),
              Text(title, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
            ],
          ),
          ...List.generate(count, (index) {
            return ListTile(
              dense: true,
              title: Text("Full Mock Test #${index + 1}", style: const TextStyle(color: Colors.white, fontSize: 13)),
              subtitle: const Text("100 Qs | 60 Mins | 200 Marks", style: TextStyle(color: Colors.grey, fontSize: 11)),
              trailing: OutlinedButton(
                style: OutlinedButton.styleFrom(side: BorderSide(color: color)),
                onPressed: () => _openInstructionDialog("$title - Mock #${index + 1}"),
                child: Text("Attempt", style: TextStyle(color: color, fontSize: 11)),
              ),
            );
          }),
        ],
      ),
    );
  }

  // Tier-2 Mains Subjective PDF Upload System
  Widget _buildSubjectiveMainsTab() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.picture_as_pdf_rounded, color: Colors.redAccent),
                    SizedBox(width: 8),
                    Text("Mains Subjective Paper & Answer Upload", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                  ],
                ),
                const SizedBox(height: 8),
                const Text(
                  "1. प्रश्न पत्र डाउनलोड करें और उत्तर अपनी कॉपी में लिखें।\n"
                  "2. लिखे हुए उत्तर की स्पष्ट फोटो/PDF बनाएं और नीचे अपलोड करें।\n"
                  "3. AI Engine और शिक्षक आपके उत्तर की गहन जांच कर नंबर व सुझाव देंगे।",
                  style: TextStyle(color: Colors.grey, fontSize: 12, height: 1.4),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("PDF Upload Dialog: Select Answer Sheet PDF file from phone storage.")),
                      );
                    },
                    icon: const Icon(Icons.upload_file_rounded),
                    label: const Text("Upload Answer Sheet (PDF)", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInterviewTab() {
    return const Center(child: Text("Interview Preparation Material & Mock Panels", style: TextStyle(color: Colors.grey)));
  }

  // Instruction BottomSheet Dialog Before Test Starts
  void _openInstructionDialog(String testName) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) {
        String selectedLang = 'Hindi';
        return StatefulBuilder(
          builder: (context, setDialogState) {
            return Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(testName, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _InfoChip(label: "Questions", val: "100"),
                      _InfoChip(label: "Max Marks", val: "200"),
                      _InfoChip(label: "Time", val: "60 Mins"),
                    ],
                  ),
                  const Divider(color: Colors.white24, height: 24),
                  const Text("Select Default Language / भाषा चुनें:", style: TextStyle(color: Colors.grey, fontSize: 12)),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      ChoiceChip(
                        label: const Text("Hindi"),
                        selected: selectedLang == 'Hindi',
                        onSelected: (val) => setDialogState(() => selectedLang = 'Hindi'),
                      ),
                      const SizedBox(width: 10),
                      ChoiceChip(
                        label: const Text("English"),
                        selected: selectedLang == 'English',
                        onSelected: (val) => setDialogState(() => selectedLang = 'English'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text("Marking Scheme: +2.0 for Correct | -0.5 Negative Marking", style: TextStyle(color: Colors.amber, fontSize: 12)),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black, padding: const EdgeInsets.symmetric(vertical: 14)),
                      onPressed: () {
                        Navigator.pop(ctx);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (c) => CBTExamScreen(testTitle: testName, language: selectedLang),
                          ),
                        );
                      },
                      child: const Text("AGREE & START TEST", style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  void _showPYQSubOptionBottomSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E293B),
      builder: (c) => Container(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text("PYQ Selection", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 12),
            ListTile(
              leading: const Icon(Icons.subject, color: Colors.amber),
              title: const Text("Part 1: Subject-Wise PYQ Tests", style: TextStyle(color: Colors.white)),
              onTap: () {
                Navigator.pop(c);
                _openInstructionDialog("Subject-Wise PYQ");
              },
            ),
            ListTile(
              leading: const Icon(Icons.file_copy, color: Colors.blue),
              title: const Text("Part 2: Full Year Mock PYQ Paper", style: TextStyle(color: Colors.white)),
              onTap: () {
                Navigator.pop(c);
                _openInstructionDialog("Full PYQ Paper Mock");
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  final String label;
  final String val;
  const _InfoChip({required this.label, required this.val});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(val, style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold, fontSize: 16)),
        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 11)),
      ],
    );
  }
}

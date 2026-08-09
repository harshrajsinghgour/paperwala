import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class CurrentAffairsScreen extends StatefulWidget {
  const CurrentAffairsScreen({Key? key}) : super(key: key);

  @override
  State<CurrentAffairsScreen> createState() => _CurrentAffairsScreenState();
}

class _CurrentAffairsScreenState extends State<CurrentAffairsScreen> {
  String selectedMainCategory = 'World Affairs';
  String selectedPill = 'Daily Briefs';

  final List<String> mainCategories = ['World Affairs', 'National News', 'All India States'];
  final List<String> aiPills = ['Daily Briefs', 'AI Exam Target', 'Topic-Wise', 'Monthly Compilations'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Current Affairs Feed', style: TextStyle(color: AppTheme.royalGold, fontSize: 18)),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up, color: AppTheme.royalGold),
            onPressed: () {},
            tooltip: 'Listen AI Audio Summary',
          )
        ],
      ),
      body: Column(
        children: [
          // 1st Level Selector: World, National, All India States
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
            color: AppTheme.cardBackground,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: mainCategories.map((cat) {
                final isSelected = selectedMainCategory == cat;
                return ChoiceChip(
                  label: Text(cat, style: TextStyle(color: isSelected ? AppTheme.darkBackground : AppTheme.textWhite, fontSize: 12)),
                  selected: isSelected,
                  selectedColor: AppTheme.royalGold,
                  backgroundColor: AppTheme.darkBackground,
                  onSelected: (val) => setState(() => selectedMainCategory = cat),
                );
              }).toList(),
            ),
          ),

          // 2nd Level Selector: 4 Special AI Feed Pills
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: aiPills.map((pill) {
                final isSelected = selectedPill == pill;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: FilterChip(
                    label: Text(pill, style: TextStyle(color: isSelected ? AppTheme.royalGold : AppTheme.textMuted, fontSize: 11)),
                    selected: isSelected,
                    checkmarkColor: AppTheme.royalGold,
                    selectedColor: AppTheme.royalGold.withOpacity(0.2),
                    backgroundColor: AppTheme.cardBackground,
                    onSelected: (val) => setState(() => selectedPill = pill),
                  ),
                );
              }).toList(),
            ),
          ),

          // News Feed Cards
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: 4,
              itemBuilder: (context, index) {
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
                          Text('$selectedMainCategory • $selectedPill', style: const TextStyle(color: AppTheme.royalGold, fontSize: 11, fontWeight: FontWeight.bold)),
                          const Text('Today', style: TextStyle(color: AppTheme.textMuted, fontSize: 11)),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const Text('Global Economic Summit 2026 Key Takeaways for SSC/UPSC', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      const SizedBox(height: 6),
                      const Text('• AI Summary: World leaders agreed on digital trade pacts. Important exam points include treaty names and participating member nations.', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    ],
                  ),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

class DailyChallengeScreen extends StatefulWidget {
  const DailyChallengeScreen({Key? key}) : super(key: key);

  @override
  State<DailyChallengeScreen> createState() => _DailyChallengeScreenState();
}

class _DailyChallengeScreenState extends State<DailyChallengeScreen> {
  int currentQuestion = 0;
  int? selectedOption;

  final List<Map<String, dynamic>> questions = [
    {
      "q": "भारतीय संविधान का कौन सा अनुच्छेद राष्ट्रपति को अध्यादेश जारी करने की शक्ति देता है?",
      "options": ["अनुच्छेद 123", "अनुच्छेद 213", "अनुच्छेद 72", "अनुच्छेद 352"],
      "answer": 0
    },
    {
      "q": "राजस्थान का मैनचेस्टर किस शहर को कहा जाता है?",
      "options": ["जयपुर", "भीलवाड़ा", "कोटा", "उदयपुर"],
      "answer": 1
    },
  ];

  @override
  Widget build(BuildContext context) {
    var q = questions[currentQuestion];
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Daily Challenge Quiz", style: TextStyle(color: Colors.white, fontSize: 16)),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text("Q ${currentQuestion + 1}/${questions.length}", style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold)),
            ),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LinearProgressIndicator(
              value: (currentQuestion + 1) / questions.length,
              backgroundColor: Colors.white10,
              color: const Color(0xFFEAB308),
            ),
            const SizedBox(height: 24),
            Text(q['q'], style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, height: 1.4)),
            const SizedBox(height: 24),
            ...List.generate(q['options'].length, (index) {
              bool isSelected = selectedOption == index;
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: isSelected ? const Color(0xFFEAB308).withOpacity(0.2) : const Color(0xFF1E293B),
                  border: Border.all(color: isSelected ? const Color(0xFFEAB308) : Colors.transparent),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: ListTile(
                  title: Text(q['options'][index], style: TextStyle(color: isSelected ? const Color(0xFFEAB308) : Colors.white, fontWeight: FontWeight.w500)),
                  leading: Radio<int>(
                    value: index,
                    groupValue: selectedOption,
                    activeColor: const Color(0xFFEAB308),
                    onChanged: (val) => setState(() => selectedOption = val),
                  ),
                  onTap: () => setState(() => selectedOption = index),
                ),
              );
            }),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFEAB308),
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () {
                  if (currentQuestion < questions.length - 1) {
                    setState(() {
                      currentQuestion++;
                      selectedOption = null;
                    });
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Quiz Completed! Checking Score...")));
                  }
                },
                child: Text(currentQuestion < questions.length - 1 ? "Next Question" : "Submit Quiz", style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

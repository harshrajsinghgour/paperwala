import 'dart:async';
import 'package:flutter/material.dart';

class CBTExamScreen extends StatefulWidget {
  final String testTitle;
  final String language;

  const CBTExamScreen({Key? key, required this.testTitle, required this.language}) : super(key: key);

  @override
  State<CBTExamScreen> createState() => _CBTExamScreenState();
}

class _CBTExamScreenState extends State<CBTExamScreen> {
  int currentQuestionIndex = 0;
  late String currentLang;
  bool isGridView = false;
  int remainingSeconds = 3600; // 60 minutes timer
  Timer? timer;

  // Mock Question Database
  final List<Map<String, dynamic>> questions = [
    {
      "q_hi": "भारत की राजधानी क्या है?",
      "q_en": "What is the capital of India?",
      "options_hi": ["मुंबई", "नई दिल्ली", "कोलकाता", "चेन्नई"],
      "options_en": ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      "selected": -1,
      "isMarkedForReview": false,
      "correct": 1,
    },
    {
      "q_hi": "निम्नलिखित में से कौन सा सम संख्या (Even Number) है?",
      "q_en": "Which of the following is an Even Number?",
      "options_hi": ["3", "7", "8", "11"],
      "options_en": ["3", "7", "8", "11"],
      "selected": -1,
      "isMarkedForReview": false,
      "correct": 2,
    },
    {
      "q_hi": "कंप्यूटर का मस्तिष्क किसे कहा जाता है?",
      "q_en": "Which part is known as the Brain of Computer?",
      "options_hi": ["RAM", "CPU", "Hard Disk", "Monitor"],
      "options_en": ["RAM", "CPU", "Hard Disk", "Monitor"],
      "selected": -1,
      "isMarkedForReview": false,
      "correct": 1,
    },
  ];

  @override
  void initState() {
    super.initState();
    currentLang = widget.language;
    _startTimer();
  }

  void _startTimer() {
    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (remainingSeconds > 0) {
        setState(() => remainingSeconds--);
      } else {
        t.cancel();
        _showSubmitAlertDialog(autoSubmit: true);
      }
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  String _formatTime(int sec) {
    int m = sec ~/ 60;
    int s = sec % 60;
    return "${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}";
  }

  @override
  Widget build(BuildContext context) {
    final q = questions[currentQuestionIndex];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.testTitle, style: const TextStyle(fontSize: 14, color: Colors.white)),
            Text("Q ${currentQuestionIndex + 1}/${questions.length}", style: const TextStyle(fontSize: 11, color: Colors.grey)),
          ],
        ),
        actions: [
          // Language Switch Button
          TextButton.icon(
            onPressed: () {
              setState(() {
                currentLang = currentLang == 'Hindi' ? 'English' : 'Hindi';
              });
            },
            icon: const Icon(Icons.language, color: Color(0xFFEAB308), size: 18),
            label: Text(currentLang, style: const TextStyle(color: Color(0xFFEAB308), fontSize: 12)),
          ),
          // Grid View Toggle Button
          IconButton(
            icon: Icon(isGridView ? Icons.list_alt_rounded : Icons.grid_view_rounded, color: Colors.white),
            onPressed: () => setState(() => isGridView = !isGridView),
          ),
          // Timer Badge
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: Colors.red.withOpacity(0.2), borderRadius: BorderRadius.circular(6)),
            child: Row(
              children: [
                const Icon(Icons.timer, color: Colors.redAccent, size: 14),
                const SizedBox(width: 4),
                Text(_formatTime(remainingSeconds), style: const TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold, fontSize: 12)),
              ],
            ),
          )
        ],
      ),
      body: isGridView ? _buildGridViewPalette() : _buildExamBody(q),
      bottomNavigationBar: isGridView ? null : _buildBottomExamControls(q),
    );
  }

  Widget _buildExamBody(Map<String, dynamic> q) {
    List options = currentLang == 'Hindi' ? q['options_hi'] : q['options_en'];
    String qText = currentLang == 'Hindi' ? q['q_hi'] : q['q_en'];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Question Header Marks + Negative
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: Colors.green.withOpacity(0.2), borderRadius: BorderRadius.circular(4)),
                child: const Text("+2.0 Marks", style: TextStyle(color: Colors.greenAccent, fontSize: 11)),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: Colors.red.withOpacity(0.2), borderRadius: BorderRadius.circular(4)),
                child: const Text("-0.5 Neg", style: TextStyle(color: Colors.redAccent, fontSize: 11)),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Question Text
          Text(qText, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w500, height: 1.4)),
          const SizedBox(height: 20),

          // Options List
          ...List.generate(options.length, (optIdx) {
            bool isSelected = q['selected'] == optIdx;
            return Container(
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFFEAB308).withOpacity(0.15) : const Color(0xFF1E293B),
                border: Border.all(color: isSelected ? const Color(0xFFEAB308) : Colors.white10),
                borderRadius: BorderRadius.circular(8),
              ),
              child: RadioListTile<int>(
                activeColor: const Color(0xFFEAB308),
                title: Text(options[optIdx], style: TextStyle(color: isSelected ? const Color(0xFFEAB308) : Colors.white, fontSize: 14)),
                value: optIdx,
                groupValue: q['selected'],
                onChanged: (val) {
                  setState(() {
                    q['selected'] = val;
                  });
                },
              ),
            );
          }),
        ],
      ),
    );
  }

  // Question Palette Grid View
  Widget _buildGridViewPalette() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Question Palette", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 5, crossAxisSpacing: 10, mainAxisSpacing: 10),
              itemCount: questions.length,
              itemBuilder: (ctx, idx) {
                final item = questions[idx];
                Color btnColor = Colors.grey;
                if (item['selected'] != -1) btnColor = Colors.green;
                if (item['isMarkedForReview']) btnColor = Colors.purple;

                return InkWell(
                  onTap: () {
                    setState(() {
                      currentQuestionIndex = idx;
                      isGridView = false;
                    });
                  },
                  child: Container(
                    decoration: BoxDecoration(color: btnColor, borderRadius: BorderRadius.circular(8)),
                    alignment: Alignment.center,
                    child: Text("${idx + 1}", style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                );
              },
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
              onPressed: () => _showSubmitAlertDialog(),
              child: const Text("SUBMIT TEST NOW"),
            ),
          ),
        ],
      ),
    );
  }

  // Bottom Navigation Bar with Clear, Mark for Review, Save & Next
  Widget _buildBottomExamControls(Map<String, dynamic> q) {
    return Container(
      padding: const EdgeInsets.all(12),
      color: const Color(0xFF1E293B),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Clear Option Selection
          TextButton(
            onPressed: () {
              setState(() => q['selected'] = -1);
            },
            child: const Text("Clear", style: TextStyle(color: Colors.grey)),
          ),
          // Mark for Review
          OutlinedButton(
            style: OutlinedButton.styleFrom(side: BorderSide(color: q['isMarkedForReview'] ? Colors.purple : Colors.grey)),
            onPressed: () {
              setState(() => q['isMarkedForReview'] = !q['isMarkedForReview']);
            },
            child: Text("Review", style: TextStyle(color: q['isMarkedForReview'] ? Colors.purpleAccent : Colors.white)),
          ),
          // Save & Next
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black),
            onPressed: () {
              if (currentQuestionIndex < questions.length - 1) {
                setState(() => currentQuestionIndex++);
              } else {
                _showSubmitAlertDialog();
              }
            },
            child: Text(currentQuestionIndex == questions.length - 1 ? "Submit" : "Save & Next"),
          ),
        ],
      ),
    );
  }

  // Submit Alert Box
  void _showSubmitAlertDialog({bool autoSubmit = false}) {
    int attempted = questions.where((element) => element['selected'] != -1).length;
    int unattempted = questions.length - attempted;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: Text(autoSubmit ? "Time Over! Submitting Test" : "Submit Test?", style: const TextStyle(color: Colors.white)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Attempted: $attempted", style: const TextStyle(color: Colors.greenAccent)),
            Text("Unattempted: $unattempted", style: const TextStyle(color: Colors.redAccent)),
            const SizedBox(height: 12),
            const Text("क्या आप टेस्ट जमा करने के लिए आश्वस्त हैं?", style: TextStyle(color: Colors.grey, fontSize: 12)),
          ],
        ),
        actions: [
          if (!autoSubmit)
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text("Cancel"),
            ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black),
            onPressed: () {
              Navigator.pop(ctx);
              _navigateToAIResultScreen();
            },
            child: const Text("Submit Now"),
          ),
        ],
      ),
    );
  }

  // Final AI Scorecard & Detailed Analysis Screen
  void _navigateToAIResultScreen() {
    int correctCount = 0;
    for (var q in questions) {
      if (q['selected'] == q['correct']) correctCount++;
    }
    double score = (correctCount * 2.0) - ((questions.where((element) => element['selected'] != -1).length - correctCount) * 0.5);

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (c) => Scaffold(
          backgroundColor: const Color(0xFF0F172A),
          appBar: AppBar(
            title: const Text("AI Scorecard & Analysis", style: TextStyle(color: Colors.white)),
            backgroundColor: const Color(0xFF1E293B),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                // Score Header Card
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(16)),
                  child: Column(
                    children: [
                      const Text("Overall Score", style: TextStyle(color: Colors.grey, fontSize: 13)),
                      const SizedBox(height: 8),
                      Text("$score / ${questions.length * 2}", style: const TextStyle(color: Color(0xFFEAB308), fontSize: 28, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _ScoreStat(title: "Rank", val: "#12 / 1,450"),
                          _ScoreStat(title: "Accuracy", val: "${((correctCount / questions.length) * 100).toStringAsFixed(1)}%"),
                          _ScoreStat(title: "Correct", val: "$correctCount"),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // AI Insight Card
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.blue.withOpacity(0.1),
                    border: Border.all(color: Colors.blueAccent.withOpacity(0.3)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.auto_awesome, color: Colors.blueAccent),
                          SizedBox(width: 8),
                          Text("AI Performance Insights", style: TextStyle(color: Colors.blueAccent, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      SizedBox(height: 8),
                      Text(
                        "• आपकी सटीकता (Accuracy) काफी अच्छी है, लेकिन गणितीय प्रश्नों में समय थोड़ा अधिक लगा।\n"
                        "• सुझाव: 'Speed & Time' चैप्टर के 5 क्विज़ दोबारा हल करें।",
                        style: TextStyle(color: Colors.white70, fontSize: 12, height: 1.4),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Exit / Home Button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black),
                    onPressed: () => Navigator.pop(c),
                    child: const Text("Back to Test Series", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ScoreStat extends StatelessWidget {
  final String title;
  final String val;
  const _ScoreStat({required this.title, required this.val});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(val, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
        Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11)),
      ],
    );
  }
}

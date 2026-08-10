import 'dart:async';
import 'package:flutter/material.dart';
import '../models/test_model.dart'; // अपने TestModel का पाथ अपडेट करें

enum QuestionStatus { notVisited, answered, unanswered, markedForReview }

class MockTestPlayScreen extends StatefulWidget {
  final TestModel test;

  const MockTestPlayScreen({Key? key, required this.test}) : super(key: key);

  @override_
  State<MockTestPlayScreen> createState() => _MockTestPlayScreenState();
}

class _MockTestPlayScreenState extends State<MockTestPlayScreen> {
  late int _remainingSeconds;
  Timer? _timer;
  int _currentIndex = 0;

  // स्टोर: यूजर द्वारा चुने गए उत्तर (questionIndex -> selectedOptionIndex)
  final Map<int, int?> _userAnswers = {};
  
  // स्टोर: प्रश्नों का स्टेटस (notVisited, answered, unanswered, markedForReview)
  final Map<int, QuestionStatus> _questionStatuses = {};

  @override
  void initState() {
    super.initState();
    _remainingSeconds = widget.test.durationMinutes * 60;
    
    // सभी प्रश्नों का प्रारंभिक स्टेटस Set करें
    for (int i = 0; i < widget.test.questions.length; i++) {
      _userAnswers[i] = null;
      _questionStatuses[i] = QuestionStatus.notVisited;
    }
    
    // पहला प्रश्न Visited / Unanswered मार्क करें
    _questionStatuses[0] = QuestionStatus.unanswered;

    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_remainingSeconds > 0) {
        setState(() {
          _remainingSeconds--;
        });
      } else {
        _timer?.cancel();
        _submitTest(autoSubmitted: true);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatTimer(int totalSeconds) {
    int minutes = totalSeconds ~/ 60;
    int seconds = totalSeconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  void _onOptionSelected(int optionIndex) {
    setState(() {
      _userAnswers[_currentIndex] = optionIndex;
    });
  }

  void _clearResponse() {
    setState(() {
      _userAnswers[_currentIndex] = null;
      _questionStatuses[_currentIndex] = QuestionStatus.unanswered;
    });
  }

  void _markForReview() {
    setState(() {
      _questionStatuses[_currentIndex] = QuestionStatus.markedForReview;
      if (_currentIndex < widget.test.questions.length - 1) {
        _currentIndex++;
        if (_questionStatuses[_currentIndex] == QuestionStatus.notVisited) {
          _questionStatuses[_currentIndex] = QuestionStatus.unanswered;
        }
      }
    });
  }

  void _saveAndNext() {
    setState(() {
      if (_userAnswers[_currentIndex] != null) {
        _questionStatuses[_currentIndex] = QuestionStatus.answered;
      } else {
        _questionStatuses[_currentIndex] = QuestionStatus.unanswered;
      }

      if (_currentIndex < widget.test.questions.length - 1) {
        _currentIndex++;
        if (_questionStatuses[_currentIndex] == QuestionStatus.notVisited) {
          _questionStatuses[_currentIndex] = QuestionStatus.unanswered;
        }
      }
    });
  }

  void _jumpToQuestion(int index) {
    setState(() {
      _currentIndex = index;
      if (_questionStatuses[_currentIndex] == QuestionStatus.notVisited) {
        _questionStatuses[_currentIndex] = QuestionStatus.unanswered;
      }
    });
    Navigator.pop(context); // Palette BottomSheet बंद करें
  }

  void _showQuestionPalette() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(16),
          height: MediaQuery.of(context).size.height * 0.65,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "Question Palette",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(context),
                  )
                ],
              ),
              const Divider(),
              // Legends
              Wrap(
                spacing: 12,
                runSpacing: 8,
                children: [
                  _legendItem("Answered", Colors.green),
                  _legendItem("Unanswered", Colors.red),
                  _legendItem("Marked", Colors.purple),
                  _legendItem("Not Visited", Colors.grey.shade300),
                ],
              ),
              const SizedBox(height: 16),
              Expanded(
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 5,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                  ),
                  itemCount: widget.test.questions.length,
                  itemBuilder: (context, index) {
                    Color btnColor;
                    Color textColor = Colors.white;

                    switch (_questionStatuses[index]) {
                      case QuestionStatus.answered:
                        btnColor = Colors.green;
                        break;
                      case QuestionStatus.unanswered:
                        btnColor = Colors.red;
                        break;
                      case QuestionStatus.markedForReview:
                        btnColor = Colors.purple;
                        break;
                      default:
                        btnColor = Colors.grey.shade300;
                        textColor = Colors.black;
                    }

                    bool isCurrent = index == _currentIndex;

                    return GestureDetector(
                      onTap: () => _jumpToQuestion(index),
                      child: Container(
                        decoration: BoxDecoration(
                          color: btnColor,
                          borderRadius: BorderRadius.circular(8),
                          border: isCurrent
                              ? Border.all(color: Colors.blue.shade900, width: 3)
                              : null,
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          '${index + 1}',
                          style: TextStyle(
                            color: textColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _legendItem(String label, Color color) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }

  void _submitTest({bool autoSubmitted = false}) {
    int answeredCount = _questionStatuses.values
        .where((s) => s == QuestionStatus.answered)
        .length;
    int unAnsweredCount = widget.test.questions.length - answeredCount;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text(autoSubmitted ? "समय समाप्त हो गया!" : "टेस्ट सबमिट करें?"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("कुल प्रश्न: ${widget.test.questions.length}"),
            Text("हल किए गए प्रश्न: $answeredCount",
                style: const TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
            Text("छोड़े गए प्रश्न: $unAnsweredCount",
                style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 12),
            const Text("क्या आप वाकई अपना रिजल्ट जमा करना चाहते हैं?"),
          ],
        ),
        actions: [
          if (!autoSubmitted)
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("कैंसल"),
            ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.indigo),
            onPressed: () {
              Navigator.pop(context); // Dialog बंद करें
              _processResultAndNavigate();
            },
            child: const Text("हाँ, सबमिट करें", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _processResultAndNavigate() {
    // यहाँ अपनी API कॉल करके रिजल्ट बैकएंड को भेजें और Score Page पर जाएँ
    Navigator.pop(context); // Quiz स्क्रीन बंद करें
  }

  @override
  Widget build(BuildContext context) {
    final currentQuestion = widget.test.questions[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.indigo,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.test.title,
              style: const TextStyle(fontSize: 14, color: Colors.white),
            ),
            Text(
              "Question ${_currentIndex + 1} of ${widget.test.questions.length}",
              style: const TextStyle(fontSize: 12, color: Colors.white70),
            ),
          ],
        ),
        actions: [
          // Timer Widget
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: _remainingSeconds < 300 ? Colors.red : Colors.indigo.shade800,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const Icon(Icons.timer, color: Colors.white, size: 16),
                const SizedBox(width: 4),
                Text(
                  _formatTimer(_remainingSeconds),
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                ),
              ],
            ),
          ),
          // Question Palette Grid Toggle
          IconButton(
            icon: const Icon(Icons.grid_view, color: Colors.white),
            onPressed: _showQuestionPalette,
          ),
        ],
      ),
      body: Column(
        children: [
          // Question Header Card
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.indigo.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      currentQuestion.questionText,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Options List
                  ...List.generate(currentQuestion.options.length, (optIndex) {
                    bool isSelected = _userAnswers[_currentIndex] == optIndex;

                    return GestureDetector(
                      onTap: () => _onOptionSelected(optIndex),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.indigo.shade100 : Colors.white,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: isSelected ? Colors.indigo : Colors.grey.shade300,
                            width: isSelected ? 2 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 14,
                              backgroundColor:
                                  isSelected ? Colors.indigo : Colors.grey.shade200,
                              child: Text(
                                String.fromCharCode(65 + optIndex), // A, B, C, D
                                style: TextStyle(
                                  fontSize: 12,
                                  color: isSelected ? Colors.white : Colors.black87,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                currentQuestion.options[optIndex],
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight:
                                      isSelected ? FontWeight.bold : FontWeight.normal,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),

          // Bottom Action Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 10,
                  offset: const Offset(0, -3),
                )
              ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: _clearResponse,
                      child: const Text("Clear"),
                    ),
                    OutlinedButton(
                      style: OutlinedButton.styleFrom(foregroundColor: Colors.purple),
                      onPressed: _markForReview,
                      child: const Text("Mark for Review"),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.indigo),
                      onPressed: _saveAndNext,
                      child: const Text("Save & Next", style: TextStyle(color: Colors.white)),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                    onPressed: () => _submitTest(),
                    child: const Text("Submit Final Test",
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

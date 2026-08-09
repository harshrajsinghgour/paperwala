import 'package:flutter/material.dart';

class FlashcardsScreen extends StatefulWidget {
  const FlashcardsScreen({Key? key}) : super(key: key);

  @override
  State<FlashcardsScreen> createState() => _FlashcardsScreenState();
}

class _FlashcardsScreenState extends State<FlashcardsScreen> {
  bool showAnswer = false;

  final List<Map<String, String>> flashcards = [
    {"q": "Article 72 of Indian Constitution", "a": "Pardoning Power of the President"},
    {"q": "Shortcut key for Undo in MS Word", "a": "Ctrl + Z"},
    {"q": "Mandi in Bhilwara District famous for?", "a": "Textile & Wholesale Hub"},
    {"q": "Opposite Letter of 'E' in English Alphabet", "a": "V (A-Z trick)"},
  ];

  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    var card = flashcards[currentIndex];
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Smart Revision Vault", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            LinearProgressIndicator(
              value: (currentIndex + 1) / flashcards.length,
              backgroundColor: Colors.white10,
              color: const Color(0xFFEAB308),
            ),
            const SizedBox(height: 30),
            
            // Flip Flashcard UI
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => showAnswer = !showAnswer),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFEAB308).withOpacity(0.4)),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        showAnswer ? "ANSWER" : "QUESTION",
                        style: TextStyle(color: showAnswer ? Colors.greenAccent : const Color(0xFFEAB308), fontWeight: FontWeight.bold, fontSize: 12, letterSpacing: 1.5),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        showAnswer ? card['a']! : card['q']!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold, height: 1.4),
                      ),
                      const SizedBox(height: 30),
                      const Text(
                        "Tap card to flip",
                        style: TextStyle(color: Colors.grey, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Navigation Buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(side: const BorderSide(color: Colors.redAccent), padding: const EdgeInsets.symmetric(vertical: 14)),
                    onPressed: () {
                      setState(() {
                        showAnswer = false;
                        if (currentIndex < flashcards.length - 1) currentIndex++;
                      });
                    },
                    child: const Text("Still Confused", style: TextStyle(color: Colors.redAccent)),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFEAB308), foregroundColor: Colors.black, padding: const EdgeInsets.symmetric(vertical: 14)),
                    onPressed: () {
                      setState(() {
                        showAnswer = false;
                        if (currentIndex < flashcards.length - 1) currentIndex++;
                      });
                    },
                    child: const Text("Mastered", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

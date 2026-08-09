import 'package:flutter/material.dart';

class NotesDetailScreen extends StatelessWidget {
  final String noteTitle;

  const NotesDetailScreen({Key? key, required this.noteTitle}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: Text(noteTitle, style: const TextStyle(color: Colors.white, fontSize: 15)),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_border_rounded, color: Color(0xFFEAB308)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Note bookmarked to saved list!")));
            },
          ),
          IconButton(
            icon: const Icon(Icons.share_rounded, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: Stack(
        children: [
          // 1. Background Watermark Layer (Logo & App Name on every page)
          Positioned.fill(
            child: IgnorePointer(
              child: Center(
                child: Opacity(
                  opacity: 0.07, // हल्का रखा है ताकि नोट्स साफ़-साफ़ दिखाई दें
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Icon(Icons.menu_book_rounded, size: 120, color: Colors.white),
                      SizedBox(height: 12),
                      Text(
                        "PAPER WALA",
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 3,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          // 2. Foreground Actual Notes Content Layer
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B).withOpacity(0.9),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.menu_book, color: Color(0xFFEAB308), size: 18),
                      SizedBox(width: 8),
                      Text("Subject: Reasoning & General Intelligence", style: TextStyle(color: Colors.grey, fontSize: 12)),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                const Text("महत्वपूर्ण नियम एवं शॉर्टकट ट्रिक्स (Key Concepts)", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                const Text(
                  "1. इस अध्याय के अंतर्गत आने वाले सभी प्रश्नों को हल करने के लिए बुनियादी नियमों की जानकारी होना आवश्यक है。\n\n"
                  "2. परीक्षा में समय बचाने के लिए विकल्पों (Options) का उपयोग करना सीखें。\n\n"
                  "3. नीचे दिए गए उदाहरणों का अभ्यास करें:\n"
                  "• यदि A = 1, B = 2 है, तो Z का मान 26 होगा。\n"
                  "• कोडिंग-डिकोडिंग के सवालों में विपरीत अक्षरों (Opposite Letters) का विशेष ध्यान रखें।",
                  style: TextStyle(color: Colors.white70, fontSize: 15, height: 1.6),
                ),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B).withOpacity(0.9),
                    border: Border.all(color: Colors.amber.withOpacity(0.3)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.lightbulb_outline, color: Color(0xFFEAB308)),
                          SizedBox(width: 8),
                          Text("Exam Tip / परीक्षा टिप", style: TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold)),
                        ],
                      ),
                      SizedBox(height: 8),
                      Text("इस टॉपिक से पिछले 3 वर्षों की परीक्षाओं में कम से कम 2 से 3 प्रश्न पूछे गए हैं। इसका निरंतर अभ्यास करें।", style: TextStyle(color: Colors.white, fontSize: 13, height: 1.4)),
                    ],
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

import 'package:flutter/material.dart';

class AIDoubtSolverScreen extends StatefulWidget {
  const AIDoubtSolverScreen({Key? key}) : super(key: key);

  @override
  State<AIDoubtSolverScreen> createState() => _AIDoubtSolverScreenState();
}

class _AIDoubtSolverScreenState extends State<AIDoubtSolverScreen> {
  final TextEditingController _doubtController = TextEditingController();
  final List<Map<String, dynamic>> _messages = [
    {"sender": "ai", "text": "नमस्ते! मैं आपका AI Study Assistant हूँ। अपनी पढ़ाई या किसी भी सवाल से जुड़ा डाउट यहाँ पूछें।"}
  ];

  void _sendMessage() {
    if (_doubtController.text.trim().isEmpty) return;

    String userText = _doubtController.text;
    setState(() {
      _messages.add({"sender": "user", "text": userText});
      _doubtController.clear();
      // Simulated AI Instant Response
      _messages.add({
        "sender": "ai",
        "text": "सटीक उत्तर: इस प्रश्न का हल नीचे दिया गया है...\n\n• स्टेप 1: दिए गए डेटा को फॉर्मूला में रखें।\n• स्टेप 2: कैलकुलेशन करने पर सही उत्तर प्राप्त होगा।"
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: Color(0xFFEAB308), size: 20),
            SizedBox(width: 8),
            Text("AI Doubt Solver", style: TextStyle(color: Colors.white, fontSize: 16)),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                bool isUser = msg['sender'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.all(12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
                    decoration: BoxDecoration(
                      color: isUser ? const Color(0xFFEAB308) : const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      msg['text'],
                      style: TextStyle(color: isUser ? Colors.black : Colors.white, fontSize: 14, height: 1.4),
                    ),
                  ),
                );
              },
            ),
          ),
          // Input Box & Camera Upload for Doubt
          Container(
            padding: const EdgeInsets.all(10),
            color: const Color(0xFF1E293B),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.camera_alt_rounded, color: Color(0xFFEAB308)),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Capture Question Image for AI OCR Solution")),
                    );
                  },
                ),
                Expanded(
                  child: TextField(
                    controller: _doubtController,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      hintText: "अपना सवाल यहाँ टाइप करें...",
                      hintStyle: TextStyle(color: Colors.grey),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send_rounded, color: Color(0xFFEAB308)),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

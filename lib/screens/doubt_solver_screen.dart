import 'package:flutter/material.dart';

class DoubtSolverScreen extends StatelessWidget {
  const DoubtSolverScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("AI Doubt Solver & Assistant", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: Column(
        children: [
          // Chat History / Messages View
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildChatBubble("Hello Harshraj! I am your Paper Wala AI Tutor. Send any question or upload a photo of a tough problem, and I will solve it instantly.", false),
                _buildChatBubble("Q: यदि किसी संख्या का 40%, 80 है, तो वह संख्या क्या होगी?", true),
                _buildChatBubble("Solution:\nमान लीजिए संख्या x है।\nx का 40% = 80\n(x * 40) / 100 = 80\nx = (80 * 100) / 40 = 200\n\nअतः सही उत्तर **200** है।", false),
              ],
            ),
          ),
          
          // Bottom Input Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: const Color(0xFF1E293B),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.camera_alt, color: Color(0xFFEAB308)),
                  onPressed: () {},
                ),
                const Expanded(
                  child: TextField(
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: "Type your doubt here...",
                      hintStyle: TextStyle(color: Colors.grey),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: Color(0xFFEAB308)),
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatBubble(String message, bool isMe) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        constraints: const BoxConstraints(maxWidth: 280),
        decoration: BoxDecoration(
          color: isMe ? const Color(0xFFEAB308) : const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(14),
        ),
        child: Text(
          message,
          style: TextStyle(color: isMe ? Colors.black : Colors.white, fontSize: 13, height: 1.4),
        ),
      ),
    );
  }
}

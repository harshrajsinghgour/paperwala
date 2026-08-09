import 'package:flutter/material.dart';

class ArticleDetailScreen extends StatefulWidget {
  final String headline;

  const ArticleDetailScreen({Key? key, required this.headline}) : super(key: key);

  @override
  State<ArticleDetailScreen> createState() => _ArticleDetailScreenState();
}

class _ArticleDetailScreenState extends State<ArticleDetailScreen> {
  bool isPlaying = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      extendBodyBehindAppBar: true,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Placeholder for News Image
            Container(
              height: 250,
              width: double.infinity,
              decoration: const BoxDecoration(
                color: Color(0xFF1E293B),
                image: DecorationImage(
                  image: NetworkImage('https://via.placeholder.com/600x400/1E293B/EAB308?text=Current+Affairs+Image'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(color: Colors.redAccent.withOpacity(0.2), borderRadius: BorderRadius.circular(4)),
                        child: const Text("National", style: TextStyle(color: Colors.redAccent, fontSize: 11, fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(width: 10),
                      const Text("12 Aug 2026", style: TextStyle(color: Colors.grey, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(widget.headline, style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold, height: 1.3)),
                  const SizedBox(height: 20),
                  
                  // AI Audio Player Bar
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(50)),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: const Color(0xFFEAB308),
                          child: IconButton(
                            icon: Icon(isPlaying ? Icons.pause : Icons.play_arrow, color: Colors.black),
                            onPressed: () => setState(() => isPlaying = !isPlaying),
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Expanded(child: Text("Listen to AI Audio Summary", style: TextStyle(color: Colors.white, fontWeight: FontWeight.w500))),
                        const Icon(Icons.multitrack_audio_rounded, color: Color(0xFFEAB308)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Article Content
                  const Text(
                    "हाल ही में सरकार ने कई नई योजनाओं की घोषणा की है जिसका सीधा असर आगामी भर्ती परीक्षाओं (Agniveervayu, Rajasthan Staff Selection Board) पर पड़ेगा। इन योजनाओं के तहत डिजिटल शिक्षा को बढ़ावा देने के लिए विशेष फण्ड आवंटित किया गया है।\n\n"
                    "छात्रों को सलाह दी जाती है कि वे इस विषय को गहराई से पढ़ें क्योंकि यह आगामी SSC और State PSC परीक्षाओं के दृष्टिकोण से अत्यंत महत्वपूर्ण है। यह फैसला युवाओं को बेहतर अवसर प्रदान करने के लिए लिया गया है।\n\n"
                    "विभिन्न विभागों में इसके इम्पलिमेंटेशन की प्रक्रिया शुरू हो चुकी है।",
                    style: TextStyle(color: Colors.white70, fontSize: 16, height: 1.6),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

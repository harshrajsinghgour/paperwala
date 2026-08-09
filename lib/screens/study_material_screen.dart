import 'package:flutter/material.dart';

class StudyMaterialScreen extends StatelessWidget {
  const StudyMaterialScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List materials = [
      {"title": "Complete Formula Book (Maths & Reasoning)", "files": "45 PDFs", "size": "18 MB"},
      {"title": "Polity & History Short Notes", "files": "30 PDFs", "size": "24 MB"},
      {"title": "English Grammar & Vocabulary Handbooks", "files": "25 PDFs", "size": "12 MB"},
      {"title": "Monthly Current Affairs Compilations", "files": "12 PDFs", "size": "30 MB"},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Notes & Study Material Vault", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: materials.length,
        itemBuilder: (context, index) {
          var item = materials[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: const CircleAvatar(backgroundColor: Color(0xFFEAB308), child: Icon(Icons.menu_book, color: Colors.black)),
              title: Text(item['title'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
              subtitle: Text("${item['files']} | ${item['size']}", style: const TextStyle(color: Colors.grey, fontSize: 12)),
              trailing: const Icon(Icons.download_rounded, color: Color(0xFFEAB308)),
              onTap: () {},
            ),
          );
        },
      ),
    );
  }
}

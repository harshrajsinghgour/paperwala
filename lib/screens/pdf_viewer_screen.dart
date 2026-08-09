import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';

class PDFViewerScreen extends StatelessWidget {
  final String title;
  final String pdfUrl; // Web URL or Asset path

  const PDFViewerScreen({Key? key, required this.title, required this.pdfUrl}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 16)),
        actions: [
          IconButton(
            icon: const Icon(Icons.download_rounded, color: Color(0xFFEAB308)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Downloading securely to offline vault...")),
              );
            },
          )
        ],
      ),
      // PDF Viewer Integration (Internet Required if URL is passed)
      body: SfPdfViewer.network(
        pdfUrl,
        canShowScrollHead: false,
        canShowScrollStatus: false,
      ),
    );
  }
}

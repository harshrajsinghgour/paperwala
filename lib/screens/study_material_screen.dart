import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';

class StudyMaterialScreen extends StatefulWidget {
  const StudyMaterialScreen({Key? key}) : super(key: key);

  @override
  State<StudyMaterialScreen> createState() => _StudyMaterialScreenState();
}

class _StudyMaterialScreenState extends State<StudyMaterialScreen> {
  bool _isLoading = true;
  List<dynamic> _materials = [];
  String _selectedFilter = 'All';

  final String baseUrl = 'https://paper-wala-backend.onrender.com/api'; // अपना API URL डालें

  @override
  void initState() {
    super.initState();
    _fetchStudyMaterials();
  }

  Future<void> _fetchStudyMaterials() async {
    setState(() => _isLoading = true);
    try {
      final res = await http.get(Uri.parse('$baseUrl/extra/study-materials'));
      if (res.statusCode == 200) {
        final body = jsonDecode(res.body);
        setState(() {
          _materials = body['data'] ?? []; // Backend {success, data} bhejta hai
          _isLoading = false;
        });
      } else {
        setState(() => _isLoading = false);
      }
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  // URL खोलने के लिए Helper Function
  Future<void> _openUrl(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('लिंक खोलने में समस्या आ रही है'), backgroundColor: Colors.red),
      );
    }
  }

  // Text Notes Dialog
  void _showTextNotes(String title, String content) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF1E293B),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.75,
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const Divider(color: Colors.grey),
            Expanded(
              child: SingleChildScrollView(
                child: Text(
                  content,
                  style: const TextStyle(fontSize: 15, height: 1.5, color: Colors.white70),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Image Preview Dialog
  void _showImagePreview(String title, String imageUrl) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: const Color(0xFF1E293B),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.network(
              imageUrl,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) =>
                  const Padding(padding: EdgeInsets.all(20), child: Text("Image Load Error", style: TextStyle(color: Colors.white))),
            ),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final filteredList = _selectedFilter == 'All'
        ? _materials
        : _materials.where((item) => (item['type'] ?? '').toString().toLowerCase() == _selectedFilter.toLowerCase()).toList();

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // Dark BG
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Notes & Study Material Vault 📚", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(icon: const Icon(Icons.refresh, color: Colors.white), onPressed: _fetchStudyMaterials)
        ],
      ),
      body: Column(
        children: [
          // TYPE FILTER CHIPS
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: ['All', 'PDF', 'Video', 'Text', 'Image', 'Link'].map((type) {
                final isSelected = _selectedFilter == type;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: ChoiceChip(

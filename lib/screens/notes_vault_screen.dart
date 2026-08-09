import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class NotesVaultScreen extends StatelessWidget {
  const NotesVaultScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Secure Study Vault', style: TextStyle(color: AppTheme.royalGold, fontSize: 18)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildVaultFolder('Handwritten Class Notes', '142 Files', Icons.border_color),
          _buildVaultFolder('Previous Year Question Papers (PYQ)', '85 Files', Icons.history_edu),
          _buildVaultFolder('Formula Sheets & Short Tricks', '32 Files', Icons.functions),
          const SizedBox(height: 20),
          const Text('Recent Material Downloads', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          _buildFileRow('Maths_Advance_Tricks_2026.pdf', '4.2 MB • Encrypted Offline View'),
          _buildFileRow('Reasoning_Shortcuts_Handwritten.pdf', '8.1 MB • Encrypted Offline View'),
        ],
      ),
    );
  }

  Widget _buildVaultFolder(String title, String count, IconData icon) {
    return Card(
      color: AppTheme.cardBackground,
      margin: const EdgeInsets.only(bottom: 10),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: const BorderSide(color: AppTheme.cardBorder)),
      child: ListTile(
        leading: Icon(icon, color: AppTheme.royalGold),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(count, style: const TextStyle(color: AppTheme.textMuted, fontSize: 12)),
        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMuted),
        onTap: () {},
      ),
    );
  }

  Widget _buildFileRow(String fileName, String details) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.cardBackground,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.cardBorder),
      ),
      child: Row(
        children: [
          const Icon(Icons.picture_as_pdf, color: AppTheme.accentRed),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text(fileName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                Text(details, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
              ],
            ),
          ),
          const Icon(Icons.lock_clock, color: AppTheme.royalGold, size: 18),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

class JobDetailScreen extends StatelessWidget {
  final String jobTitle;

  const JobDetailScreen({Key? key, required this.jobTitle}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // Dark Navy
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: Text(jobTitle, style: const TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.verified, color: Colors.blueAccent, size: 20),
                      const SizedBox(width: 8),
                      Text(jobTitle, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text("Staff Selection Commission (SSC) / Railway Recruitment Board", style: TextStyle(color: Colors.grey, fontSize: 13)),
                  const Divider(color: Colors.white24, height: 24),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _DetailItem(title: "Total Posts", value: "15,400+"),
                      _DetailItem(title: "Last Date", value: "25 Aug 2026"),
                      _DetailItem(title: "Eligibility", value: "12th / Grad"),
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Important Dates & Fee
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: _buildInfoCard(
                    "Important Dates",
                    "• Apply Start: 01 Aug 2026\n• Last Date: 25 Aug 2026\n• Exam Date: Nov 2026",
                    Icons.calendar_month,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildInfoCard(
                    "Application Fee",
                    "• Gen/OBC: ₹100\n• SC/ST/Female: ₹0\n• Payment: Online",
                    Icons.currency_rupee,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Age Limit
            _buildInfoCard("Age Limit (As on 01/01/2026)", "• Minimum Age: 18 Years\n• Maximum Age: 27-32 Years (Post Wise)\n• Age Relaxation Extra as per Rules.", Icons.person),
            const SizedBox(height: 24),

            const Text("Important Links", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),

            // Action Buttons
            _buildLinkButton("Apply Online", Icons.ads_click, const Color(0xFFEAB308), true),
            _buildLinkButton("Download Official Notification", Icons.picture_as_pdf, Colors.blueAccent, false),
            _buildLinkButton("Download Syllabus", Icons.menu_book, Colors.green, false),
            _buildLinkButton("Join Indian Army / CRPF Updates", Icons.security, Colors.deepOrangeAccent, false),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoCard(String title, String details, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: const Color(0xFFEAB308), size: 18),
              const SizedBox(width: 8),
              Expanded(child: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14))),
            ],
          ),
          const SizedBox(height: 8),
          Text(details, style: const TextStyle(color: Colors.white70, fontSize: 13, height: 1.5)),
        ],
      ),
    );
  }

  Widget _buildLinkButton(String label, IconData icon, Color color, bool isPrimary) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: isPrimary ? color : const Color(0xFF1E293B),
            foregroundColor: isPrimary ? Colors.black : color,
            side: isPrimary ? null : BorderSide(color: color),
            padding: const EdgeInsets.symmetric(vertical: 14),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
          icon: Icon(icon),
          label: Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
          onPressed: () {},
        ),
      ),
    );
  }
}

class _DetailItem extends StatelessWidget {
  final String title;
  final String value;
  const _DetailItem({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold, fontSize: 14)),
      ],
    );
  }
}

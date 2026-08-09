import 'package:flutter/material.dart';

class ProPlanScreen extends StatelessWidget {
  const ProPlanScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("Upgrade to Pro Pass", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Banner Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFEAB308), Color(0xFFCA8A04)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Icon(Icons.workspace_premium, color: Colors.black, size: 36),
                  SizedBox(height: 12),
                  Text("Paper Wala All-Exam Pro Pass", style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
                  SizedBox(height: 6),
                  Text("Get unlimited access to All Test Series, PYQs, Mains Subjective AI Evaluation & Notes Vault.", style: TextStyle(color: Colors.black87, fontSize: 13, height: 1.4)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Benefits list
            _buildBenefitItem("Unlimited Full & Chapter Test Series (Pre + Mains)"),
            _buildBenefitItem("AI Handwriting Evaluator for Subjective Answers"),
            _buildBenefitItem("Ad-free High Quality PDF Notes Vault"),
            _buildBenefitItem("Current Affairs Audio Summaries & Daily Quizzes"),
            const SizedBox(height: 20),

            // Pricing Options
            _buildPricingCard("Monthly Pass", "₹99", "Valid for 30 Days", false),
            const SizedBox(height: 12),
            _buildPricingCard("Exam Target Pass (Best Value)", "₹299", "Valid till Exam Complete", true),
            const SizedBox(height: 24),

            // Pay Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFEAB308),
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Processing Secure UPI Payment...")),
                  );
                },
                child: const Text("BUY PRO PASS NOW", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBenefitItem(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          const Icon(Icons.check_circle_rounded, color: Color(0xFFEAB308), size: 18),
          const SizedBox(width: 10),
          Expanded(child: Text(text, style: const TextStyle(color: Colors.white70, fontSize: 13))),
        ],
      ),
    );
  }

  Widget _buildPricingCard(String title, String price, String validity, bool isHighlighted) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        border: Border.all(color: isHighlighted ? const Color(0xFFEAB308) : Colors.transparent, width: 2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
              const SizedBox(height: 4),
              Text(validity, style: const TextStyle(color: Colors.grey, fontSize: 11)),
            ],
          ),
          Text(price, style: const TextStyle(color: Color(0xFFEAB308), fontWeight: FontWeight.bold, fontSize: 20)),
        ],
      ),
    );
  }
}

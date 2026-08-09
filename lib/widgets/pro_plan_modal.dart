import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ProPlanModal extends StatelessWidget {
  final int daysRemaining;

  const ProPlanModal({Key? key, required this.daysRemaining}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: AppTheme.cardBackground,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        border: Border(top: BorderSide(color: AppTheme.royalGold, width: 2)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: const [
                  Icon(Icons.workspace_premium, color: AppTheme.royalGold, size: 28),
                  SizedBox(width: 8),
                  Text(
                    'PAPER WALA ROYAL PRO',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.royalGold,
                      letterSpacing: 0.8,
                    ),
                  ),
                ],
              ),
              IconButton(
                icon: const Icon(Icons.close, color: AppTheme.textMuted),
                onPressed: () => Navigator.pop(context),
              )
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.darkBackground,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.cardBorder),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAlignment.start,
                  children: [
                    const Text('Status: Active Pro Member', style: TextStyle(color: AppTheme.accentGreen, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    Text(
                      'Validity Remaining: $daysRemaining Days',
                      style: const TextStyle(fontSize: 14, color: AppTheme.textWhite, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.royalGold.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '$daysRemaining DAYS LEFT',
                    style: const TextStyle(color: AppTheme.royalGold, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 20),
          const Text('Pro Benefits Included:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 12),
          _buildBenefitItem('100% Ad-Free Distraction-Free Experience'),
          _buildBenefitItem('Unlimited Mock Tests, PYQs & Solutions'),
          _buildBenefitItem('AI Deep Analytics & Subject Weakness Insights'),
          _buildBenefitItem('AI Audio Summaries & State/World Exam Feed'),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.royalGold,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: () {},
              child: const Text(
                'EXTEND / RENEW PRO PASS',
                style: TextStyle(color: AppTheme.darkBackground, fontWeight: FontWeight.bold, fontSize: 15),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBenefitItem(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        children: [
          const Icon(Icons.check_circle, color: AppTheme.royalGold, size: 18),
          const SizedBox(width: 8),
          Expanded(child: Text(text, style: const TextStyle(color: AppTheme.textMuted, fontSize: 13))),
        ],
      ),
    );
  }
}

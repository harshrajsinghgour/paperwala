import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Royal Color Palette
  static const Color darkBackground = Color(0FF0B0F19); // Deep Midnight Navy
  static const Color cardBackground = Color(0FF1E293B); // Royal Slate Card
  static const Color cardBorder = Color(0FF334155);
  static const Color royalGold = Color(0FFD4AF37);     // Primary Gold Accent
  static const Color royalGoldDark = Color(0FFB8860B);
  static const Color textWhite = Color(0FFFFFFFFFFFF);
  static const Color textMuted = Color(0FF94A3B8);
  static const Color accentGreen = Color(0FF10B981);
  static const Color accentRed = Color(0FFEF4444);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBackground,
      primaryColor: royalGold,
      colorScheme: const ColorScheme.dark(
        primary: royalGold,
        secondary: royalGoldDark,
        surface: cardBackground,
        background: darkBackground,
      ),
      textTheme: GoogleFonts.interTextTheme(
        ThemeData.dark().textTheme,
      ).apply(
        bodyColor: textWhite,
        displayColor: textWhite,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: darkBackground,
        elevation: 0,
        centerTitle: false,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: darkBackground,
        selectedItemColor: royalGold,
        unselectedItemColor: textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 12,
      ),
    );
  }
}

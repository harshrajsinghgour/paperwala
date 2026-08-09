import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/splash_screen.dart';
import 'screens/daily_challenge_screen.dart';
import 'screens/practice_screen.dart';
import 'screens/live_tests_screen.dart';
import 'screens/study_material_screen.dart';
import 'screens/leaderboard_screen.dart';
import 'screens/analytics_screen.dart';
import 'screens/exam_countdown_screen.dart';
import 'screens/flashcards_screen.dart';
import 'screens/doubt_solver_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/help_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const PaperWalaApp());
}

class PaperWalaApp extends StatelessWidget {
  const PaperWalaApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Paper Wala',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const SplashScreen(),
      routes: {
        '/main_nav': (context) => const MainNavigationScreen(),
        '/daily_challenge': (context) => const DailyChallengeScreen(),
        '/practice': (context) => const PracticeScreen(),
        '/live_tests': (context) => const LiveTestsScreen(),
        '/study_material': (context) => const StudyMaterialScreen(),
        '/leaderboard': (context) => const LeaderboardScreen(),
        '/analytics': (context) => const AnalyticsScreen(),
        '/exam_countdown': (context) => const ExamCountdownScreen(),
        '/flashcards': (context) => const FlashcardsScreen(),
        '/doubt_solver': (context) => const DoubtSolverScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/settings': (context) => const SettingsScreen(),
        '/help': (context) => const HelpScreen(),
      },
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreenContent(),
    const PracticeScreen(),
    const LiveTestsScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        backgroundColor: const Color(0xFF1E293B),
        selectedItemColor: const Color(0xFFEAB308),
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.fitness_center),
            label: 'Practice',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.timer),
            label: 'Live Tests',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class HomeScreenContent extends StatelessWidget {
  const HomeScreenContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Paper Wala Dashboard", style: TextStyle(fontSize: 16)),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active, color: Color(0xFFEAB308)),
            onPressed: () => Navigator.pushNamed(context, '/exam_countdown'),
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => Navigator.pushNamed(context, '/settings'),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text("Quick Access Features", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 12),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 1.3,
            children: [
              _buildFeatureCard(context, "Daily Challenge", Icons.quiz, '/daily_challenge'),
              _buildFeatureCard(context, "Practice Zone", Icons.fitness_center, '/practice'),
              _buildFeatureCard(context, "Live Tests", Icons.timer, '/live_tests'),
              _buildFeatureCard(context, "Study Material", Icons.menu_book, '/study_material'),
              _buildFeatureCard(context, "Leaderboard", Icons.leaderboard, '/leaderboard'),
              _buildFeatureCard(context, "Analytics", Icons.insights, '/analytics'),
              _buildFeatureCard(context, "Flashcards", Icons.style, '/flashcards'),
              _buildFeatureCard(context, "AI Doubt Solver", Icons.psychology, '/doubt_solver'),
              _buildFeatureCard(context, "Exam Countdown", Icons.event_note, '/exam_countdown'),
              _buildFeatureCard(context, "Help & Support", Icons.help, '/help'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard(BuildContext context, String title, IconData icon, String route) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white10),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: const Color(0xFFEAB308), size: 28),
            const SizedBox(height: 8),
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/test_provider.dart';

void main() {
  runApp(const PaperWalaApp());
}

class PaperWalaApp extends StatelessWidget {
  const PaperWalaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => TestProvider()),
      ],
      child: MaterialApp(
        title: 'Paper Wala',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.indigo,
          scaffoldBackgroundColor: const Color(0xFFF8F9FA),
          useMaterial3: true,
        ),
        home: const AppMainGate(),
      ),
    );
  }
}

// यह विजेट चेक करेगा कि यूजर लॉगिन है या नहीं
class AppMainGate extends StatelessWidget {
  const AppMainGate({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    if (authProvider.currentUser != null) {
      // यदि यूजर लॉगिन है तो होम स्क्रीन दिखाएं
      return const Scaffold(
        body: Center(child: Text("Welcome to Home Screen!")),
      );
    } else {
      // यदि यूजर लॉगिन नहीं है तो लॉगिन स्क्रीन दिखाएं
      return const Scaffold(
        body: Center(child: Text("Please Login First")),
      );
    }
  }
}
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/test_provider.dart';
import 'providers/app_data_provider.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const PaperWalaApp());
}

class PaperWalaApp extends StatelessWidget {
  const PaperWalaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => TestProvider()),
        ChangeNotifierProvider(create: (_) => AppDataProvider()),
      ],
      child: MaterialApp(
        title: 'Paper Wala',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.indigo,
          scaffoldBackgroundColor: const Color(0xFFF8F9FA),
          useMaterial3: true,
        ),
        home: const AppMainGate(),
      ),
    );
  }
}

class AppMainGate extends StatelessWidget {
  const AppMainGate({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    if (authProvider.currentUser != null) {
      return const HomeScreen();
    } else {
      return const LoginScreenDummy();
    }
  }
}

class LoginScreenDummy extends StatelessWidget {
  const LoginScreenDummy({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // ऑटो लॉगिन टेस्ट करने के लिए
            Provider.of<AuthProvider>(context, listen: false).login('harshraj@example.com', '123456');
          },
          child: const Text('लॉगिन करें (Demo Test)'),
        ),
      ),
    );
  }
}

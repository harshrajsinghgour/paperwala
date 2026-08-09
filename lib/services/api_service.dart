import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Android Emulator ke liye 10.0.2.2 use karein. Real Device me apne PC ka Local IP daalein (e.g. http://192.168.1.5:5000/api)
  static const String baseUrl = 'http://10.0.2.2:5000/api';

  static Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String targetExam,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'targetExam': targetExam,
      }),
    );
    return jsonDecode(response.body);
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return jsonDecode(response.body);
  }

  static Future<List<dynamic>> getTestsByCategory(String category) async {
    final response = await http.get(Uri.parse('$baseUrl/tests/$category'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    return [];
  }

  static Future<bool> submitTestResult({
    required String userId,
    required String testId,
    required int score,
    required int totalQuestions,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/tests/submit'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'userId': userId,
        'testId': testId,
        'score': score,
        'totalQuestions': totalQuestions,
      }),
    );
    return response.statusCode == 201;
  }

  static Future<List<dynamic>> getLeaderboard() async {
    final response = await http.get(Uri.parse('$baseUrl/tests/leaderboard/top'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    return [];
  }
}
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Emulator ke liye 10.0.2.2. Production server pe apna domain/IP dalein.
  static const String baseUrl = 'http://10.0.2.2:5000/api';

  // ================= 1. AUTHENTICATION =================
  static Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String targetExam,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'targetExam': targetExam,
      }),
    );
    return jsonDecode(response.body);
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return jsonDecode(response.body);
  }

  // ================= 2. MOCK TESTS & LEADERBOARD =================
  static Future<List<dynamic>> getTestsByCategory(String category) async {
    final response = await http.get(Uri.parse('$baseUrl/tests/$category'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return [];
  }

  static Future<bool> submitTestResult({
    required String userId,
    required String testId,
    required int score,
    required int totalQuestions,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/tests/submit'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'userId': userId,
        'testId': testId,
        'score': score,
        'totalQuestions': totalQuestions,
      }),
    );
    return response.statusCode == 201;
  }

  static Future<List<dynamic>> getLeaderboard() async {
    final response = await http.get(Uri.parse('$baseUrl/tests/leaderboard/top'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return [];
  }

  // ================= 3. NOTES & STUDY MATERIAL =================
  static Future<List<dynamic>> getNotesByCategory(String category) async {
    final response = await http.get(Uri.parse('$baseUrl/extra/notes/$category'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return [];
  }

  // ================= 4. CURRENT AFFAIRS =================
  static Future<List<dynamic>> getCurrentAffairs() async {
    final response = await http.get(Uri.parse('$baseUrl/extra/current-affairs'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return [];
  }

  // ================= 5. DOUBTS & CHAT =================
  static Future<bool> submitDoubt({
    required String studentId,
    required String subject,
    required String questionText,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/extra/doubts'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'studentId': studentId,
        'subject': subject,
        'questionText': questionText,
      }),
    );
    return response.statusCode == 201;
  }

  static Future<List<dynamic>> getUserDoubts(String userId) async {
    final response = await http.get(Uri.parse('$baseUrl/extra/doubts/user/$userId'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return [];
  }

  // ================= 6. APP BANNERS & INFO =================
  static Future<Map<String, dynamic>> getAppConfig() async {
    final response = await http.get(Uri.parse('$baseUrl/extra/app-config'));
    if (response.statusCode == 200) return jsonDecode(response.body);
    return {};
  }
}

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

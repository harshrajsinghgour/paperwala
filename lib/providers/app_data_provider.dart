import 'package:flutter/foundation.dart';
import '../services/api_service.dart';

class AppDataProvider extends ChangeNotifier {
  List<dynamic> _currentAffairs = [];
  List<dynamic> _notesList = [];
  List<dynamic> _userDoubts = [];
  Map<String, dynamic> _appConfig = {};
  bool _isLoading = false;

  List<dynamic> get currentAffairs => _currentAffairs;
  List<dynamic> get notesList => _notesList;
  List<dynamic> get userDoubts => _userDoubts;
  Map<String, dynamic> get appConfig => _appConfig;
  bool get isLoading => _isLoading;

  // Load Everything on App Launch
  Future<void> fetchDashboardData(String userId, String defaultCategory) async {
    _isLoading = true;
    notifyListeners();

    try {
      _currentAffairs = await ApiService.getCurrentAffairs();
      _notesList = await ApiService.getNotesByCategory(defaultCategory);
      _appConfig = await ApiService.getAppConfig();
      if (userId.isNotEmpty) {
        _userDoubts = await ApiService.getUserDoubts(userId);
      }
    } catch (e) {
      if (kDebugMode) print("Error fetching dashboard data: $e");
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> askDoubt(String userId, String subject, String question) async {
    bool success = await ApiService.submitDoubt(
      studentId: userId,
      subject: subject,
      questionText: question,
    );
    if (success) {
      _userDoubts = await ApiService.getUserDoubts(userId);
      notifyListeners();
    }
    return success;
  }
}

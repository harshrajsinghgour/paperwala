import 'package:flutter/foundation.dart';
import '../models/test_model.dart';
import '../services/database_service.dart';

class TestProvider extends ChangeNotifier {
  final DatabaseService _dbService = DatabaseService();

  TestModel? _activeTest;
  Map<String, int> _userAnswers = {}; // questionId : selectedOptionIndex
  bool _isSubmitting = false;

  TestModel? get activeTest => _activeTest;
  Map<String, int> get userAnswers => _userAnswers;
  bool get isSubmitting => _isSubmitting;

  void startTest(TestModel test) {
    _activeTest = test;
    _userAnswers = {};
    notifyListeners();
  }

  void selectAnswer(String questionId, int optionIndex) {
    _userAnswers[questionId] = optionIndex;
    notifyListeners();
  }

  Future<int> calculateAndSubmitResult(String userId) async {
    if (_activeTest == null) return 0;

    _isSubmitting = true;
    notifyListeners();

    int score = 0;
    for (var q in _activeTest!.questions) {
      if (_userAnswers.containsKey(q.id) && _userAnswers[q.id] == q.correctOptionIndex) {
        score += 2; // मान लीजिए हर सही सवाल पर 2 नंबर मिलते हैं
      }
    }

    await _dbService.submitTestResult(
      uid: userId,
      testId: _activeTest!.id,
      score: score,
      totalQuestions: _activeTest!.questions.length,
      selectedAnswers: _userAnswers,
    );

    _isSubmitting = false;
    notifyListeners();
    return score;
  }
}

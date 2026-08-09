class QuestionModel {
  final String id;
  final String questionText;
  final List<String> options;
  final int correctOptionIndex;
  final String explanation;

  QuestionModel({
    required this.id,
    required this.questionText,
    required this.options,
    required this.correctOptionIndex,
    required this.explanation,
  });

  factory QuestionModel.fromMap(Map<String, dynamic> map, String docId) {
    return QuestionModel(
      id: docId,
      questionText: map['questionText'] ?? '',
      options: List<String>.from(map['options'] ?? []),
      correctOptionIndex: map['correctOptionIndex'] ?? 0,
      explanation: map['explanation'] ?? '',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'questionText': questionText,
      'options': options,
      'correctOptionIndex': correctOptionIndex,
      'explanation': explanation,
    };
  }
}

class TestModel {
  final String id;
  final String title;
  final String category; // e.g., SSC CGL, Railway, Rajasthan Exam
  final int durationMinutes;
  final int totalMarks;
  final List<QuestionModel> questions;

  TestModel({
    required this.id,
    required this.title,
    required this.category,
    required this.durationMinutes,
    required this.totalMarks,
    required this.questions,
  });

  factory TestModel.fromMap(Map<String, dynamic> map, String docId, List<QuestionModel> qList) {
    return TestModel(
      id: docId,
      title: map['title'] ?? '',
      category: map['category'] ?? '',
      durationMinutes: map['durationMinutes'] ?? 30,
      totalMarks: map['totalMarks'] ?? 100,
      questions: qList,
    );
  }
}

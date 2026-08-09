class UserProfile {
  final String userId;
  final String name;
  final bool isPro;
  final int proDaysRemaining;

  UserProfile({
    required this.userId,
    required this.name,
    required this.isPro,
    required this.proDaysRemaining,
  });
}

class TestSeriesItem {
  final String id;
  final String title;
  final String category;
  final double progress; // 0.0 to 1.0
  final int totalTests;
  final int completedTests;

  TestSeriesItem({
    required this.id,
    required this.title,
    required this.category,
    required this.progress,
    required this.totalTests,
    required this.completedTests,
  });
}

class JobAlert {
  final String id;
  final String title;
  final String category; // Vacancies, Admit Card, Answer Key, Result, Syllabus
  final String totalPosts;
  final String lastDate;
  final String qualification;

  JobAlert({
    required this.id,
    required this.title,
    required this.category,
    required this.totalPosts,
    required this.lastDate,
    required this.qualification,
  });
}

class CurrentAffairNews {
  final String id;
  final String title;
  final String summary;
  final String date;
  final String level; // World, National, State
  final String stateName;
  final String pillCategory; // Daily Briefs, AI Exam Target, Topic-Wise, Monthly

  CurrentAffairNews({
    required this.id,
    required this.title,
    required this.summary,
    required this.date,
    required this.level,
    this.stateName = '',
    required this.pillCategory,
  });
}

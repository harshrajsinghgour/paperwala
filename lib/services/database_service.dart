import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/user_model.dart';
import '../models/test_model.dart';

class DatabaseService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // 1. प्रोफाइल सेव करना
  Future<void> createUserProfile(UserModel user) async {
    await _db.collection('users').doc(user.uid).set(user.toMap());
  }

  // 2. प्रोफाइल फैच करना
  Future<UserModel?> getUserProfile(String uid) async {
    DocumentSnapshot doc = await _db.collection('users').doc(uid).get();
    if (doc.exists && doc.data() != null) {
      return UserModel.fromMap(doc.data() as Map<String, dynamic>, doc.id);
    }
    return null;
  }

  // 3. कैटेगरी के अनुसार टेस्ट फैच करना
  Future<List<TestModel>> fetchTestsByCategory(String category) async {
    QuerySnapshot testSnap = await _db
        .collection('tests')
        .where('category', isEqualTo: category)
        .get();

    List<TestModel> tests = [];

    for (var doc in testSnap.docs) {
      QuerySnapshot qSnap = await _db
          .collection('tests')
          .doc(doc.id)
          .collection('questions')
          .get();

      List<QuestionModel> questions = qSnap.docs
          .map((q) => QuestionModel.fromMap(q.data() as Map<String, dynamic>, q.id))
          .toList();

      tests.add(TestModel.fromMap(doc.data() as Map<String, dynamic>, doc.id, questions));
    }

    return tests;
  }

  // 4. टेस्ट का रिजल्ट सबमिट करना
  Future<void> submitTestResult({
    required String uid,
    required String testId,
    required int score,
    required int totalQuestions,
    required Map<String, int> selectedAnswers,
  }) async {
    await _db.collection('results').add({
      'userId': uid,
      'testId': testId,
      'score': score,
      'totalQuestions': totalQuestions,
      'userAnswers': selectedAnswers,
      'submittedAt': FieldValue.serverTimestamp(),
    });

    // यूजर का कुल स्कोर अपडेट करें (लीडरबोर्ड के लिए)
    await _db.collection('users').doc(uid).update({
      'totalScore': FieldValue.increment(score),
    });
  }

  // 5. लीडरबोर्ड डेटा प्राप्त करना
  Stream<List<Map<String, dynamic>>> getLeaderboard() {
    return _db
        .collection('users')
        .orderBy('totalScore', descending: true)
        .limit(20)
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              return {
                'name': doc['name'] ?? 'Student',
                'score': doc['totalScore'] ?? 0,
              };
            }).toList());
  }

  // 6. AI डाउट लॉग सेव करना
  Future<void> saveDoubtLog(String uid, String question, String answer) async {
    await _db.collection('users').doc(uid).collection('doubts').add({
      'question': question,
      'answer': answer,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}

import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  // साइनअप
  Future<UserCredential> signUp({required String email, required String password}) async {
    try {
      return await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // लॉगिन
  Future<UserCredential> login({required String email, required String password}) async {
    try {
      return await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // पासवर्ड रीसेट
  Future<void> sendPasswordResetEmail(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // लॉगआउट
  Future<void> signOut() async {
    await _auth.signOut();
  }

  String _handleAuthException(FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return 'इस ईमेल से कोई अकाउंट नहीं मिला।';
      case 'wrong-password':
        return 'पासवर्ड गलत है।';
      case 'email-already-in-use':
        return 'यह ईमेल पहले से रजिस्टर्ड है।';
      case 'weak-password':
        return 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।';
      default:
        return e.message ?? 'ऑथेंटिकेशन एरर। फिर से प्रयास करें।';
    }
  }
}

import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/auth_service.dart';
import '../services/database_service.dart';
import '../models/user_model.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();
  final DatabaseService _dbService = DatabaseService();

  UserModel? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  AuthProvider() {
    _initUser();
  }

  void _initUser() {
    _authService.authStateChanges.listen((User? firebaseUser) async {
      if (firebaseUser != null) {
        _currentUser = await _dbService.getUserProfile(firebaseUser.uid);
      } else {
        _currentUser = null;
      }
      notifyListeners();
    });
  }

  Future<bool> login(String email, String password) async {
    _setLoading(true);
    try {
      UserCredential creds = await _authService.login(email: email, password: password);
      _currentUser = await _dbService.getUserProfile(creds.user!.uid);
      _errorMessage = null;
      _setLoading(false);
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _setLoading(false);
      return false;
    }
  }

  Future<bool> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String targetExam,
  }) async {
    _setLoading(true);
    try {
      UserCredential creds = await _authService.signUp(email: email, password: password);
      
      UserModel newUser = UserModel(
        uid: creds.user!.uid,
        name: name,
        email: email,
        phone: phone,
        targetExam: targetExam,
        createdAt: DateTime.now(),
      );

      await _dbService.createUserProfile(newUser);
      _currentUser = newUser;
      _errorMessage = null;
      _setLoading(false);
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _setLoading(false);
      return false;
    }
  }

  Future<void> logout() async {
    await _authService.signOut();
    _currentUser = null;
    notifyListeners();
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}

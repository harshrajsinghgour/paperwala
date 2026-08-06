const db = require('../config/db');

exports.getTests = async (req, res) => {
    try {
        const { type } = req.query; // 'daily_challenge', 'quiz', 'live_test', etc.
        const query = type ? 'SELECT * FROM tests WHERE test_type = $1 ORDER BY id DESC' : 'SELECT * FROM tests ORDER BY id DESC';
        const params = type ? [type] : [];
        const tests = await db.query(query, params);
        res.json(tests.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTestQuestions = async (req, res) => {
    try {
        const { testId } = req.params;
        const questions = await db.query('SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions WHERE test_id = $1', [testId]);
        res.json(questions.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitTest = async (req, res) => {
    try {
        const { userId, testId, answers, timeTakenSeconds } = req.body; 
        const questionsRes = await db.query('SELECT id, correct_option FROM questions WHERE test_id = $1', [testId]);
        const questions = questionsRes.rows;

        let correct = 0, incorrect = 0, unattempted = 0;

        questions.forEach(q => {
            const userAns = answers[q.id];
            if (!userAns) unattempted++;
            else if (userAns === q.correct_option) correct++;
            else incorrect++;
        });

        const score = (correct * 2) - (incorrect * 0.5); // Example scoring
        const total = questions.length;
        const accuracy = total > 0 ? ((correct / (correct + incorrect)) * 100) || 0 : 0;

        // AI Result Analysis & Suggestions
        let aiSuggestions = "आपकी स्पीड अच्छी है। ";
        if (accuracy < 60) aiSuggestions += "आपको इस विषय के बेसिक्स पर दोबारा ध्यान देने की जरूरत है।";
        else if (accuracy >= 80) aiSuggestions += "शानदार प्रदर्शन! इस लय को बनाए रखें।";

        const attempt = await db.query(
            `INSERT INTO test_attempts (user_id, test_id, score, accuracy_percentage, time_taken_seconds, correct_count, incorrect_count, unattempted_count, ai_suggestions) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [userId, testId, score, accuracy.toFixed(2), timeTakenSeconds, correct, incorrect, unattempted, aiSuggestions]
        );

        res.json({ result: attempt.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await db.query('SELECT * FROM test_attempts WHERE user_id = $1 ORDER BY attempted_at DESC', [userId]);
        
        let avgScore = 0, avgAccuracy = 0;
        if (attempts.rows.length > 0) {
            avgScore = attempts.rows.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / attempts.rows.length;
            avgAccuracy = attempts.rows.reduce((acc, curr) => acc + parseFloat(curr.accuracy_percentage), 0) / attempts.rows.length;
        }

        res.json({
            totalTestsGiven: attempts.rows.length,
            averageScore: avgScore.toFixed(2),
            averageAccuracy: avgAccuracy.toFixed(2) + '%',
            recentAttempts: attempts.rows.slice(0, 5)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

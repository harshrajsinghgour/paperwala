const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, phone, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role === 'admin' ? 'admin' : 'student';

        const newUser = await db.query(
            'INSERT INTO users (username, phone, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, phone, role',
            [username, phone, hashedPassword, userRole]
        );

        const token = jwt.sign({ id: newUser.rows[0].id, role: newUser.rows[0].role }, process.env.JWT_SECRET);
        res.json({ token, user: newUser.rows[0] });
    } catch (err) {
        res.status(400).json({ error: 'Username or Phone already exists.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const userRes = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);

        if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found.' });
        const user = userRes.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user.id, username: user.username, phone: user.phone, role: user.role, is_muted: user.is_muted } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

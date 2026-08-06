const db = require('../config/db');

exports.getPaperWalaInfo = async (req, res) => {
    try {
        const info = await db.query('SELECT * FROM paperwala_info ORDER BY id DESC');
        res.json(info.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCurrentAffairs = async (req, res) => {
    try {
        const { type } = req.query; // 'daily', 'weekly', 'monthly', 'yearly'
        const query = type ? 'SELECT * FROM current_affairs WHERE type = $1 ORDER BY id DESC' : 'SELECT * FROM current_affairs ORDER BY id DESC';
        const ca = await db.query(query, type ? [type] : []);
        res.json(ca.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await db.query('SELECT * FROM notes ORDER BY subject ASC');
        res.json(notes.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

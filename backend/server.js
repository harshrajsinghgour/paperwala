require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(cors());
app.use(express.json());

// API Routes Integration
app.use('/api', apiRoutes);

let isGlobalChatEnabled = true;

// Real-time WebSocket Engine
io.on('connection', (socket) => {
    socket.on('join_chat', (userData) => {
        socket.userData = userData; 
        socket.join('paperwala_group_chat');
    });

    socket.on('send_message', async (data) => {
        const { userId, username, messageText } = data;

        if (!isGlobalChatEnabled && socket.userData?.role !== 'admin') {
            return socket.emit('error_msg', 'एडमिन द्वारा चैट वर्तमान में बंद की गई है।');
        }

        const userRes = await db.query('SELECT is_muted, is_banned FROM users WHERE id = $1', [userId]);
        if (userRes.rows[0]?.is_banned || userRes.rows[0]?.is_muted) {
            return socket.emit('error_msg', 'आपको मैसेज भेजने से प्रतिबंधित किया गया है।');
        }

        const newMsg = await db.query(
            'INSERT INTO chat_messages (user_id, username, message_text) VALUES ($1, $2, $3) RETURNING *',
            [userId, username, messageText]
        );

        io.to('paperwala_group_chat').emit('receive_message', newMsg.rows[0]);
    });

    // ADMIN CONTROLS
    socket.on('admin_delete_message', async ({ messageId }) => {
        if (socket.userData?.role === 'admin') {
            await db.query('DELETE FROM chat_messages WHERE id = $1', [messageId]);
            io.to('paperwala_group_chat').emit('message_deleted', { messageId });
        }
    });

    socket.on('admin_toggle_mute', async ({ targetUserId, muteStatus }) => {
        if (socket.userData?.role === 'admin') {
            await db.query('UPDATE users SET is_muted = $1 WHERE id = $2', [targetUserId, muteStatus]);
            io.to('paperwala_group_chat').emit('user_status_changed', { userId: targetUserId, isMuted: muteStatus });
        }
    });

    socket.on('admin_toggle_chat', ({ enabled }) => {
        if (socket.userData?.role === 'admin') {
            isGlobalChatEnabled = enabled;
            io.to('paperwala_group_chat').emit('chat_status_updated', { isGlobalChatEnabled });
        }
    });
});

// 24-Hour Auto Cleanup Cron Job for Chat
setInterval(async () => {
    try {
        await db.query("DELETE FROM chat_messages WHERE created_at < NOW() - INTERVAL '24 hours'");
        console.log("24-Hour Chat Auto Cleanup Executed.");
    } catch (err) { console.error("Cleanup Error:", err); }
}, 3600000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`PaperWala Backend Running on Port ${PORT}`));

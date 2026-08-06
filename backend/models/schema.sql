-- Database Schema for PaperWala Platform

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'student', -- 'student' or 'admin'
    is_muted BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Subscriptions Table (₹99, ₹279, ₹499, ₹899)
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(20) NOT NULL, -- 'monthly', 'quarterly', 'half_yearly', 'yearly'
    amount DECIMAL(10, 2) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
);

-- 3. Tier 1: Test Series (Daily Challenge, Quizzes, Live Tests, Suggestional)
CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    test_type VARCHAR(50) NOT NULL, -- 'daily_challenge', 'quiz', 'live_test', 'suggestional'
    category VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    total_marks DECIMAL(5, 2) NOT NULL,
    negative_marks DECIMAL(5, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL, -- Supports LaTeX / KaTeX
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL,
    explanation TEXT
);

CREATE TABLE IF NOT EXISTS test_attempts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    score DECIMAL(5, 2) NOT NULL,
    accuracy_percentage DECIMAL(5, 2) NOT NULL,
    time_taken_seconds INT NOT NULL,
    correct_count INT NOT NULL,
    incorrect_count INT NOT NULL,
    unattempted_count INT NOT NULL,
    ai_suggestions TEXT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tier 2: PaperWala Info (Scrolling Vacancies/Admit Cards)
CREATE TABLE IF NOT EXISTS paperwala_info (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- 'vacancy', 'admit_card', 'syllabus', 'answer_key', 'result'
    vacancy_name VARCHAR(255) NOT NULL,
    total_posts INT,
    apply_start_date DATE,
    apply_last_date DATE,
    official_link TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tier 3: Current Affairs
CREATE TABLE IF NOT EXISTS current_affairs (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', 'yearly'
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tier 4: Notes
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    chapter VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    pdf_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tier 5: Group Chat (Auto-delete after 24h)
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL,
    message_text TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages(created_at);

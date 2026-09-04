-- Database Schema for Anas Abdiwahid Portfolio
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS `anas_portfolio` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `anas_portfolio`;

-- 1. Users Table (Admin authentication)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `full_name` VARCHAR(100) NOT NULL,
    `role` ENUM('admin', 'editor') DEFAULT 'admin',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Site Settings Table (Dynamic website configuration)
CREATE TABLE IF NOT EXISTS `site_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` LONGTEXT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Messages Table (Contact form inquiries)
CREATE TABLE IF NOT EXISTS `messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `subject` VARCHAR(200) NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Projects Table (Portfolio items)
CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(150) NOT NULL,
    `category` VARCHAR(50) NOT NULL DEFAULT 'web',
    `description` TEXT NULL,
    `image_url` VARCHAR(255) NULL,
    `video_url` VARCHAR(255) NULL,
    `project_url` VARCHAR(255) NULL,
    `badge_text` VARCHAR(50) NULL,
    `is_featured` TINYINT(1) DEFAULT 0,
    `sort_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Services Table (Services offered)
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `icon_class` VARCHAR(50) NOT NULL DEFAULT 'fas fa-code',
    `icon_bg` VARCHAR(20) DEFAULT '#eef2ff',
    `icon_color` VARCHAR(20) DEFAULT '#4361ee',
    `is_featured` TINYINT(1) DEFAULT 0,
    `sort_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Skills Table (About section skill progress bars)
CREATE TABLE IF NOT EXISTS `skills` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `skill_name` VARCHAR(100) NOT NULL,
    `percentage` INT NOT NULL DEFAULT 80,
    `gradient_color` VARCHAR(100) DEFAULT 'linear-gradient(90deg,#e63946,#f4a261)',
    `sort_order` INT DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =======================================================
-- INITIAL SEED DATA
-- =======================================================

-- Seed Admin User (Default: admin / admin123)
-- Password hash: password_hash('admin123', PASSWORD_BCRYPT)
INSERT INTO `users` (`username`, `password_hash`, `email`, `full_name`, `role`)
VALUES ('admin', '$2y$10$I.gBRPBAvSGe5C6fPDuFbOSayDkaNQKhci6ILPbSO5J7P3UqWucJm', 'anasabdiwahidhussein@gmail.com', 'Anas Abdiwahid Hussein Warsame', 'admin')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Seed Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('site_title', 'Anas Abdiwahid -- Portfolio'),
('owner_name', 'Anas Abdiwahid Hussein Warsame'),
('profession', 'Full Stack Developer & Multimedia Specialist'),
('hero_greeting', 'Hi I am'),
('hero_badge', '99+ Happy Clients'),
('hero_p1', 'I am a passionate Full Stack Developer and Multimedia Specialist with a strong interest in building modern digital solutions. I work across both frontend and backend development, creating efficient, scalable, and user-friendly applications.'),
('hero_p2', 'My expertise includes designing and developing web applications, crafting visual identities, and producing creative multimedia content. I combine technical skills with creativity to deliver solutions that are both functional and visually compelling.'),
('hero_p3', 'I have a strong focus on clean design, performance, and user experience. I enjoy solving problems, learning new technologies, and continuously improving my skills in both development and digital media.'),
('about_intro', 'Passionate Full Stack Developer & Multimedia Specialist with a creative approach to crafting intuitive and engaging digital experiences.'),
('years_experience', '4'),
('projects_done', '99'),
('happy_clients', '99'),
('email', 'anasabdiwahidhussein@gmail.com'),
('phone', '+252 616 256 534'),
('whatsapp', '+252616256534'),
('location', 'Mogadishu, Somalia'),
('university', 'Hormuud University'),
('cv_file', 'cv-Anas-Abdiwahid.pdf'),
('cv_preview_image', 'cv-Anas-Abdiwahid.jpg'),
('facebook_url', 'https://www.facebook.com/share/1AjmvAjtgZ/?mibextid=wwXIfr'),
('linkedin_url', 'https://www.linkedin.com/in/anas-abdiwahid-hussein-472738262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'),
('github_url', 'https://github.com/anasupdyy'),
('tiktok_url', 'https://www.tiktok.com/@anazz_updyy?_r=1&_t=ZS-946XGN36TGX'),
('youtube_url', 'https://www.youtube.com/@anas_abdiwahid'),
('linktree_url', 'https://linktr.ee/anasupdy')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- Seed Skills
INSERT INTO `skills` (`skill_name`, `percentage`, `gradient_color`, `sort_order`, `is_active`) VALUES
('Full Stack Development', 95, 'linear-gradient(90deg,#e63946,#f4a261)', 1, 1),
('Web Application Design', 85, 'linear-gradient(90deg,#f4a261,#e9c46a)', 2, 1),
('Logo & Visual Branding', 80, 'linear-gradient(90deg,#a8dadc,#457b9d)', 3, 1),
('Multimedia & Creative Projects', 90, 'linear-gradient(90deg,#4361ee,#3a0ca3)', 4, 1)
ON DUPLICATE KEY UPDATE `percentage` = VALUES(`percentage`);

-- Seed Services
INSERT INTO `services` (`title`, `description`, `icon_class`, `icon_bg`, `icon_color`, `is_featured`, `sort_order`, `is_active`) VALUES
('Full Stack Dev', 'End-to-end web applications built with modern frameworks. Scalable, fast, and maintainable code.', 'fas fa-code', '#eef2ff', '#4361ee', 0, 1, 1),
('Web Application Design', 'User-centered designs that are visually engaging and functionally seamless. My approach always puts UX first.', 'fas fa-globe', '#fff0f5', '#e63946', 1, 2, 1),
('Logo & Branding', 'Distinctive visual identities and brand systems that communicate your story with clarity and style.', 'fas fa-palette', '#f0fff4', '#2d6a4f', 0, 3, 1),
('Multimedia Projects', 'Creative digital content production including graphic design, video, and interactive digital media.', 'fas fa-photo-video', '#fffbeb', '#f4a261', 0, 4, 1),
('IT / OIT Projects', 'Infrastructure setup, system administration, and IT project management with a focus on reliability.', 'fas fa-server', '#f5f0ff', '#7209b7', 0, 5, 1),
('Responsive Design', 'Pixel-perfect, mobile-first designs that look great on every screen size and device type.', 'fas fa-mobile-alt', '#e8f8ff', '#0096c7', 0, 6, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- Seed Initial Projects
INSERT INTO `projects` (`title`, `category`, `description`, `image_url`, `video_url`, `project_url`, `badge_text`, `is_featured`, `sort_order`) VALUES
('Restaurant Management System', 'fullstack', '4 SEASON – Full stack web app with admin dashboard, cashier & menu management.', 'Resturent 4_Season.png', NULL, '#', 'Full Stack', 1, 1),
('Suuq Furan Marketplace', 'fullstack', 'Full-featured online marketplace with Admin, Shop & Customer roles using PHP & MySQL.', 'Suuq Furan.png', NULL, '#', 'Full Stack', 1, 2),
('Admin Dashboard UI', 'design', 'Clean and modern admin interface with data visualization and management tools.', 'Dashboad.png', NULL, '#', 'Web Design', 1, 3),
('Brand Poster Design', 'branding', 'Creative poster and visual branding design combining typography and strong visual identity.', 'Boster.jpg', NULL, '#', 'Branding', 1, 4),
('Video Editing Project', 'multimedia', 'Professional video editing and post-production work showcasing multimedia skills.', NULL, 'Vedio_edite.mp4', '#', 'Multimedia', 1, 5),
('Burger Graphic Design', 'design', 'Stunning burger social media graphic created for restaurant digital marketing campaign.', 'How to Make a Stunning Burger Graphic for Your Social Media Feed.jpeg', NULL, '#', 'Design', 0, 6),
('Coffee for Friday Poster', 'branding', 'Creative social media poster design for Friday coffee promotion with warm visual tones.', 'COFFEE FOR FRIDAY POSTER.jpeg', NULL, '#', 'Branding', 0, 7),
('Printable Restaurant Menu', 'design', 'Professional restaurant menu template design formatted for print and digital use.', 'Printable Restaurant Menu Template _ PSD Free Download - Pikbest.jpeg', NULL, '#', 'Design', 0, 8),
('Graphic Designer Promo', 'branding', 'Promotional graphic design banner showcasing personal branding and design services.', 'Do you need a Graphic designer.jpeg', NULL, '#', 'Branding', 0, 9)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

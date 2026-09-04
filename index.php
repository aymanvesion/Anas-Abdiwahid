<?php
/**
 * Anas Abdiwahid - Full Stack Developer & UI/UX Portfolio
 * Dynamic PHP & MySQL Frontend (Dark Navy & Electric Cyan Theme)
 */

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/includes/functions.php';

// Fetch dynamic data if database is connected
$settings = [];
$skills = [];
$services = [];
$projects = [];

if (isset($pdo)) {
    $settings = get_all_settings($pdo);
    
    try {
        $skills = $pdo->query("SELECT * FROM skills WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")->fetchAll();
    } catch (Exception $e) {
        $skills = [];
    }

    try {
        $services = $pdo->query("SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")->fetchAll();
    } catch (Exception $e) {
        $services = [];
    }

    try {
        $projects = $pdo->query("SELECT * FROM projects ORDER BY sort_order ASC, id DESC")->fetchAll();
    } catch (Exception $e) {
        $projects = [];
    }
}

// Fallback defaults if database tables are empty
$ownerName = $settings['owner_name'] ?? 'Anas Abdiwahid Hussein Warsame';
$profession = $settings['profession'] ?? 'Software Developer & Computer Science Student';
$email = $settings['email'] ?? 'anasabdiwahidhussein@gmail.com';
$phone = $settings['phone'] ?? '+252 616 256 534';
$whatsapp = $settings['whatsapp'] ?? '+252616256534';
$location = $settings['location'] ?? 'Mogadishu, Somalia';
$university = $settings['university'] ?? 'Hormuud University';
$yearsExp = $settings['years_experience'] ?? '4';
$projectsDone = $settings['projects_done'] ?? '99';
$happyClients = $settings['happy_clients'] ?? '99';
$cvFile = !empty($settings['cv_file']) ? $settings['cv_file'] : 'cv-Anas-Abdiwahid.pdf';
$cvPreview = !empty($settings['cv_preview_image']) ? $settings['cv_preview_image'] : 'cv-Anas-Abdiwahid.jpg';

$fbUrl = $settings['facebook_url'] ?? 'https://www.facebook.com/share/1AjmvAjtgZ/?mibextid=wwXIfr';
$liUrl = $settings['linkedin_url'] ?? 'https://www.linkedin.com/in/anas-abdiwahid-hussein-472738262';
$ghUrl = $settings['github_url'] ?? 'https://github.com/anasupdyy';
$ttUrl = $settings['tiktok_url'] ?? 'https://www.tiktok.com/@anazz_updyy';
$ytUrl = $settings['youtube_url'] ?? 'https://www.youtube.com/@anas_abdiwahid';
$ltUrl = $settings['linktree_url'] ?? 'https://linktr.ee/anasupdy';
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($ownerName) ?> -- Portfolio</title>
  <meta name="description"
    content="Personal portfolio of <?= htmlspecialchars($ownerName) ?> – <?= htmlspecialchars($profession) ?> based at <?= htmlspecialchars($university) ?>." />
  <link rel="icon" type="image/png" href="Sawir Logo.png" />
  <link rel="apple-touch-icon" href="Sawir Logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Serif+Display:ital@0;1&family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>

  <!-- ========== NAVBAR ========== -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="#home" class="nav-logo">
        <img src="Sawir Logo.png" alt="Anas Logo" class="logo-img" />
        <span class="logo-text">ANAS ABDIWAHID<span class="accent">.</span></span>
      </a>

      <ul class="nav-links" id="navLinks">
        <li><a href="#home" class="nav-link active" data-i18n="nav.home">Home</a></li>
        <li><a href="#about" class="nav-link" data-i18n="nav.about">About Me</a></li>
        <li><a href="#projects" class="nav-link" data-i18n="nav.portfolio">Projects</a></li>
        <li><a href="#iot-projects" class="nav-link" data-i18n="nav.iot">IoT Projects</a></li>
        <li><a href="#services" class="nav-link" data-i18n="nav.services">Services</a></li>
        <li><a href="#certificates" class="nav-link" data-i18n="nav.certs">Certificates</a></li>
        <li><a href="#cv" class="nav-link" data-i18n="nav.cv">CV</a></li>
        <li><a href="#contact" class="nav-link" data-i18n="nav.contact">Contact</a></li>
      </ul>

      <div class="nav-right">
        <!-- Language Switcher -->
        <div class="lang-switcher" id="langSwitcher">
          <button class="lang-btn" id="langBtn" aria-haspopup="listbox" aria-expanded="false" data-i18n-aria-label="ui.language">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%23012169'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23fff' stroke-width='4'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23C8102E' stroke-width='2'/><path d='M15,0 v20 M0,10 h30' stroke='%23fff' stroke-width='6'/><path d='M15,0 v20 M0,10 h30' stroke='%23C8102E' stroke-width='3.5'/></svg>" alt="Language Flag" class="flag-icon" id="langFlag" />
            <span id="langLabel">EN</span>
            <i class="fas fa-chevron-down" aria-hidden="true" style="font-size:0.75rem;"></i>
          </button>
          <ul class="lang-menu" id="langMenu" role="listbox">
            <li class="lang-option" data-lang="en" data-label="EN" data-flag="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%23012169'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23fff' stroke-width='4'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23C8102E' stroke-width='2'/><path d='M15,0 v20 M0,10 h30' stroke='%23fff' stroke-width='6'/><path d='M15,0 v20 M0,10 h30' stroke='%23C8102E' stroke-width='3.5'/></svg>">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%23012169'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23fff' stroke-width='4'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23C8102E' stroke-width='2'/><path d='M15,0 v20 M0,10 h30' stroke='%23fff' stroke-width='6'/><path d='M15,0 v20 M0,10 h30' stroke='%23C8102E' stroke-width='3.5'/></svg>" alt="English Flag" class="flag-icon" />
              <span>English</span>
            </li>
            <li class="lang-option" data-lang="so" data-label="SO" data-flag="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%234189DD'/><polygon points='15,4 16.5,8.5 21,8.5 17.5,11.5 19,16 15,13 11,16 12.5,11.5 9,8.5 13.5,8.5' fill='%23FFFFFF'/></svg>">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%234189DD'/><polygon points='15,4 16.5,8.5 21,8.5 17.5,11.5 19,16 15,13 11,16 12.5,11.5 9,8.5 13.5,8.5' fill='%23FFFFFF'/></svg>" alt="Somalia Flag" class="flag-icon" />
              <span>Soomaali</span>
            </li>
            <li class="lang-option" data-lang="ar" data-label="AR" data-flag="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%23006C35'/><path d='M8,12 h14 M10,10 l-2,2 l2,2' stroke='%23FFFFFF' stroke-width='1.2' stroke-linecap='round'/><circle cx='15' cy='7' r='2' fill='%23FFFFFF'/></svg>">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'><rect width='30' height='20' fill='%23006C35'/><path d='M8,12 h14 M10,10 l-2,2 l2,2' stroke='%23FFFFFF' stroke-width='1.2' stroke-linecap='round'/><circle cx='15' cy='7' r='2' fill='%23FFFFFF'/></svg>" alt="Arabic Flag" class="flag-icon" />
              <span>العربية</span>
            </li>
          </ul>
        </div>

        <!-- Theme Toggle -->
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" data-i18n-aria-label="ui.toggleDark">
          <span class="theme-icon sun"><i class="fas fa-sun"></i></span>
          <span class="theme-icon moon"><i class="fas fa-moon"></i></span>
        </button>

        <a href="#contact" class="btn btn-primary nav-cta" data-i18n="nav.cta">LET'S TALK</a>

        <button class="hamburger" id="hamburger" aria-label="Open menu" data-i18n-aria-label="ui.openMenu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- ========== HERO SECTION ========== -->
  <section class="hero" id="home">
    <div class="container hero-container">
      <div class="hero-text">
        <div class="hero-status-pill">
          <i class="fas fa-circle pulse-dot"></i>
          <span data-i18n="hero.tag">FULL STACK DEVELOPER &amp; INNOVATOR</span>
        </div>

        <h1 class="hero-greeting-line" data-i18n="hero.greetingLine">Hay! I'm Anas Abdiwahid.</h1>
        <h2 class="hero-subtitle-line">
          <span id="heroTypingText" class="typing-text">Full-Stack Software Developer 🚀</span><span class="typing-cursor">|</span>
        </h2>

        <p class="hero-bio" data-i18n="hero.p1">
          I am a passionate Full Stack Developer and UI/UX Designer dedicated to building high-performance web applications, scalable digital architectures, and visually compelling interfaces.
        </p>

        <div class="hero-actions-row">
          <a href="#contact" class="btn btn-primary" id="contactBtn">
            <span data-i18n="hero.btnContact">GET IN TOUCH</span>
            <i class="fas fa-arrow-right"></i>
          </a>

          <div class="hero-social-pills">
            <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $whatsapp) ?>" target="_blank" class="social-pill-btn" aria-label="WhatsApp" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="<?= htmlspecialchars($fbUrl) ?>" target="_blank" class="social-pill-btn" aria-label="Facebook" title="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="<?= htmlspecialchars($liUrl) ?>" target="_blank" class="social-pill-btn" aria-label="LinkedIn" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="<?= htmlspecialchars($ghUrl) ?>" target="_blank" class="social-pill-btn" aria-label="GitHub" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="<?= htmlspecialchars($ttUrl) ?>" target="_blank" class="social-pill-btn" aria-label="TikTok" title="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="hero-visual-wrap">
        <!-- Concentric Soundwave / Radar Rings -->
        <div class="concentric-rings">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Linear Wave Disc -->
        <div class="wave-disc"></div>

        <!-- 3D Glossy Floating Orbs -->
        <div class="glowing-orb orb-1"></div>
        <div class="glowing-orb orb-2"></div>
        <div class="glowing-orb orb-3"></div>

        <!-- Hero Cutout Portrait -->
        <div class="hero-photo-holder">
          <img src="Anas Abdiwahid Hussein Warsame.png" alt="<?= htmlspecialchars($ownerName) ?> portrait" class="hero-photo" />
        </div>
      </div>
    </div>
  </section>

  <!-- ========== TECH & BRAND MARQUEE ========== -->
  <section class="tech-marquee-section">
    <div class="marquee-track">
      <div class="marquee-item"><i class="fab fa-html5"></i> HTML &amp; CSS</div>
      <div class="marquee-item"><i class="fab fa-js"></i> JavaScript</div>
      <div class="marquee-item"><i class="fab fa-php"></i> PHP &amp; MySQL</div>
      <div class="marquee-item"><i class="fab fa-react"></i> React.js</div>
      <div class="marquee-item"><i class="fab fa-python"></i> Python</div>
      <div class="marquee-item"><i class="fas fa-mobile-screen"></i> Flutter</div>
      <div class="marquee-item"><i class="fas fa-code"></i> C / C++ / C#</div>
      <div class="marquee-item"><i class="fas fa-microchip"></i> IoT &amp; Arduino</div>
      <div class="marquee-item"><i class="fas fa-photo-film"></i> Full Multimedia</div>
      <!-- Duplicate for infinite smooth scroll -->
      <div class="marquee-item"><i class="fab fa-html5"></i> HTML &amp; CSS</div>
      <div class="marquee-item"><i class="fab fa-js"></i> JavaScript</div>
      <div class="marquee-item"><i class="fab fa-php"></i> PHP &amp; MySQL</div>
      <div class="marquee-item"><i class="fab fa-react"></i> React.js</div>
      <div class="marquee-item"><i class="fab fa-python"></i> Python</div>
      <div class="marquee-item"><i class="fas fa-mobile-screen"></i> Flutter</div>
      <div class="marquee-item"><i class="fas fa-code"></i> C / C++ / C#</div>
      <div class="marquee-item"><i class="fas fa-microchip"></i> IoT &amp; Arduino</div>
      <div class="marquee-item"><i class="fas fa-photo-film"></i> Full Multimedia</div>
    </div>
  </section>

  <!-- ========== ABOUT SECTION ========== -->
  <section class="about-section" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-visual">
          <div class="radar-accent-circle radar-left-bottom"></div>
          <div class="radar-accent-circle radar-right-top"></div>
          
          <div class="about-card-frame">
            <img src="sawirr.png" alt="<?= htmlspecialchars($ownerName) ?> standing portrait" />
          </div>
        </div>

        <div class="about-details">
          <div class="badge-tag" data-i18n="about.badge">ABOUT ME</div>
          <h2 class="section-title" data-i18n="about.title">
            Anas Abdiwahid <span class="highlight">Hussein Warsame</span>
          </h2>
          <p class="about-bio" data-i18n="about.intro">
            I am Anas Abdiwahid Hussein Warsame, born on 1 January 2004 in Mogadishu, Somalia. I am a passionate 4th-year Computer Science student at <?= htmlspecialchars($university) ?>, Software Developer, and Technology Enthusiast specialized in Full-Stack Web Development, IoT &amp; Arduino, and Creative Multimedia solutions.
          </p>

          <div class="about-tags-list">
            <span class="about-tag-item"><i class="fas fa-university"></i> <?= htmlspecialchars($university) ?> (4th Year)</span>
            <span class="about-tag-item"><i class="fas fa-laptop-code"></i> Software &amp; Full Stack</span>
            <span class="about-tag-item"><i class="fas fa-microchip"></i> IoT &amp; Arduino</span>
            <span class="about-tag-item"><i class="fas fa-map-marker-alt"></i> <?= htmlspecialchars($location) ?></span>
          </div>

          <div class="stats-boxes-grid">
            <div class="stat-box-card">
              <div class="stat-num-val">
                <span class="stat-count" data-target="<?= htmlspecialchars($projectsDone) ?>"><?= htmlspecialchars($projectsDone) ?></span><span class="plus-mark">+</span>
              </div>
              <div class="stat-label-text" data-i18n="about.stat2">Projects Done</div>
            </div>

            <div class="stat-box-card">
              <div class="stat-num-val">
                <span class="stat-count" data-target="<?= htmlspecialchars($yearsExp) ?>"><?= htmlspecialchars($yearsExp) ?></span><span class="plus-mark">+</span>
              </div>
              <div class="stat-label-text" data-i18n="about.stat1">Years Experience</div>
            </div>

            <div class="stat-box-card">
              <div class="stat-num-val">
                <span class="stat-count" data-target="<?= htmlspecialchars($happyClients) ?>"><?= htmlspecialchars($happyClients) ?></span><span class="plus-mark">+</span>
              </div>
              <div class="stat-label-text" data-i18n="about.stat3">Happy Clients</div>
            </div>
          </div>

          <div class="about-actions-row">
            <a href="#contact" class="btn btn-primary">
              <span data-i18n="hero.btnContact">GET IN TOUCH</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="who-is-anas_.html" target="_blank" class="btn btn-outline">
              <i class="fas fa-user-graduate"></i>
              <span data-i18n="about.viewBio">FULL BIOGRAPHY</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== RECENT PROJECTS SECTION ========== -->
  <section class="projects-section" id="projects">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="portfolio.badge">MY WORK</div>
        <h2 class="section-title" data-i18n="portfolio.title">RECENT PROJECTS</h2>
        <p class="section-desc center" data-i18n="portfolio.desc">
          Explore a curated selection of web applications, UI/UX systems, and branding designs crafted with precision.
        </p>
      </div>

      <!-- Category Switcher Tabs -->
      <div class="category-tabs-wrapper">
        <button class="cat-tab-btn active" data-tab="systems">
          <i class="fas fa-laptop-code"></i>
          <span data-i18n="portfolio.tabSystems">Systems &amp; Web Apps</span>
          <span class="cat-count-badge">4</span>
        </button>
        <button class="cat-tab-btn" data-tab="posters">
          <i class="fas fa-palette"></i>
          <span data-i18n="portfolio.tabPosters">Graphic Posters</span>
          <span class="cat-count-badge">4</span>
        </button>
        <button class="cat-tab-btn" data-tab="videos">
          <i class="fas fa-video"></i>
          <span data-i18n="portfolio.tabVideos">Videos &amp; Media</span>
          <span class="cat-count-badge">2</span>
        </button>
      </div>

      <!-- Tab Panels (Only active category displayed in a compact 1-row animated slider) -->
      <div class="category-panels-container">
        <!-- Panel 1: Systems -->
        <div class="category-tab-panel active" id="panel-systems">
          <div class="compact-slider-wrapper">
            <button class="panel-arrow prev" data-target="track-systems" data-dir="prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
            <div class="panel-slider-window">
              <div class="panel-slider-track" id="track-systems">
                <!-- System 1: 4 SEASON Restaurant -->
                <div class="project-card-modern">
                  <a href="https://github.com/anasupdyy" target="_blank" class="project-thumb-container">
                    <img src="Resturent 4_Season.png" alt="4 SEASON Restaurant System" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://github.com/anasupdyy" target="_blank">4 SEASON Restaurant</a></h4>
                      <span class="project-card-tags">Local POS • Full Stack</span>
                    </div>
                    <a href="https://github.com/anasupdyy" target="_blank" class="project-action-circle" title="View details">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- System 2: Suuq Furan E-Commerce -->
                <div class="project-card-modern">
                  <a href="https://github.com/anasupdyy" target="_blank" class="project-thumb-container">
                    <img src="Suuq Furan.png" alt="Suuq Furan E-Commerce Platform" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://github.com/anasupdyy" target="_blank">Suuq Furan Platform</a></h4>
                      <span class="project-card-tags">Local Web App • Store</span>
                    </div>
                    <a href="https://github.com/anasupdyy" target="_blank" class="project-action-circle" title="View details">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- System 3: Admin Dashboard -->
                <div class="project-card-modern">
                  <a href="https://github.com/anasupdyy" target="_blank" class="project-thumb-container">
                    <img src="Dashboad.png" alt="Analytics Admin Dashboard" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://github.com/anasupdyy" target="_blank">Analytics Dashboard</a></h4>
                      <span class="project-card-tags">UI/UX • Admin Metrics</span>
                    </div>
                    <a href="https://github.com/anasupdyy" target="_blank" class="project-action-circle" title="View details">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- System 4: DHIIG KAAL -->
                <div class="project-card-modern">
                  <a href="https://dhiigkaal.iftiinhub.com/" target="_blank" class="project-thumb-container" title="Open DHIIG KAAL Platform">
                    <img src="DHIIG_KAAL.png" alt="DHIIG KAAL Blood Donation Platform" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://dhiigkaal.iftiinhub.com/" target="_blank">DHIIG KAAL Platform</a></h4>
                      <span class="project-card-tags">Health Tech • Live System</span>
                    </div>
                    <a href="https://dhiigkaal.iftiinhub.com/" target="_blank" class="project-action-circle" title="Open DHIIG KAAL">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button class="panel-arrow next" data-target="track-systems" data-dir="next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <!-- Panel 2: Posters -->
        <div class="category-tab-panel" id="panel-posters">
          <div class="compact-slider-wrapper">
            <button class="panel-arrow prev" data-target="track-posters" data-dir="prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
            <div class="panel-slider-window">
              <div class="panel-slider-track" id="track-posters">
                <!-- Poster 1: How AI Identifies You -->
                <div class="project-card-modern">
                  <a href="https://www.facebook.com/share/p/1J4Hjv9Kbj/" target="_blank" class="project-thumb-container" title="Open on Facebook">
                    <img src="National_Training_Week_Poster_1.jpg" alt="How AI Identifies You Poster" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://www.facebook.com/share/p/1J4Hjv9Kbj/" target="_blank">How AI Identifies You</a></h4>
                      <span class="project-card-tags">AI Training Week • NextOne</span>
                    </div>
                    <a href="https://www.facebook.com/share/p/1J4Hjv9Kbj/" target="_blank" class="project-action-circle" title="View on Facebook">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- Poster 2: Data Storytelling with AI -->
                <div class="project-card-modern">
                  <a href="https://www.facebook.com/share/p/1AaMe42rQN/" target="_blank" class="project-thumb-container" title="Open on Facebook">
                    <img src="National_Training_Week_Poster_2.jpg" alt="Data Storytelling with AI Poster" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://www.facebook.com/share/p/1AaMe42rQN/" target="_blank">Data Storytelling AI</a></h4>
                      <span class="project-card-tags">UNICEF &amp; ASPAIRC • Campaign</span>
                    </div>
                    <a href="https://www.facebook.com/share/p/1AaMe42rQN/" target="_blank" class="project-action-circle" title="View on Facebook">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- Poster 3: AI Ethics & Public Sector -->
                <div class="project-card-modern">
                  <a href="https://www.facebook.com/share/p/1DefjYuNSw/" target="_blank" class="project-thumb-container" title="Open on Facebook">
                    <img src="National_Training_Week_Poster_3.jpg" alt="AI Ethics & Public Sector Poster" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title"><a href="https://www.facebook.com/share/p/1DefjYuNSw/" target="_blank">AI Ethics Public Sector</a></h4>
                      <span class="project-card-tags">UNESCO SPARK-AI • Poster</span>
                    </div>
                    <a href="https://www.facebook.com/share/p/1DefjYuNSw/" target="_blank" class="project-action-circle" title="View on Facebook">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <!-- Poster 4: Coffee Friday Poster -->
                <div class="project-card-modern">
                  <a href="#contact" class="project-thumb-container">
                    <img src="COFFEE FOR FRIDAY POSTER.jpeg" alt="Coffee Friday Branding Poster" />
                  </a>
                  <div class="project-card-body">
                    <div class="project-card-info">
                      <h4 class="project-card-title">Coffee for Friday</h4>
                      <span class="project-card-tags">Commercial Visual Branding</span>
                    </div>
                    <a href="#contact" class="project-action-circle" title="View Details">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button class="panel-arrow next" data-target="track-posters" data-dir="next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <!-- Panel 3: Videos -->
        <div class="category-tab-panel" id="panel-videos">
          <div class="videos-compact-row">
            <!-- Video Player Card -->
            <div class="video-card-modern">
              <video controls playsinline preload="metadata" poster="Dashboad.png">
                <source src="Vedio_edite.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div class="project-card-body">
                <div class="project-card-info">
                  <h4 class="project-card-title">Video Editing Showcase</h4>
                  <span class="project-card-tags">Motion Graphics • Premiere Pro Video</span>
                </div>
                <span class="collab-badge"><i class="fas fa-play"></i> Watch Video</span>
              </div>
            </div>

            <!-- Multimedia Promo Card -->
            <div class="project-card-modern">
              <a href="#contact" class="project-thumb-container">
                <img src="How to Make a Stunning Burger Graphic for Your Social Media Feed.jpeg" alt="Multimedia Graphic Design" />
              </a>
              <div class="project-card-body">
                <div class="project-card-info">
                  <h4 class="project-card-title">Multimedia Media Production</h4>
                  <span class="project-card-tags">Social Graphics • Digital Media</span>
                </div>
                <a href="#contact" class="project-action-circle" title="View Details">
                  <i class="fas fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== IOT PROJECTS SECTION ========== -->
  <section class="iot-section" id="iot-projects">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="iot.badge">IOT &amp; EMBEDDED HARDWARE</div>
        <h2 class="section-title" data-i18n="iot.title">
          Smart <span class="highlight">IoT &amp; Arduino</span> Systems
        </h2>
        <p class="section-desc center" data-i18n="iot.desc">
          Live video showcases of embedded hardware prototypes, smart sensor integrations, microcontrollers, and automation systems engineered by Anas.
        </p>
      </div>

      <div class="iot-grid">
        <!-- IoT Project 1 -->
        <div class="iot-card">
          <div class="iot-video-wrapper">
            <video class="iot-video-player" controls preload="metadata" playsinline>
              <source src="WhatsApp Video 2026-08-25 at 8.48.47 AM.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="iot-card-content">
            <div class="iot-card-badge" data-i18n="iot.card1.badge">
              <i class="fas fa-microchip"></i> Smart Sensor System
            </div>
            <h3 class="iot-card-title" data-i18n="iot.card1.title">
              Automated Obstacle &amp; Distance Sensing
            </h3>
            <p class="iot-card-desc" data-i18n="iot.card1.desc">
              Real-time embedded microcontroller integration featuring automated ultrasonic distance monitoring, active alerts, and intelligent circuit logic.
            </p>
            <div class="iot-tech-tags">
              <span class="iot-tech-tag">Arduino Uno</span>
              <span class="iot-tech-tag">Ultrasonic Sensor</span>
              <span class="iot-tech-tag">C++ Firmware</span>
              <span class="iot-tech-tag">Buzzer Alert</span>
            </div>
          </div>
        </div>

        <!-- IoT Project 2 -->
        <div class="iot-card">
          <div class="iot-video-wrapper">
            <video class="iot-video-player" controls preload="metadata" playsinline>
              <source src="WhatsApp Video 2026-08-25 at 8.48.54 AM - Copy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="iot-card-content">
            <div class="iot-card-badge" data-i18n="iot.card2.badge">
              <i class="fas fa-robot"></i> Robotics &amp; Motor Control
            </div>
            <h3 class="iot-card-title" data-i18n="iot.card2.title">
              Automated Robotic Actuator Unit
            </h3>
            <p class="iot-card-desc" data-i18n="iot.card2.desc">
              Robotic prototype and automated motion processing using motor drivers, servo actuators, and sensor-driven decision making.
            </p>
            <div class="iot-tech-tags">
              <span class="iot-tech-tag">ESP32 / Arduino</span>
              <span class="iot-tech-tag">L298N Driver</span>
              <span class="iot-tech-tag">Servo Motors</span>
              <span class="iot-tech-tag">Automation</span>
            </div>
          </div>
        </div>

        <!-- IoT Project 3 -->
        <div class="iot-card">
          <div class="iot-video-wrapper">
            <video class="iot-video-player" controls preload="metadata" playsinline>
              <source src="WhatsApp Video 2026-08-25 at 8.49.08 AM.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="iot-card-content">
            <div class="iot-card-badge" data-i18n="iot.card3.badge">
              <i class="fas fa-wifi"></i> Connected IoT Monitor
            </div>
            <h3 class="iot-card-title" data-i18n="iot.card3.title">
              IoT Live Data &amp; Security Module
            </h3>
            <p class="iot-card-desc" data-i18n="iot.card3.desc">
              Interactive wireless hardware demonstration showing real-time hardware telemetry, trigger events, and circuit debugging.
            </p>
            <div class="iot-tech-tags">
              <span class="iot-tech-tag">Smart Controller</span>
              <span class="iot-tech-tag">PIR &amp; IR Sensors</span>
              <span class="iot-tech-tag">Circuit Design</span>
              <span class="iot-tech-tag">IoT Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== SERVICES SECTION ========== -->
  <section class="services-section" id="services">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="services.badge">SERVICES</div>
        <h2 class="section-title" data-i18n="services.title">
          DESIGN &amp; DEV <span class="highlight">SERVICES</span> I AM PROVIDING
        </h2>
        <p class="section-desc center" data-i18n="services.desc">
          High quality development and creative design solutions customized to grow your business and digital presence.
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-laptop-code"></i></div>
          <h3 class="service-title" data-i18n="services.card1.title">Full Stack Web Dev</h3>
          <p class="service-description" data-i18n="services.card1.desc">
            End-to-end custom web applications built with modern frameworks. Scalable, high-speed, and secure backend systems.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-bezier-curve"></i></div>
          <h3 class="service-title" data-i18n="services.card2.title">UI / UX Design</h3>
          <p class="service-description" data-i18n="services.card2.desc">
            User-centric, clean, and intuitive interfaces with modern aesthetics, interactive prototypes, and frictionless user flows.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-palette"></i></div>
          <h3 class="service-title" data-i18n="services.card3.title">Logo &amp; Visual Branding</h3>
          <p class="service-description" data-i18n="services.card3.desc">
            Distinctive brand identities, logos, color palettes, and visual guidelines that effectively communicate your story.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-photo-film"></i></div>
          <h3 class="service-title" data-i18n="services.card4.title">Multimedia Production</h3>
          <p class="service-description" data-i18n="services.card4.desc">
            Dynamic digital graphics, high-impact marketing posters, video editing, and interactive social media assets.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-microchip"></i></div>
          <h3 class="service-title" data-i18n="services.card5.title">IT / IoT Systems</h3>
          <p class="service-description" data-i18n="services.card5.desc">
            Hardware-software integration, system troubleshooting, server setup, and smart connected automation solutions.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="service-card-modern">
          <div class="service-icon-box"><i class="fas fa-mobile-screen-button"></i></div>
          <h3 class="service-title" data-i18n="services.card6.title">Responsive Web Apps</h3>
          <p class="service-description" data-i18n="services.card6.desc">
            Pixel-perfect layouts optimized for smartphones, tablets, laptops, and 4K desktop screens for flawless cross-device experience.
          </p>
          <a href="#contact" class="service-read-more"><span data-i18n="services.readMore">Hire for this</span> <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CERTIFICATES SECTION ========== -->
  <section class="certificates-section" id="certificates">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="certs.badge">OFFICIAL CERTIFICATIONS &amp; HONORS</div>
        <h2 class="section-title" data-i18n="certs.title">
          Verified <span class="highlight">Certificates</span> &amp; Credentials
        </h2>
        <p class="section-desc center" data-i18n="certs.desc">
          Official academic and professional credentials earned by Anas Abdiwahid Hussein across Artificial Intelligence, Prompt Engineering, and Technology Innovation.
        </p>
      </div>

      <div class="certs-grid">
        <!-- Certificate 1 -->
        <div class="cert-card">
          <div class="cert-preview-frame" onclick="openCertModal('certificates/cert-1-prompt-engineering.png', 'Mastering Prompt Engineering', 'NTW-2026-76CACCBF')">
            <img src="certificates/cert-1-prompt-engineering.png" alt="Mastering Prompt Engineering Certificate" class="cert-img-thumb" oncontextmenu="return false;" draggable="false" />
            <div class="cert-img-overlay">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </div>
          </div>
          <div class="cert-card-body">
            <div class="cert-meta-row">
              <span class="cert-year-tag"><i class="fas fa-calendar-check"></i> <span data-i18n="certs.yearLabel">Year:</span> 2026</span>
              <span class="cert-id-badge">NTW-2026-76CACCBF</span>
            </div>
            <h3 class="cert-title" data-i18n="certs.cert1.title">Mastering Prompt Engineering</h3>
            <div class="cert-track" data-i18n="certs.cert1.track">Artificial Intelligence for Academic Transformation</div>
            <div class="cert-issuer-date">
              <span><i class="fas fa-building-columns"></i> National Training Week</span> &bull; 
              <span data-i18n="certs.cert1.date">August 29, 2026</span>
            </div>
            <button type="button" class="cert-action-btn" onclick="openCertModal('certificates/cert-1-prompt-engineering.png', 'Mastering Prompt Engineering', 'NTW-2026-76CACCBF')">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </button>
          </div>
        </div>

        <!-- Certificate 2 -->
        <div class="cert-card">
          <div class="cert-preview-frame" onclick="openCertModal('certificates/cert-2-health-awareness.png', 'AI for Health Awareness & Disease Prevention', 'NTW-2026-F1E30F79')">
            <img src="certificates/cert-2-health-awareness.png" alt="AI for Health Awareness Certificate" class="cert-img-thumb" oncontextmenu="return false;" draggable="false" />
            <div class="cert-img-overlay">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </div>
          </div>
          <div class="cert-card-body">
            <div class="cert-meta-row">
              <span class="cert-year-tag"><i class="fas fa-calendar-check"></i> <span data-i18n="certs.yearLabel">Year:</span> 2026</span>
              <span class="cert-id-badge">NTW-2026-F1E30F79</span>
            </div>
            <h3 class="cert-title" data-i18n="certs.cert2.title">AI for Health Awareness &amp; Disease Prevention</h3>
            <div class="cert-track" data-i18n="certs.cert2.track">Artificial Intelligence for Academic Transformation</div>
            <div class="cert-issuer-date">
              <span><i class="fas fa-building-columns"></i> National Training Week</span> &bull; 
              <span data-i18n="certs.cert2.date">September 1, 2026</span>
            </div>
            <button type="button" class="cert-action-btn" onclick="openCertModal('certificates/cert-2-health-awareness.png', 'AI for Health Awareness & Disease Prevention', 'NTW-2026-F1E30F79')">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </button>
          </div>
        </div>

        <!-- Certificate 3 -->
        <div class="cert-card cert-card-extra">
          <div class="cert-preview-frame" onclick="openCertModal('certificates/cert-3-ai-media.png', 'Navigating AI-Generated Media with AI Tools', 'NTW-2026-066ACE6F')">
            <img src="certificates/cert-3-ai-media.png" alt="Navigating AI-Generated Media Certificate" class="cert-img-thumb" oncontextmenu="return false;" draggable="false" />
            <div class="cert-img-overlay">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </div>
          </div>
          <div class="cert-card-body">
            <div class="cert-meta-row">
              <span class="cert-year-tag"><i class="fas fa-calendar-check"></i> <span data-i18n="certs.yearLabel">Year:</span> 2026</span>
              <span class="cert-id-badge">NTW-2026-066ACE6F</span>
            </div>
            <h3 class="cert-title" data-i18n="certs.cert3.title">Navigating AI-Generated Media with AI Tools</h3>
            <div class="cert-track" data-i18n="certs.cert3.track">Artificial Intelligence for Academic Transformation</div>
            <div class="cert-issuer-date">
              <span><i class="fas fa-building-columns"></i> National Training Week</span> &bull; 
              <span data-i18n="certs.cert3.date">September 2, 2026</span>
            </div>
            <button type="button" class="cert-action-btn" onclick="openCertModal('certificates/cert-3-ai-media.png', 'Navigating AI-Generated Media with AI Tools', 'NTW-2026-066ACE6F')">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </button>
          </div>
        </div>

        <!-- Certificate 4 -->
        <div class="cert-card cert-card-extra">
          <div class="cert-preview-frame" onclick="openCertModal('certificates/cert-4-graduation-employment.png', 'From Graduation to Employment: AI Career Bridge', 'NTW-2026-0CE14441')">
            <img src="certificates/cert-4-graduation-employment.png" alt="AI Career Bridge Certificate" class="cert-img-thumb" oncontextmenu="return false;" draggable="false" />
            <div class="cert-img-overlay">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </div>
          </div>
          <div class="cert-card-body">
            <div class="cert-meta-row">
              <span class="cert-year-tag"><i class="fas fa-calendar-check"></i> <span data-i18n="certs.yearLabel">Year:</span> 2026</span>
              <span class="cert-id-badge">NTW-2026-0CE14441</span>
            </div>
            <h3 class="cert-title" data-i18n="certs.cert4.title">From Graduation to Employment: AI Career Bridge</h3>
            <div class="cert-track" data-i18n="certs.cert4.track">Artificial Intelligence for Academic Transformation</div>
            <div class="cert-issuer-date">
              <span><i class="fas fa-building-columns"></i> National Training Week</span> &bull; 
              <span data-i18n="certs.cert4.date">September 2, 2026</span>
            </div>
            <button type="button" class="cert-action-btn" onclick="openCertModal('certificates/cert-4-graduation-employment.png', 'From Graduation to Employment: AI Career Bridge', 'NTW-2026-0CE14441')">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </button>
          </div>
        </div>

        <!-- Certificate 5 -->
        <div class="cert-card cert-card-extra">
          <div class="cert-preview-frame" onclick="openCertModal('certificates/cert-5-unesco-ethics.png', 'UNESCO: AI Ethics & Public Sector Capacity', 'NTW-2026-52DCFAAE')">
            <img src="certificates/cert-5-unesco-ethics.png" alt="UNESCO AI Ethics Certificate" class="cert-img-thumb" oncontextmenu="return false;" draggable="false" />
            <div class="cert-img-overlay">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </div>
          </div>
          <div class="cert-card-body">
            <div class="cert-meta-row">
              <span class="cert-year-tag"><i class="fas fa-calendar-check"></i> <span data-i18n="certs.yearLabel">Year:</span> 2026</span>
              <span class="cert-id-badge">NTW-2026-52DCFAAE</span>
            </div>
            <h3 class="cert-title" data-i18n="certs.cert5.title">UNESCO: AI Ethics &amp; Public Sector Capacity</h3>
            <div class="cert-track" data-i18n="certs.cert5.track">UNESCO &amp; National Training Week</div>
            <div class="cert-issuer-date">
              <span><i class="fas fa-building-columns"></i> UNESCO &amp; NTW</span> &bull; 
              <span data-i18n="certs.cert5.date">September 2, 2026</span>
            </div>
            <button type="button" class="cert-action-btn" onclick="openCertModal('certificates/cert-5-unesco-ethics.png', 'UNESCO: AI Ethics & Public Sector Capacity', 'NTW-2026-52DCFAAE')">
              <i class="fas fa-eye"></i>
              <span data-i18n="certs.viewCert">View Certificate</span>
            </button>
          </div>
        </div>
      </div>

      <!-- View All Certificates Toggle Button -->
      <div class="certs-toggle-wrap">
        <button type="button" class="certs-view-all-btn" id="certsToggleBtn" onclick="toggleAllCertificates()">
          <span id="certsToggleText" data-i18n="certs.viewAll">View All Certificates (5)</span>
          <i class="fas fa-chevron-down" id="certsToggleIcon"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- ========== REAL PROJECTS & COLLABORATIONS SECTION ========== -->
  <section class="collaborations-section" id="collaborations">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="collab.badge">OFFICIAL COLLABORATIONS</div>
        <h2 class="section-title" data-i18n="collab.title">REAL PROJECTS &amp; <span class="highlight">ORGANIZATIONS</span></h2>
      </div>

      <div class="brand-logos-row">
        <!-- 1. NTWeek - Hormuud University -->
        <a href="https://ntw.hu.edu.so/" target="_blank" rel="noopener noreferrer" class="brand-logo-item" title="NTWeek - Hormuud University (Open Site)">
          <div class="brand-logo-circle">
            <img src="Hormuud_NTWeek_Logo.png" alt="NTWeek Hormuud University Logo" />
          </div>
          <span class="brand-logo-label">NTWeek (Hormuud Uni)</span>
        </a>

        <!-- 2. DHIIG KAAL -->
        <a href="https://dhiigkaal.iftiinhub.com/" target="_blank" rel="noopener noreferrer" class="brand-logo-item" title="DHIIG KAAL Blood Donation Platform (Open Site)">
          <div class="brand-logo-circle">
            <img src="DHIIG_KAAL_Logo.png" alt="DHIIG KAAL Official Logo" />
          </div>
          <span class="brand-logo-label">Dhiig Kaal</span>
        </a>

        <!-- 3. Buug Tabiye -->
        <a href="https://buugtabiye.netlify.app/" target="_blank" rel="noopener noreferrer" class="brand-logo-item" title="Buug Tabiye Platform (Open Site)">
          <div class="brand-logo-circle">
            <img src="Logo_Buug_Tabiye.png" alt="Buug Tabiye Official Logo" />
          </div>
          <span class="brand-logo-label">Buug Tabiye</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ========== CV & RESUME SECTION ========== -->
  <section class="cv-section" id="cv">
    <div class="container">
      <div class="cv-grid">
        <div class="cv-info-col">
          <div class="badge-tag" data-i18n="cv.badge">CURRICULUM VITAE</div>
          <h2 class="section-title" data-i18n="cv.title">My Official Resume</h2>
          <p class="section-desc" data-i18n="cv.desc">
            Review my complete technical background, university coursework at <?= htmlspecialchars($university) ?>, professional milestones, and certifications.
          </p>

          <ul class="cv-points-list">
            <li><i class="fas fa-check-circle"></i> <span data-i18n="cv.list1">Full Stack Web Architecture (Frontend &amp; Backend)</span></li>
            <li><i class="fas fa-check-circle"></i> <span data-i18n="cv.list2">UI/UX Prototyping, Wireframing &amp; Brand Guidelines</span></li>
            <li><i class="fas fa-check-circle"></i> <span data-i18n="cv.list3">Database Design, API Integration &amp; Security</span></li>
            <li><i class="fas fa-check-circle"></i> <span data-i18n="cv.list4">IT Support, Networking &amp; Embedded Systems</span></li>
          </ul>

          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <a href="<?= htmlspecialchars($cvFile) ?>" class="btn btn-primary" download>
              <i class="fas fa-download"></i>
              <span data-i18n="cv.btnDownload">Download CV (PDF)</span>
            </a>
            <a href="#contact" class="btn btn-outline" data-i18n="cv.btnRequest">Request Full Bio</a>
          </div>
        </div>

        <div class="cv-card-preview">
          <a href="<?= htmlspecialchars($cvPreview) ?>" target="_blank" title="Click to view full image">
            <img src="<?= htmlspecialchars($cvPreview) ?>" alt="<?= htmlspecialchars($ownerName) ?> CV preview" />
          </a>
          <div class="cv-preview-badge"><i class="fas fa-file-pdf"></i> Verified CV Document</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CONTACT SECTION ========== -->
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="section-header center">
        <div class="badge-tag" data-i18n="contact.badge">GET IN TOUCH</div>
        <h2 class="section-title" data-i18n="contact.title">Let's Create Something <span class="highlight">Exceptional</span></h2>
        <p class="section-desc center" data-i18n="contact.desc">
          Have an exciting project, freelance inquiry, or job opportunity? Send me a message and I'll respond within 24 hours.
        </p>
      </div>

      <div class="contact-grid">
        <div class="contact-info-cards">
          <div class="contact-item-card">
            <div class="contact-icon-wrap"><i class="fas fa-envelope"></i></div>
            <div>
              <div class="contact-label" data-i18n="contact.emailLabel">Email Address</div>
              <div class="contact-val"><a href="mailto:<?= htmlspecialchars($email) ?>"><?= htmlspecialchars($email) ?></a></div>
            </div>
          </div>

          <div class="contact-item-card">
            <div class="contact-icon-wrap"><i class="fas fa-phone"></i></div>
            <div>
              <div class="contact-label">Phone / WhatsApp</div>
              <div class="contact-val"><a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $whatsapp) ?>"><?= htmlspecialchars($phone) ?></a></div>
            </div>
          </div>

          <div class="contact-item-card">
            <div class="contact-icon-wrap"><i class="fas fa-map-pin"></i></div>
            <div>
              <div class="contact-label" data-i18n="contact.locationLabel">Location</div>
              <div class="contact-val" data-i18n="contact.locationValue"><?= htmlspecialchars($location) ?></div>
            </div>
          </div>

          <div class="contact-item-card">
            <div class="contact-icon-wrap"><i class="fas fa-graduation-cap"></i></div>
            <div>
              <div class="contact-label" data-i18n="contact.universityLabel">University</div>
              <div class="contact-val" data-i18n="contact.universityValue"><?= htmlspecialchars($university) ?></div>
            </div>
          </div>
        </div>

        <div class="contact-form-card">
          <form id="contactForm" method="POST" action="https://formsubmit.co/anasabdiwahidhussein@gmail.com">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="💬 New Message from Portfolio - Anas Abdiwahid" />
            <div class="form-row-2">
              <div class="form-field-group">
                <label for="fname" data-i18n="contact.form.nameLabel">Your Name</label>
                <input type="text" id="fname" name="name" class="form-input" placeholder="e.g. Ahmed Ali" data-i18n-placeholder="contact.form.namePlaceholder" required />
              </div>
              <div class="form-field-group">
                <label for="femail" data-i18n="contact.form.emailLabel">Your Email</label>
                <input type="email" id="femail" name="email" class="form-input" placeholder="e.g. ahmed@example.com" data-i18n-placeholder="contact.form.emailPlaceholder" required />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-field-group">
                <label for="fphone" data-i18n="contact.form.phoneLabel">Phone Number</label>
                <input type="tel" id="fphone" name="phone" class="form-input" placeholder="e.g. +252 61 XXXXXXX" data-i18n-placeholder="contact.form.phonePlaceholder" required />
              </div>
              <div class="form-field-group">
                <label for="fsubject" data-i18n="contact.form.subjectLabel">Subject</label>
                <input type="text" id="fsubject" name="subject" class="form-input" placeholder="Project Proposal / Consultation" data-i18n-placeholder="contact.form.subjectPlaceholder" required />
              </div>
            </div>

            <div class="form-field-group">
              <label for="fmsg" data-i18n="contact.form.messageLabel">Message</label>
              <textarea id="fmsg" name="message" class="form-textarea" rows="4" placeholder="Tell me about your project requirements, goals, and timeline..." data-i18n-placeholder="contact.form.msgPlaceholder" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-whatsapp-submit" style="width:100%; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700;">
              <span data-i18n="contact.send">Send via WhatsApp</span>
              <i class="fab fa-whatsapp" style="font-size: 1.25rem;"></i>
            </button>

            <div class="form-success-msg" id="formSuccess">
              <i class="fas fa-circle-check"></i> <span data-i18n="contact.success">Thank you! Your message has been sent successfully.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== FOOTER ========== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top-row">
        <a href="#home" class="nav-logo">
          <img src="Sawir Logo.png" alt="Anas Logo" class="logo-img" />
          <span class="logo-text"><?= htmlspecialchars($ownerName) ?><span class="accent">.</span></span>
        </a>

        <div class="footer-nav-links">
          <a href="#home" data-i18n="nav.home">Home</a>
          <a href="#about" data-i18n="nav.about">About</a>
          <a href="#projects" data-i18n="nav.portfolio">Projects</a>
          <a href="#services" data-i18n="nav.services">Services</a>
          <a href="#cv" data-i18n="nav.cv">CV</a>
          <a href="#contact" data-i18n="nav.contact">Contact</a>
          <a href="who-is-anas_.html" target="_blank">Who Is Anas</a>
        </div>
      </div>

      <div class="footer-bottom-row">
        <div>
          <p>© <span id="copyrightYear">2026</span> <strong style="color:var(--accent);"><?= htmlspecialchars($ownerName) ?></strong>. <span data-i18n="footer.rights">All rights reserved.</span></p>
          <p style="margin-top:6px; font-size:0.8rem;">
            <span id="gregorianDate">2026</span> • <span id="clockTime">12:00</span> • Hijri: <span id="hijriDate">---</span>
          </p>
        </div>

        <div class="footer-qr-holder">
          <div class="qr-box">
            <img src="qrcode.jpeg" alt="QR Code" />
          </div>
          <div>
            <div style="font-weight:700; color:var(--text-main); font-size:0.85rem;" data-i18n="footer.qrTitle">Scan WhatsApp QR</div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Direct Contact Link</div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Certificate Modal Lightbox (View Only) -->
  <div class="cert-modal-backdrop" id="certModalBackdrop" onclick="closeCertModalOnBackdrop(event)">
    <div class="cert-modal-dialog">
      <div class="cert-modal-header">
        <div class="cert-modal-header-info">
          <span class="cert-modal-badge"><i class="fas fa-shield-halved"></i> Verified Credential</span>
          <h4 class="cert-modal-title" id="certModalTitle">Certificate View</h4>
        </div>
        <button type="button" class="cert-modal-close-btn" onclick="closeCertModal()" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cert-modal-body">
        <img src="" alt="Certificate Full Preview" id="certModalImage" class="cert-modal-img" oncontextmenu="return false;" draggable="false" />
      </div>
      <div class="cert-modal-footer">
        <div class="cert-modal-footer-lock">
          <i class="fas fa-lock"></i>
          <span>Official Credential • View Only Mode</span>
        </div>
        <div id="certModalIdBadge" style="font-family: monospace; color: var(--accent);">ID: NTW-2026</div>
      </div>
    </div>
  </div>

  <!-- Back To Top & Floating WhatsApp -->
  <button class="floating-btn back-to-top-btn" id="backTop" aria-label="Back to top">
    <i class="fas fa-arrow-up"></i>
  </button>
  <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $whatsapp) ?>" target="_blank" class="floating-btn whatsapp-float-btn" aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <script src="script.js"></script>
</body>

</html>
